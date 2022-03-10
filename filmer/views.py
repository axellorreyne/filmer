from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from filmer.models import Movie
from filmer.scrapers.TMDBSCraper import get_movie_info
from filmer.serializers import MovieSerializer


class RandomMovieView(APIView):
    def get(self, request):
        movie = Movie.get_random_movie()
        return Response(MovieSerializer(movie).data)


class MovieInfoView(APIView):
    def get(self, request, movie_id):
        return Response(get_movie_info(movie_id))


class AuthenticatedTest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"authenticated": True})
