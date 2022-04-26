import json
import secrets

from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from filmer.models.Group import Group
from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction
from filmer.scrapers.TMDBSCraper import get_movie_info, get_movies_by_string
from filmer.serializers import MovieSerializer
from django.conf import settings

group_token_length = 3


class NewGroupIdView(APIView):
    def get(self, request):
        group_id = secrets.token_hex(group_token_length)
        while Group.objects.filter(group_id=id).exists():
            group_id = secrets.token_hex(group_token_length)

        if request.user.is_authenticated:
            user = request.user
        else:
            return Response({"error": "Not authenticated"})

        record = Group(group_id=group_id, user=user)
        record.save()
        return Response({"group_id": group_id})


class AddToGroupView(APIView):
    def post(self, request, group_id):
        Group(group_id=group_id, user=request.user).save()
        return Response({"group_id": group_id})


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
                         "client_id": "http://find-a-film.xyz/api/this",
                         "client_name": "filmer"})
