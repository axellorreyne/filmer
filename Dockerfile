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
RUN python manage.py migrate --noinput

# Populate movies
RUN python manage.py populateMovies

#########################
### Development image ###
#########################
FROM base as development

# Start development server
CMD python manage.py runserver 0.0.0.0:8000


########################
### Production image ###
########################
FROM base as production

# Set enviroment to production
ENV DJANGO_CONFIGURATION=Production

# install gunicorn
RUN python -m pip install gunicorn

# Start production server
COPY docker-entrypoint.sh /usr/bin
CMD /usr/bin/startup.sh
