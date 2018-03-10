# URLMonitor

An API, that when given the information - (URL, method, data, headers), monitors the URL every second. The server sends a request and records how much time it took to get the complete response.

## Setup

- Clone git repo: `git clone git@github.com:ankitkataria/Elanic-URLMonitor.git`
- `cd` into directory
- Run `npm intall`
- Run app `nodemon app.js`

## Routes

### POST

> To store URL in db and start monitoring, returns a unique id to view, update, delete the info later

- Sample curl:
```
curl -X POST http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    --data '{"headers":{"some": "header"},"data":{"some":"data"}, "url":"http://www.youtube.com/","method": "get"}'
```

- Sample response:

```
{
  "success": true,
  "_id": 60850
}

```

### GET

> to retrieve URL info through unique id, or all at once, also calculate the 50th, 75th, 95th, and 99th percentile when requesting individually

- Route: `/:id`

- Sample curl:

```
curl -X GET http://localhost:3000/97004
```

- Sample Response(if present):

```
{
  "responses": [
    255,
    240,
    219,
    237,
    ...
    ...
  ],
  "_id": 97004,
  "headers": {
    "some": "header"
  },
  "data": {
    "some": "data"
  },
  "url": "http://www.youtube.com/",
  "method": "get",
  "50th_percentile": 247.5,
  "75th_percentile": 256,
  "95th_percentile": 266.5,
  "99th_percentile": 356.5
}
```

- Route: `/`

- Sample curl:

```
curl -X GET http://localhost:3000/
```

- Sample Response:

```
{
  "urls": [
    {
      "responses": [
        366,
        252,
        ...
      ],
      "_id": 71579,
      "headers": {
        "new": "nbew"
      },
      "data": {
        "some": "data"
      },
      "url": "http://www.youtube.com/",
      "method": "get",
    },
    {
      "responses": [
        237,
        ...
        235,
      ],
      "_id": 97004,
      "headers": {
        "someother": "header"
      },
      "data": {
        "someother": "data"
      },
      "url": "http://www.google.com/",
      "method": "get",
    },
  ]
}

```

### PUT

> To update stored URL info, and monitor with the new info

- Sample curl:

```
curl -X PUT http://localhost:3000/60850 \
    -H 'Content-Type: application/json' \
    --data '{"headers":{"somenewheader": "somenewvalue"},"data":{"some":"newdata"}}'
```

- Sample Output:

```
{
  "success": true,
  "_id": "60850"
}
```

### DELETE

> To delte URL info and stop monitoring

- Sample curl:

```
curl -X DELETE http://localhost:3000/60850
```

- Sample Response:

```
{
  "success": true
}

```


