import requests
from django.db import models


# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=100)
    movie_id = models.CharField(max_length=100, primary_key=True)