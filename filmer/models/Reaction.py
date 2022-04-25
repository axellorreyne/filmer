import random

import requests
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models import Max


class Reaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.CharField(max_length=100)
    like = models.BooleanField()
    seen = models.BooleanField()

    class Meta:
        unique_together = ('user', 'movie_id')
