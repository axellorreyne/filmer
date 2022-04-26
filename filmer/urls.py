from django.urls import path, include

from . import views

urlpatterns = [
    path('group', views.NewGroupIdView.as_view(), name='group'),
    path('groupadd', views.AddToGroupView.as_view(), name='group'),
    path('random_movie', views.RandomMovieView.as_view(), name='random_movie'),
    path('movie/<int:movie_id>', views.MovieInfoView.as_view(), name='movie_info'),\
    path('like_count/<int:movie_id>', views.LikeCountView.as_view(), name='like_count'),
    path('dislike_count/<int:movie_id>', views.DislikeCountView.as_view(), name='dislike_count'),
    path('searchmovie', views.MovieSearchView.as_view(), name='movie_search'),
    path('auth_test', views.AuthenticatedTest.as_view(), name='auth_test'),
    path('', include('filmer.routers')),
    path('this', views.OIDCMetadata.as_view(), name='oicdmetadata'),
]
