FROM node:9.11.1-alpine

WORKDIR /home/pebee/dashboard

COPY package.json .

RUN npm install --quiet
RUN npm install react-scripts -g --quiet

COPY . .