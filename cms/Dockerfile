FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.env ./
COPY --from=builder /app/.strapi-updater.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.strapi ./.strapi
COPY --from=builder /app/dist ./dist
EXPOSE 1337
CMD ["npm", "start"]