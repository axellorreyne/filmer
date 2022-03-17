##################
### Base image ###
##################

# Python Base
FROM python:3.9-slim as base

# Set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /code

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements.txt
COPY requirements.txt ./requirements.txt

# Install required packages
RUN pip install -r ./requirements.txt

# Copy source
# TODO: exclude frontend
COPY . /code/

# Migrate
RUN python manage.py migrate

# Populate movies
RUN python manage.py populateMovies

#########################
### Development image ###
#########################
FROM base as development

# Start development server
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000


########################
### Production image ###
########################
FROM base as production

# Check deploy
RUN python manage.py check --deploy

# Collect static
RUN python manage.py collecstatic --no-input

# Set enviroment to production
ENV DJANGO_CONFIGURATION=Production

# Start the server
gunicorn \
    --bind=0.0.0.0:80 \
    --workers=3 \
    --worker-tmp-dir=/dev/shm \
    --timeout 300 \
    --log-file=- \
    --access-logfile=/var/log/access.log \
    --error-logfile=/var/log/error.log \
    --log-level debug \
    app.wsgi:application
