##################
### Base image ###
##################

# Use Node as base
FROM node:alpine as base

# Set workdir
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# run npm install
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all
COPY . .

#########################
### Development image ###
#########################
FROM base as development

# Enable hot reloading
ENV CHOKIDAR_USEPOLLING=true


########################
### Production image ###
########################