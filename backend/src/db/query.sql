-- Active: 1719705734888@@localhost@5432@gymdb

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    type VARCHAR(45),
    name VARCHAR(45) NOT NULL,  
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
    name VARCHAR(45) NOT NULL,
    telephone VARCHAR(20),
    dni VARCHAR(30)NOT NULL,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
);

CREATE TABLE products(
    id  SERIAL PRIMARY KEY,
    description VARCHAR(45) NOT NULL,
    price_compra DECIMAL(10, 2),
    price_venta DECIMAL(10, 2) NOT NULL,
    id_image INT DEFAULT 3,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_image) REFERENCES images(id)
)

CREATE Table equipments(
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    observation VARCHAR(45) NOT NULL,
    id_image INT DEFAULT 3,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_image) REFERENCES images(id)
);
CREATE TABLE sales(
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
);
CREATE TABLE product_detail(
    id SERIAL PRIMARY KEY,
    id_product INT NOT NULL,
    id_sale INT NOT NULL,
    Foreign Key (id_product) REFERENCES products(id),
    Foreign Key (id_sale) REFERENCES sales(id)
)

ALTER Table equipments ADD amount INT DEFAULT 1;

select * from clients;

INSERT INTO users(name, email, password) VALUES( 'test1', 'test1@gmail.com', '12345678')

drop table users

DELETE FROM users;

INSERT INTO clients(name, telephone, dni, id_user) VALUES('Alejandro Andres', '88909878', '3333333', 5)

SELECT * FROM equipments;

DROP table products;

SELECT id, name FROM images;

delete from images WHERE id > 3