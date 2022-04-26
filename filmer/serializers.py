from django.contrib.auth.models import User
from rest_framework import serializers

from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction 


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('movie_id', 'title')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_field = ['is_active']


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['movie_id', 'like', 'seen']
        read_only_field = ['is_active']

