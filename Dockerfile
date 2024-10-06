FROM node:lts-bookworm-slim@sha256:967bab29ecde5d59a6dd781054bf9021eee8116068e1f5cb139750b6bc6a75e9
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit-dev
COPY . .
CMD [ "node", "index.js" ]