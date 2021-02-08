FROM node:14.15-alpine

WORKDIR /usr/src
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005
CMD [ "node", "src/index.ts" ]
