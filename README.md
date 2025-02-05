<img src="design/logo/Asset 2.png"/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg" width="50"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="50"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="50"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="50"/><br/>

The swiping movie suggestor!

## Development Setup


### Build + start local setup (non dockerized)
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


## Production Setup

### Setup Docker (Linux)
```shell script
  $ sudo apt update && sudo apt install -y docker.io docker-compose
  $ sudo systemctl enable --now docker
  $ sudo usermod -aG docker $USER
  $ newgrp docker
  ```

### Build + run production server (Docker)

- Build + start container + create superuser
```shell script
$ docker-compose up -d --build
$ docker-compose exec backend python manage.py createsuperuser
```


- Stop + remove volume
```shell script
$ docker-compose down -v
```

- Clean up removed volume(s)
```shell script
$ docker image prune -af
```

- Start container (detached + no build)
```shell script
$ docker-compose up -d
```

- Stop container (dont remove volumes)
```shell script
$ docker-compose down
```

