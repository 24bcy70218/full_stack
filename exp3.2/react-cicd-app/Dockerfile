# Build Stage
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install

# Copy remaining files
COPY . .

# Build React app
RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]