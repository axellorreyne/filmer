from rest_framework import filters, status
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from filmer.models import Reaction
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


class ReactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ReactionSerializer
    http_method_names = ['post', 'get']

    def get_queryset(self):
        return Reaction.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(user=request.user)
        return Response(status=status.HTTP_201_CREATED)
