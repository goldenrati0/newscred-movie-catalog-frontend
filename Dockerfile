# Stage 1

### pull node image with alpine
FROM node:alpine as react-build
RUN mkdir -p /app
COPY . ./app
WORKDIR /app
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]