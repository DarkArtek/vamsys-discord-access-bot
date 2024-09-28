FROM node:lts-bookworm-slim@sha256:2394e403d45a644e41ac2a15b6f843a7d4a99ad24be48c27982c5fdc61a1ef17
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit-dev
COPY . .
CMD [ "node", "index.js" ]