FROM node:lts-bookworm-slim@sha256:a5f4366e834695d5f363b920c104953a535d3a9864d1bdf74566a0ebe01daee5
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit-dev
COPY . .
CMD [ "node", "index.js" ]