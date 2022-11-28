FROM node:16-alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 3000