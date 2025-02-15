FROM node:lts-bookworm-slim@sha256:91be66fb4214c9449836550cf4c3524489816fcc29455bf42d968e8e87cfa5f2
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --omit-dev
COPY . .
CMD [ "node", "index.js" ]