import random

import requests
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models import Max

class Movie(models.Model):
    title = models.CharField(max_length=100)
    movie_id = models.CharField(max_length=100, unique=True)
    r_id = models.AutoField(primary_key=True)

    @staticmethod
    def get_random_movie():
        max_id = Movie.objects.all().aggregate(max_id=Max("r_id"))['max_id']
        while True:
            pk = random.randint(1, max_id)
            category = Movie.objects.filter(pk=pk).first()
            if category:
                return category
