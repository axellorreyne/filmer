![Filmer](design/logo/transparant_background.png)\![transparant_background](https://github.ugent.be/storage/user/9272/files/50dfcaf0-1bbe-4eb4-9a3c-3e729d6588a8)

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
