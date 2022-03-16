from django.contrib import admin

# Register your models here.
from filmer.models import Movie, Reaction


admin.site.register([Movie, Reaction])
