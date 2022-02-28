![Filmer](https://i.imgur.com/6pkMBuX.png)
The swiping movie suggestor!

### Dev setup
Backend:
- `cd backend`
- (setup your python venv)
- `pip install -r requirements.txt`
- `cd backend`
- `python manage.py migrate`
- `python manage.py createsuperuser` (choose a password etc)
- `python manage.py populateMovies`
- `python manage.py runserver`   

Frontend:
- `cd frontend`
- `npm i`
- `npm start`
