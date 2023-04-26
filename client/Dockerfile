FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:stable-alpine as prod
RUN mkdir /app
COPY --from=build /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf