FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package*.json ./
EXPOSE 3000
ENV NEXT_SERVER_API_URL=http://cms:1337
CMD ["npm", "start"]