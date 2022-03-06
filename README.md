![Filmer](design/logo/transparant_background.png)

The swiping movie suggestor!

### Dev setup
Backend:
- (setup your python venv)
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py createsuperuser` (choose a password etc)
- `python manage.py populateMovies`
- `python manage.py runserver`   

Frontend:
- `cd frontend`
- `npm i`
- `npm start`
