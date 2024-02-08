import urllib
from os import getenv

import requests
from dotenv import load_dotenv

from filmer.models.Movie import Movie

load_dotenv()

OK_CODE = 200
API_KEY = getenv('TMDB_API_KEY')
API_URL = 'https://api.themoviedb.org/3'


# errors
def error(e):
    return {'error': e}


TMDB_ERROR = error('TMDB ERROR')


def get_top_movie(page):
    req = requests.get(
        f'{API_URL}/movie/top_rated?page={page}',
        headers={
            "accept": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        })
    print(req.json())
    if req.status_code != OK_CODE:
        return TMDB_ERROR
    else:
        res = req.json()
        return res


def filter_movies(movies, language_set):
    return list(filter(lambda c: language_set is None or c['original_language'] in language_set, movies))


def get_all_movies(limit=-1, language_set=None):
    first = get_top_movie(1)
    pages = first['total_pages']
    movies = filter_movies(first['results'], language_set)
    for i in range(pages - 2):
        if 0 < limit <= len(movies):
            break
        print(f'page {i}/{pages}')
        movies += filter_movies(get_top_movie(i + 2)['results'], language_set)
    return movies[:limit]


def create_movies():
    scraped_movies = get_all_movies(language_set=['en'], limit=200)
    objs = []
    for i in scraped_movies:
        objs.append(Movie(title=i['original_title'], movie_id=i['id']))
    Movie.objects.all().delete()
    Movie.objects.bulk_create(objs, ignore_conflicts=True)


def get_movie_info(movie_id):
    req = requests.get(
        f'{API_URL}/movie/{movie_id}?append_to_response=videos,images,credits&include_image_language=en,null&include_videos_language=en,null',
        headers={
            "accept": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        }
    )
    if req.status_code == OK_CODE:
        return req.json()
    else:
        print(req.json())
        return TMDB_ERROR


def get_movies_by_string(search):
    req = requests.get(
        f'{API_URL}/search/movie?query={urllib.parse.quote_plus(search)}',
        headers={
            "accept": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        }
    )
    if req.status_code == OK_CODE:
        return req.json()['results']
    else:
        print(req.json())
        return TMDB_ERROR
