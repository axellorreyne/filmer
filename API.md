# API Overview
(POST requests include body structure)
## Unauthenticated
- GET `/api/random_movie` get a random movie
```
{
    "movie_id": "{movie_id}",
    "title": "{string}"
}
```
- GET `/api/movie/{movie_id}` get info about a movie   
[reference](https://developers.themoviedb.org/3/movies/get-movie-details)

## Authenticated
- GET  `/api/reaction/` get a list of a reactions for current user
```
[
    {
        "movie_id": "{movie_id}",
        "like": true/false,
        "seen": true/false
    },
    ...
]
```
- POST `/api/reaction/` create a reaction for current user
```
{
    "movie_id": "{movie_id}",
    "like": true/false
    "seen": true/talse
}
```
- PATCH  `/api/reaction/{movie_id}` update a reaction for current user
```
{
    "movie_id": "{movie_id}", (OPTIONAL)
    "like": true/false, (OPTIONAL)
    "seen": true/false (OPTIONAL)
}
```
- DEL `/api/reaction/{movie_id}` delete a reaction for current user

- GET `/api/user/` get user account info
```
{
    "id": 2
    "email": "new@new.new",
    "username": "newtest"
}
```
- PATCH `/api/user/` update user account info
```
{
    "email": "new@new.new", (OPTIONAL)
    "password": "12345678", (OPTIONAL)
    "username": "newtest" (OPTIONAL)
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
