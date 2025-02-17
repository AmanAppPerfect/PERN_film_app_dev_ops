FROM node:lts-alpine
RUN apk add --no-cache curl
WORKDIR /client
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
