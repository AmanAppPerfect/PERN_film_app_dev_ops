FROM node:lts-alpine
RUN apk add --no-cache curl
WORKDIR /server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "build"]
