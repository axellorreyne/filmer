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

# Postgres libraries
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev

# Copy requirements.txt
COPY requirements.txt ./requirements.txt

# Install required packages
RUN pip install -r ./requirements.txt

# Install psycopg2
RUN pip install psycopg2

# Copy source
COPY . .

# install gunicorn
RUN python -m pip install gunicorn

# Start production server
COPY docker-entrypoint.sh /usr/bin
CMD /usr/bin/docker-entrypoint.sh
