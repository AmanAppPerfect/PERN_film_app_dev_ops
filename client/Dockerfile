FROM node:lts-alpine AS build
RUN apk add --no-cache curl
WORKDIR /client
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

# Use separate stage for deployable image
FROM nginx:1-alpine-slim
RUN apk add --no-cache curl

# Remove default Nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to Nginx public directory
COPY --from=build /client/build /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080