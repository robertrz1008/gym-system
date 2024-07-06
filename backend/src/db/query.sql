-- Active: 1719705734888@@localhost@5432@gymdb

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    type CHARACTER(45),
    name CHARACTER(45) NOT NULL, 
    data BYTEA
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT null,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) not NULL,
    image_id INT,
    Foreign Key (image_id) REFERENCES images(id)
)

CREATE TABLE clients(
    id  SERIAL PRIMARY KEY,
    name CHARACTER(45) NOT NULL,
    telephone CHARACTER(20),
    dni CHARACTER(30)NOT NULL,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
)

select * from users

INSERT INTO users(name, email, password) VALUES( 'test1', 'test1@gmail.com', '12345678')

drop table users