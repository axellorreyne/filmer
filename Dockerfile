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

RUN python manage.py collectstatic --noinput

# Set enviroment to production
ENV DJANGO_CONFIGURATION=Production

# install gunicorn
RUN python -m pip install gunicorn
