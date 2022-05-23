import random

import requests
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models import Max

class Group(models.Model):
    group_id = models.CharField(max_length=21); 
    user = models.ForeignKey(User, on_delete=models.CASCADE);
