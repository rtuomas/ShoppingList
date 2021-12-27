### POST 'api/addDead'

This call allows you to add new grave to the database. Takes the information as an object from request. Request is given in the following format (JS):

```
newGrave = {
    firstName,
    lastName,
    birthday,
    died,
    cemetery,
    location: {lat, long},
    category
}
```

### POST 'api/checkLogin'

Authentication method with the JSON Web Token. Takes the token as a request. Returns status 200 when successfull, 401 if not.