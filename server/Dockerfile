FROM node:lts-alpine
WORKDIR /srv/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]