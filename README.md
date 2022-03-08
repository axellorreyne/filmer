![Filmer](design/logo/transparant_background.png)

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg" width="50"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="50"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="50"/><br/>

The swiping movie suggestor!

## Dev Setup

### Windows Preparation

- [Install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- [Install Docker](https://docs.docker.com/docker-for-windows/install-windows-home/)

### Setup Docker (WSL + Linux)
```shell script
  $ sudo apt update && sudo apt install -y docker.io docker-compose
  $ sudo systemctl enable --now docker  (only on Linux)
  $ sudo usermod -aG docker $USER
  $ newgrp docker
  ```

### Build + start local setup (Docker)

- Build + start container
```shell script
$ docker-compose up -d --build
$ docker-compose exec app python manage.py createsuperuser
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


### Build + start local setup (manual)
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
