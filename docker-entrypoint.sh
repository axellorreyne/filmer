# Collect static files
python manage.py collectstatic --no-input

# Perform the migrations
python manage.py migrate

# Check if there aren't any severe mistakes
python manage.py check --deploy



