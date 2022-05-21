from django.contrib import admin

# Register your models here.
from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction 
from filmer.models.Group import Group 
from filmer.models.GroupInfo import GroupInfo

admin.site.register([Movie, Reaction, Group, GroupInfo])
