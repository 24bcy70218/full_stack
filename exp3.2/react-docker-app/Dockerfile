# Stage 1: Build React App
FROM node:18 AS build

WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY app/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
