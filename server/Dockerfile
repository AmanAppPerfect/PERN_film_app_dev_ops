FROM node:18-alpine

WORKDIR /index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]
