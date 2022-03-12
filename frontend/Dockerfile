##################
### Base image ###
##################

# Use Node as base
FROM node:alpine

# Set workdir
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# Enable hot reloading
# TODO:move to development image
ENV CHOKIDAR_USEPOLLING=true

# run npm install
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all
COPY . .