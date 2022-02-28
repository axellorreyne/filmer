import requests

from filmer.models import Movie

OK_CODE = 200


def get_top_movie(page):
    req = requests.get(
        f'https://api.themoviedb.org/3/movie/top_rated/?api_key=a78a89e01e988127baa984a51f1d0c89&page={page}')
    if req.status_code != OK_CODE:
        raise ConnectionError("something went wrong")
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
    scraped_movies = get_all_movies(language_set=['en'], limit=-1)
    objs = []
    for i in scraped_movies:
        objs.append(Movie(title=i['original_title'], movie_id=i['id']))
    Movie.objects.all().delete()
    Movie.objects.bulk_create(objs)