from django.urls import path, include

from . import views

urlpatterns = [
    path('random_movie', views.RandomMovieView.as_view(), name='random_movie'),
    path('movie/<int:movie_id>', views.MovieInfoView.as_view(), name='movie_info'),
    path('searchmovie', views.MovieSearchView.as_view(), name='movie_search'),
    path('auth_test', views.AuthenticatedTest.as_view(), name='auth_test'),
    path('', include('filmer.routers'))
]
