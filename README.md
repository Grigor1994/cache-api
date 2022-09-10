## CACHE API

## Requirements

    Node JS

    MongoDB

## Installation

Create .env file in project and set this properties

    PORT=<your port>
    MONGODB_URL=<your db url>

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing the app

```bash
#testing
$ npm test
```

## Get data by key


### URL

    /api/v1/caches

### Method:

    GET

### URL Params

Required: key

## Get all stored keys

### URL

    /api/v1/caches

### Method:

    GET

### URL Params

Required:

None

## Create or update cache by key

### URL

    /api/v1/caches

### Method:

    POST

### Request body

```JSON
{
  "key": "5516f8f3-956e-4f88-9f53-43678558445251"
}
```

## Remove by key

### URL

    /api/v1/caches

### Method:

    DELETE

### URL Params

Required: key

## Remove all stored data from cache

### URL

    /api/v1/caches

### Method:

    DELETE

### URL Params

Required:

None

## Stay in touch

- Author - [Grigor Avetisyan](https://www.linkedin.com/in/grigor-avetisyan-342566139/)
- Github - [https://github.com/Grigor1994](https://github.com/Grigor1994)

