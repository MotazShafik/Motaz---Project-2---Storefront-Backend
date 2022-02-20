/* Replace with your SQL commands */
 CREATE TABLE orders (
 id SERIAL PRIMARY KEY,
   status VARCHAR(100),
   user_id BIGINT REFERENCES Users(id)
  );