FROM node:lts-alpine
WORKDIR /server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
