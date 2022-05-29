This is a [Node.js](https://nodejs.org/en/) project with [Express.js](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/). A backend service for [BatDongSan88](https://github.com/dung-td/realestatewebsite/)

## Getting Started

#### Install npm packages:

```bash
npm install
# or
yarn install
```

#### Config MongoDB:

- See your Schema at [models folder](../../tree/main/src/resources/models).
- Create a `.env` file at project root folder as following:
```bash
NODE_ENV=development
PORT=3031 # Your development port
MONGO_URL=[your_mongodb_database_url]
JWT_SECRET=[secret_key_connect_to_mongodb]
```

#### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Server will run at [http://localhost:3031/](http://localhost:3031/)

## Deploy

We have deployed this project on Heroku, you can try out:
- Provinces of Vietnam
[`https://vn-real-estate-api.herokuapp.com/api/a/province/get`](https://vn-real-estate-api.herokuapp.com/api/a/province/get)
- Districts in Provinces with Province ID
[`https://vn-real-estate-api.herokuapp.com/api/a/disctrict/get?p=SG`](https://vn-real-estate-api.herokuapp.com/api/a/district/get?p=SG)

