FROM nginx:alpine

# Copy static files to nginx html directory
COPY index.html style.css game.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# nginx starts automatically, so no CMD needed