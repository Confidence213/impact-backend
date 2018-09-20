# Impact Alumni API & Data Specification

## Tech Stack

- [**Express**](https://expressjs.com/) Node.js Framework
- [**Nodemailer**](https://nodemailer.com//) Email Delivery Service
- [**Sequalize.js**](https://http://docs.sequelizejs.com//) ORM
- [**MySQL**](https://www.mysql.com/) SQL Database
- [**bcrypt**](https://github.com/kelektiv/node.bcrypt.js) Password hashing function

## Preparation

### Database

Install `mysql` or `mariadb`

## Installation and Configuration

1. Run: `npm install` to install the dependencies
2. Create database
3. Edit .env
4. Run: `npm migrate` to create the tables into the database

## Running

### Development

1. Run: `npm run dev` to run server

### Production

1. Run: `npm run start` to run server

## API Endpoints

### Authentication

`Authorization: Bearer jwt.token.here`

Root URL: `http://localhost:3000`

### Posts

| Endpoint     | HTTP | Description        |
| ------------ | ---- | ------------------ |
| `/posts`     | GET  | Get all posts      |
| `/posts/:id` | GET  | Get thing by id    |
| `/posts`     | POST | Create a new post  |
| `/posts`     | DEL  | Delete all posts   |
| `/posts/:id` | DEL  | Delete thing by id |
| `/posts/:id` | PUT  | Update thing by id |

### Batches

| Endpoint                | HTTP | Description                  |
| ----------------------- | ---- | ---------------------------- |
| `/batches/`             | GET  | Get all batches              |
| `/batches/:id`          | GET  | Get batches by id            |
| `/batches/:id/students` | GET  | Get one id batch by students |

### Job Details

| Endpoint        | HTTP | Description                   |
| --------------- | ---- | ----------------------------- |
| `/jobDetails/`  | GET  | Get all jobDetails            |
| `/accounts`     | DEL  | Delete all accounts           |
| `/accounts/:id` | DEL  | Delete one user profile by id |
| `/accounts/:id` | PUT  | Update one user profile by id |

### Partners

| Endpoint     | HTTP | Description      |
| ------------ | ---- | ---------------- |
| `/partners/` | GET  | Get all partners |

### Students

| Endpoint                          | HTTP | Description                                      |
| --------------------------------- | ---- | ------------------------------------------------ |
| `/students/`                      | GET  | Get all students                                 |
| `/students/:id`                   | GET  | Get one student by id                            |
| `/students/generate_sign_up_form` | POST | Create sign up form students by email permission |
| `/students/set_password`          | POST | Create password                                  |
| `/students/login`                 | POST | Create login student                             |
| `/students/decode_token`          | POST | Create decode token                              |
| `/students/:id`                   | PUT  | Update students prifile                          |

### Students Apply Jobs

| Endpoint              | HTTP   | Description                      |
| --------------------- | ------ | -------------------------------- |
| `/students_apply/`    | POST   | Create a new students apply jobs |
| `/students_apply/:id` | DELETE | Delete students apply jobs by id |

### JWT Token

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTXVoYW1tYWQgSGFla2FsIiwiZW1haWwiOiI5M2hhZWthbEBnbWFpbC5jb20iLCJpYXQiOjE1MzcwMDUyNzIsImV4cCI6MTUzNzA5MTY3Mn0.hi93OeGo4qiBlthbZIU8s-dMIek9VNilby-tax65UQ4"
}
```

## License

[MIT License](./LICENSE)
