FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY server.js ./
COPY openapi.yaml ./
RUN npm ci --omit=dev
CMD ["node", "server.js"]
