#API Overview
(POST requests include body structure)
## Unauthenticated
- GET `/api/random_movie` get a random movie
- GET `/api/movie/{movie_id}` get info about a movie

## Authenticated
- GET  `/api/reaction/` get a list of a reactions
- POST `/api/reaction/` create a reaction
```
{
    "movie_id": "{movie_id}",
    "like": True/False
}
```

## Authentication
- POST `/api/auth/register/` register
```
{
    "email": "{email}",
    "password": "{password(>8 chars)}",
    "username": "{username}"
}
```
- POST `/api/auth/login/` log in
```
{
    "password": "{password}",
    "username": "{username}"
}
```