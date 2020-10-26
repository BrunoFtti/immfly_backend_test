########## STAGE 1 - Build ##########
FROM node:12.19.0-alpine3.10 as build

# Create app directory
WORKDIR /usr/src/app

# Copy application files
COPY . .

# Clean install
RUN npm ci

# Compilation
RUN npm run tsc


########## STAGE 2 - Run ##########

FROM alpine:3.12.1
RUN apk add --no-cache "npm=12.18.4-r0" && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["npm", "start"]
