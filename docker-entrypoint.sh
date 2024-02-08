#!/bin/bash
set -ex

# Collect static files
python manage.py collectstatic --no-input

# Perform the migrations
python manage.py migrate

# Populate movies
python manage.py populateMovies

# Check if there aren't any severe mistakes
python manage.py check --deploy

# Start
gunicorn backend.wsgi:application -c gunicorn.config.py --bind 0.0.0.0:8008 --log-file=- --log-level debug