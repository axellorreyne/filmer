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
COPY . .

# Set enviroment to production
ENV DJANGO_CONFIGURATION=Production

# install gunicorn
RUN python -m pip install gunicorn

# Start production server
COPY docker-entrypoint.sh /usr/bin
CMD /usr/bin/docker-entrypoint.sh
