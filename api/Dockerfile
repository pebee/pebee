FROM node:9.11.1-alpine

WORKDIR /home/pebee/api

COPY package.json .

RUN npm install --quiet -g gulp && \
    npm install --quiet

COPY . .