FROM node:22-alpine as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN npm run build

FROM nginx:1.7
COPY --from=build /usr/local/app/dist/to-do-list-front /usr/share/nginx/html
EXPOSE 80
