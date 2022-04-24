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
- GET `/api/searchmovie` get a random movie
```
Some search term
```
- GET `/api/like_count/{movie_id}` get amount of likes for movie id
- GET `/api/dislike_count/{movie_id}` get amount of dislikes for movie id

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
    "id": {user_id}
    "email": "{email}",
    "username": "{username}"
}
```
- PATCH `/api/user/` update user account info
```
{
    "email": "{email}", (OPTIONAL)
    "password": "{password}", (OPTIONAL)
    "username": "{username}" (OPTIONAL)
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
