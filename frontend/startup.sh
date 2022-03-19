#!/bin/bash

# Check every 12 hours if Let's Encrypt certificate is up for renewal in background
while true; do sleep 12h; certbot renew --deploy-hook "nginx -s reload"; done &

# Parse domains from NGINX configuration
# and create, reinstall or renew a Let's Encrypt certificate for find-a-film.xyz
certbot -n \
    --nginx \
    --non-interactive \
    --email "axel.lorreyne@ugent.be" \
    --agree-tos \
    --redirect \
    --allow-subset-of-names \
    --renew-with-new-domain \
-d find-a-film.xyz

# Start NGINX
nginx -g "daemon off;"
