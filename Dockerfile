FROM node:10-alpine AS build

RUN apk update && apk add git

WORKDIR "/app"

COPY ./package.json ./

RUN npm install express express-jwt jwks-rsa npm-run-all

COPY . .

CMD ["npm", "run", "start"]