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
);
CREATE table pay_options(
    id SERIAL PRIMARY KEY,
    description VARCHAR(45) NOT NULL,
    amount INT NOT NULL
);
Create TABLE payments_membresy(
    id SERIAL PRIMARY KEY,
    id_client INT,
    id_pay_option INT DEFAULT 2,
    pay_date DATE DEFAULT CURRENT_DATE,
    expiration_date Date,
    Foreign Key (id_client) REFERENCES clients(id),
    Foreign Key ( id_pay_option) REFERENCES clients(id)
);

INSERT INTO pay_options(description, amount) VALUES('Sesion', 10000);