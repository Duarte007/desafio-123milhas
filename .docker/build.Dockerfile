FROM node:latest

ENV NODE_ENV production

WORKDIR /web

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "./prod/index.js"]