FROM node:16.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8008
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]

