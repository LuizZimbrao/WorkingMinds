# Creating multi-stage build for production
FROM node:20-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:20-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH
ENV APP_KEYS=Kx/4nwbQa9DFkI59E8a7qA==,CJtHGBsnjsD34wCboAnzPQ==,qPhs0wrPccSB3wPNyhnIOQ==,FkdnDejMu338JGva637dYw==
ENV API_TOKEN_SALT=tICfiSY/QVDWOqyfhjanBQ==
ENV ADMIN_JWT_SECRET=T4EPTsWxsPi8HIqGChXYbg==
ENV TRANSFER_TOKEN_SALT=0NXBvDgXE4Hy/FiTSHZiCw==

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]