#!/bin/sh

# Inyectamos la variable de entorno API_URL en un archivo JS "config.js" accesible desde la UI
echo "window.__API_URL__ = '${API_URL}';" > /usr/share/nginx/html/config.js

# Arrancamos nginx en primer plano
exec "$@"