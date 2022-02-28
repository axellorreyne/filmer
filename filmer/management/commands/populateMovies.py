from django.core.management.base import BaseCommand

from filmer.scrapers.TMDBSCraper import create_movies


class Command(BaseCommand):
    help = "Populate the movie database"

    def handle(self, *args, **options):
        create_movies()