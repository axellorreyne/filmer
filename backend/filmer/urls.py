from django.urls import path

from . import views

urlpatterns = [
    path('random_movie', views.random_movie_view, name='random_movie'),
]