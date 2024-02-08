import json
import secrets

from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from filmer.models.Group import Group
from filmer.models.GroupInfo import GroupInfo
from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction
from filmer.scrapers.TMDBSCraper import get_movie_info, get_movies_by_string
from filmer.serializers import MovieSerializer
from filmer.serializers import GroupSerializer 
from filmer.serializers import GroupInfoSerializer 
from filmer.serializers import ReactionSerializer 
from filmer.serializers import UserSerializer
from django.conf import settings

group_token_length = 3

class NewGroupIdView(APIView):
    def get(self, request, group_name):
        group_id = secrets.token_hex(group_token_length)
        while Group.objects.filter(group_id=id).exists():
            group_id = secrets.token_hex(group_token_length)

        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"})

        GroupInfo(group_id=group_id, admin=user, name=group_name).save()
        return Response({"group_id": group_id})

class AddToGroupView(APIView):
    def post(self, request, group_id):
        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"})
        
        groupinfo = [*GroupInfo.objects.filter(group_id=group_id)]
        if (len(groupinfo) < 1):
            return Response({"error": ("There is no group with id" + group_id)}, status=500)

        groups = Group.objects.filter(user=user, group_id=group_id)
        if groups.count() > 0:
            print(groups.count())
            return Response({"status": ("Already in group " + group_id)})

        Group(group_id=group_id, user=user).save()
        return Response({"group_id": group_id, "status": "OK"})

class GetGroup(APIView):
    def get(self, request, group_id):
        
        group = list(Group.objects.filter(group_id=group_id))
        users = [x.user for x in group]
        users_serialized = [UserSerializer(x).data for x in users]
        user_reactions = [Reaction.objects.filter(user=x, like=True) for x in users]
        filmids = set.intersection(* [set([ReactionSerializer(y).data['movie_id'] for y in x]) for x in user_reactions])
        films = [get_movie_info(x) for x in filmids]

        groupinfo = list(GroupInfo.objects.filter(group_id=group_id))
        if (len(groupinfo) < 1):
            return Response({"error": "Server Error"}, status=500)
        groupinfo_serialized = GroupInfoSerializer(groupinfo[0]).data

        return Response({"users": users_serialized, "films": films, "name": groupinfo_serialized['name'], "admin": UserSerializer(groupinfo[0].admin).data})

class LeaveGroup(APIView):
    def delete(self, request, group_id):
        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"})

        groupinfo = list(GroupInfo.objects.filter(group_id=group_id))
        if (len(groupinfo) < 1):
            return Response({"error": "Server Error"}, status=500)
        groupinfo = groupinfo[0]
        if user == groupinfo.admin:
            return Response({"error": "Admin cannot leave group"}, status=500)

        records = Group.objects.filter(user=user, group_id=group_id)
        for record in records:
            record.delete()
        return Response(0);

class CloseGroup(APIView):
    def delete(self, request, group_id):
        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"})
        groupinfo = list(GroupInfo.objects.filter(group_id=group_id))
        if (len(groupinfo) < 1):
            return Response({"error": "Server Error"}, status=500)
        groupinfo = groupinfo[0]
        
        if user != groupinfo.admin:
            return Response({"error": "Not authenticated"})

        records = GroupInfo.objects.filter(group_id=group_id)
        for record in records:
            record.delete()
        records = Group.objects.filter(group_id=group_id)
        for record in records:
            record.delete()

        return Response(0)



class InGroup(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"}, status=500)
        records = Group.objects.filter(user=user)
        records = [GroupSerializer(x).data['group_id'] for x in records]
        records = set(sum([[*GroupInfo.objects.filter(group_id=x)] for x in records], []))
        records = [GroupInfoSerializer(x).data for x in records]
        return Response(records);


class RandomMovieView(APIView):
    def get(self, request):
        movie = Movie.get_random_movie()
        return Response(MovieSerializer(movie).data)


class MovieInfoView(APIView):
    def get(self, request, movie_id):
        return Response(get_movie_info(movie_id))


class LikeCountView(APIView):
    def get(self, request, movie_id):
        return Response(Reaction.objects.filter(movie_id=movie_id, like=True).count())


class DislikeCountView(APIView):
    def get(self, request, movie_id):
        return Response(Reaction.objects.filter(movie_id=movie_id, like=False).count())


class MovieSearchView(APIView):
    def post(self, request):
        return Response(get_movies_by_string(request.body))

class AuthenticatedTest(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({"authenticated": True})


class OIDCMetadata(APIView):
    def get(self, request):
        return Response({"@context": "https://www.w3.org/ns/solid/oidc-context.jsonld",
                         "redirect_uris": [settings.SOLID_CALLBACK],
                         "client_id": "http://filmer.lorreyne.be/api/this",
                         "client_name": "filmer"})
