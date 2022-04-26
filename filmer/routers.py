from rest_framework.routers import SimpleRouter

from filmer.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from filmer.viewsets import UserViewSet, ReactionViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

# REACTION
routes.register(r'reaction', ReactionViewSet, basename='user')

# GROUP 
urlpatterns = [
    *routes.urls
]
