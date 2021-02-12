FROM node:12-alpine

WORKDIR /app-build

COPY ./package.json .

RUN yarn install

WORKDIR /app

COPY ./package.json .

RUN yarn install --production

WORKDIR /app-build/

COPY . .

RUN yarn run build

RUN mv /app-build/dist/* /app/

WORKDIR /app

RUN rm -r /app-build

RUN rm package.json

ENV NODE_ENV="production"

CMD ["node", "./index.js"]

EXPOSE 3000
