# Motaz Image Processing API Project

 
## Table of Contents

* [Summary](#Summary)

* [Technologies](#Technologies)

* [Structure](#Structure)

* [Database Migration](#Database-Migration)
 
* [Features](#Features)

* [Usage and Installation](#usage-and-installation)

* [API Endpoints](#api-endpoints)
* [Build](#Build)

* [Testing](#Testing)

## Summary
Storefront Backend API that I built as part of Udacity's Advanced Full-Stack Web Development Nanodegree Program which meets the requirements stated on [REQUIREMENTS.md](REQUIREMENTS.md) file.
## Technologies

| Technology   |  Usage       |
| -----------  | ------------ |
|**NodeJS**    |Runtime         |
|**Express**   |Backend web application framework           |
|**Jasmine**   |Unit testing         |
|**Typescript**|Programming language | 
|**Postgres**  | Relational Database Management System (RDBMS)     |
|**db-migrate**| Database Migrations     |
|**Bcrypt**     |Password salting and peppering    |
|**dotenv**     |Environment Variables |
|**jsonwebtoken**     |working with JWTs |
## Structure 
```
+---migrations
|   |   20220106202112-Users-Table.js
|   |   20220106202125-Products-Table.js
|   |   20220108145906-Orders.js
|   |   20220108145919-Order-products.js
|   |   
|   \---sqls
|           20220106202112-Users-Table-down.sql
|           20220106202112-Users-Table-up.sql
|           20220106202125-Products-Table-down.sql
|           20220106202125-Products-Table-up.sql
|           20220108145906-Orders-down.sql
|           20220108145906-Orders-up.sql
|           20220108145919-Order-products-down.sql
|           20220108145919-Order-products-up.sql
|           
+---spec
|   | 
|   \---support
|           jasmine.json
|           
\---src
    |   config.ts
    |   database.ts
    |   server.ts
    |   
    +---middleware
    |       authorize.ts
    |       mylogger.ts
    |       
    +---models
    |       dbConnect.ts
    |       order.ts
    |       product.ts
    |       user.ts
    |       
    +---routes
    |   |   index.ts
    |   |   
    |   \---API_V1
    |       |   index.ts
    |       |   
    |       \---handlers
    |               orders.ts
    |               products.ts
    |               users.ts
    |               
    +---tests
    |   |   serverSpec.ts
    |   |   
    |   +---handlers
    |   |       ordersSpec.ts
    |   |       productsSpec.ts
    |   |       usersSpec.ts
    |   |       
    |   +---helpers
    |   |       reporter.ts
    |   |       
    |   +---Models
    |           orderSpec.ts
    |           productSpec.ts
    |           userSpec.ts
    |           
    \---Utilities
            formater.ts
            
```
## Database Migration

Full database migration scheme is available.
Please use the following command to install db-migrate globally

```
npm install -g db-migrate
```

Create two databases, one for production and one for testing.
follow the following commands

```
psql -U username
# Enter Password
CREATE DATABASE databaseName;
CREATE DATABASE testDatabaseName;
```

Update [.env](.env) file in the project root filder and replace the following fields for the database connection using the the template in the file with your information

```
# Server Port Setup 
PORT= 4000

# Development environment or Test environment
ENV = dev

# Security
BCRYPT_PASSWORD= YOUR_PEPPER_HERE
SALT_ROUNDS= 10
TOKEN_SECRET= JWT_SECRET

# Postgres database info
POSTGRES_HOST = 127.0.0.1
POSTGRE_DB = DB_NAME_HERE
POSTGRE_TEST_DB = TEST_DB_NAME_HERE
POSTGRES_USER = DB_USER
POSTGRE_PASSWORD= DB_USER_PASSWORD
POSTGRES_PORT= 5432
```

Then use the following command to migrate the tables automatically to your new database

```
db-migrate up
```
or if you didn't install db-migrate globally, you can run the following command 
```
npm run Build-DB
```
## Features

### **User**
```
- Register as a new user.
- Log in as an existing user.
- Update your user data as soon as you log in.
- Delete your user account and all its data.
```
###  **Product**
```
- Adding a new product.
- Product update.
- Delete an existing product.
```
### **Order**
```
- Add a new order.
- Update order.
- Delete an existing order.
```

### **Protection**
```
- Use salted and peppered passwords.
- Authentication and authorization using JWT.
```
## Usage and Installation
You can set up and run the project in simple steps
Install the required packages using the following command.
```
npm install
```
Then follow the steps mentioned in the [Database Migration](#Database-Migration) section.
## API Endpoints

| Endpoint | Request | Parameters | Requires Token | Usage          |
| -------- | ------- | ---------- | -------------- | -------------- |
| **/**    | **GET** | **N/A**    | **False**   | **Root Route** |
| **/api/v1/**    | **GET** | **N/A**    | **False**    | **APIs Root Route** |


#### **User:**

| Endpoint         | Request    | Parameters                            | Requires Token | Usage               |
| ---------------- | ---------- | ------------------------------------- | -------------- | ------------------- |
| **/user**       | **GET**    | **N/A**                               | **True** \*    | **List Users**      |
| **/user/:id**   | **GET**    | **id**                                | **True** \*    | **Show user by Id** |
| **/user**       | **POST**   | **firstname, lastname, password**     | **False**      | **Create User**     |
| **/user**       | **PUT**    | **id, firstname, lastname, password** | **True** \*    | **Update User**     |
| **/user**       | **DELETE** | **id**                                | **True** \*    | **Delete User**     |
| **/use/login** | **POST**   | **firstname, lastname, password**     | **False**      | **Logs user in**    |

#### **Product:**

| Endpoint          | Request    | Parameters                    | Requires Token | Usage                  |
| ----------------- | ---------- | ----------------------------- | -------------- | ---------------------- |
| **/product**     | **GET**    | **N/A**                       | **False**      | **List products**      |
| **/product/:id** | **GET**    | **id**                        | **False**      | **Show product by Id** |
| **/product**     | **POST**   | **name, price, category**     | **True** \*    | **Create product**     |
| **/product**     | **PUT**    | **id, name, price, category** | **True** \*    | **Update product**     |
| **/product**     | **DELETE** | **id**                        | **True** \*    | **Delete product**     |


#### **Order:**

| Endpoint                 | Request    | Parameters                   | Requires Token | Usage                    |
| ------------------------ | ---------- | ---------------------------- | -------------- | ------------------------ |
| **/order**              | **GET**    | **N/A**                      | **False**      | **List orders**          |
| **/order/:id**          | **GET**    | **id**                       | **False**      | **Load order by Id**     |
| **/order**              | **POST**   | **status, user_id**          | **True** \*    | **Create order**         |
| **/order**              | **PUT**    | **id, status, user_id**      | **True** \*    | **Update order**         |
| **/order**              | **DELETE** | **id**                       | **True** \*    | **Delete order**         |
| **/order/:id/products** | **POST**   | **id, product_id, quantity** | **True** \*    | **Add product to order** |

#### \* You will receive the token once you create a new user account or log in.

it requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.
``` 
npm run start
```
## Build

To build the project use the following command
```
npm run Build
```

## Testing

A comprehensive tests are available to test the server endpoints and functions

To start the unit testing
```
npm run test
```
