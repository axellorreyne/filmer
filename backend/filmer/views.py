from rest_framework.response import Response
from rest_framework.views import APIView
from filmer.models import Movie
from filmer.serializer import MovieSerializer


class RandomMovieView(APIView):
    def get(self, request):
        movie = Movie.get_random_movie()
        return Response(MovieSerializer(movie).data)
