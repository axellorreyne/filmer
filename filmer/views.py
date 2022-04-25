import json

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction
from filmer.scrapers.TMDBSCraper import get_movie_info, get_movies_by_string
from filmer.serializers import MovieSerializer
from settings import SOLID_CALLBACK


class RandomMovieView(APIView):
    print("gvd")

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
                         "redirect_uris": [SOLID_CALLBACK]})
