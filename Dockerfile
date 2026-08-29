FROM node:lts-bookworm-slim@sha256:ba849c60be29959425b8734d57b8b4b7d56f98edd9504c9af091d5281095a71e
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit-dev
COPY . .
CMD [ "node", "index.js" ]