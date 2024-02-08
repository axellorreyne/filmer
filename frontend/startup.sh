#!/bin/bash

# Enable job control
set -m

# Start NGINX in the background
nginx -g "daemon off;" &

# Check every 12 hours if Let's Encrypt certificate is up for renewal in background
while true; do sleep 12h; certbot renew; done &

# Create, reinstall or renew a Let's Encrypt certificate for domain
certbot -n \
    --nginx \
    -m "axel.lorreyne@ugent.be" \
    --agree-tos \
    --redirect \
    --renew-with-new-domains \
    -d filmer.lorreyne.be

# Bring NGINX to the foreground
fg %1
