from rest_framework import filters, status
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from filmer.models.Group import Group 
from filmer.models.Reaction import Reaction
from filmer.models.Movie import Movie
from filmer.serializers import UserSerializer, ReactionSerializer

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'patch']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        else:
            return [self.request.user]

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if "password" in request.data:
            request.user.set_password(request.data["password"])
        request.user.save()
        return Response(status=status.HTTP_200_OK)


class ReactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ReactionSerializer
    http_method_names = ['post', 'get', 'patch', 'delete']
    lookup_field = "movie_id"

    def get_queryset(self):
        return Reaction.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        print(request.body)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(status=status.HTTP_201_CREATED)

