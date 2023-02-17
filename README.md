# 🛍️ Tiny Store Challenge

TinyStore is a REST API for a e-commerce platform. Functionalities include handling products, shopping cart, orders, authentication, and user preferences. This project is built using Node.js, Nest.js, and PostgreSQL, ensuring fast and efficient data handling. The different modules have been thoroughly tested and secure, ensuring that sensitive information is always protected.

## 🕹️ Live Demo

Dummy Client

```json
{
  "email": "client@example.com",
  "password": "clientPassword"
}
```

Dummy Manager

```json
{
  "email": "manager@example.com",
  "password": "managerPassword"
}
```

Swagger API Documentation: https://tiny-store-api.herokuapp.com/api-docs/

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`DATABASE_URL`

## 💻 Run Locally

Clone the project

```bash
  git clone https://github.com/MarcoMnrq/Ravn-Challenge-V2-Marco
```

Go to the project directory

```bash
  cd Ravn-Challenge-V2-Marco
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start:dev
```

## 🧪 Running Tests

To run tests, run the following command

```bash
  yarn test
```

## 🌟 Features

- Authentication using JWT Strategy, Guards & Custom Decorators
- Authorization based on RBAC with two roles: CUSTOMER & MANAGER
- Clean folder structure, commented code & API documentation with Swagger
- Prisma Global Module, Singletons for S3 Upload Service & various utilities
- Managers can create, read, update & delete Products. Clients can read visible products
