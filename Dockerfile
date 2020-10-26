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

# Create app directory
WORKDIR /usr/src/app

# Set environmental variables
ENV NODE_ENV=production
ENV PORT=8080

# Install only the required dependencies to run
COPY package*.json ./
RUN npm ci --quiet --only=production

# Copy only the compiled files from the build stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

# Command to run
CMD ["npm", "start"]
