###################
### Build image ###
###################
FROM node:alpine as build

# Workdir is /code
WORKDIR /code

# Set node modules path
ENV PATH /code/node_modules/.bin:$PATH

# copy package files
COPY package.json ./
COPY package-lock.json ./

# run clean install
RUN npm i --silent

# Install react scripts
RUN npm install react-scripts@4.0.3 -g --silent

# Copy all
COPY . ./

# Create an optimized production build
RUN npm run build

#######################
### Production image ##
#######################
FROM nginx:stable-alpine

# Copy nginx build and config files
COPY --from=build /code/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose http and https port
EXPOSE 80/tcp 443/tcp

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]