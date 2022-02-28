from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.

def random_movie_view(request):
    data = {}
    return JsonResponse(data)
