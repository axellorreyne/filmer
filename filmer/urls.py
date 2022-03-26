from django.urls import path, include

from . import views

urlpatterns = [
    path('random_movie', views.RandomMovieView.as_view(), name='random_movie'),
    path('movie/<int:movie_id>', views.MovieInfoView.as_view(),  name='movie_info'),
    path('auth_test', views.AuthenticatedTest.as_view(), name='auth_test'),
    path('', include('filmer.routers'))
]

handler400 = "filmer.views.custom_bad_request_view"
handler403 = "filmer.views.custom_permission_denied_view"
handler404 = "filmer.views.custom_page_not_found_view"
handler500 = "filmer.views.custom_error_view"
