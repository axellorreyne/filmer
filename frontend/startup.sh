#!/usr/bin/env bash

# Check every 12 hours if Let's Encrypt certificate is up for renewal in background
while true; do sleep 12h; certbot renew --deploy-hook "nginx -s reload"; done &

# Parse domains from NGINX configuration
# and create, reinstall or renew a Let's Encrypt certificate for every domain
nginx -qT | sed -n -E '/ server_name /{s/.*//;:s /;/!{H;n;b s;};g;s/[[:space:]]+([[:graph:]]+)/--domain \1 /gp;s/.*//;h}' | xargs certbot -n \
    --nginx \
    --non-interactive \
    --email "admin@anter.io" \
    --agree-tos \
    --redirect \
    --allow-subset-of-names \
    --renew-with-new-domains

# Start NGINX
nginx -g "daemon off;"
