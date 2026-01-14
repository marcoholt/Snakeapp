FROM nginx:alpine

COPY ./snakeapp /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]\