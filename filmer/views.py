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


# Error handling pages
def custom_bad_request_view(request, exception):
    return render(request, '400.html', status=400)

def custom_permission_denied_view(request, exception):
    return render(request, '403.html', status=403)

def custom_page_not_found_view(request, exception):
    return render(request, '404.html', status=404)

def custom_error_view(request):
    return render(request, '500.html', status=500)


