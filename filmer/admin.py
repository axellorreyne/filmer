from django.contrib import admin

# Register your models here.
from filmer.models.Movie import Movie
from filmer.models.Reaction import Reaction 

admin.site.register([Movie, Reaction])
