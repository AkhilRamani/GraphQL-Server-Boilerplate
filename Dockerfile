FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile
RUN yarn install

COPY . .

EXPOSE 4000

RUN yarn build

CMD ["yarn", "start"]