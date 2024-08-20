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
);

CREATE TABLE client_status(
    id SERIAL PRIMARY KEY,
    description VARCHAR(45) NOT null,
)

CREATE TABLE clients(
    id  SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    telephone VARCHAR(20),
    dni VARCHAR(30)NOT NULL,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
    id_status INT,
    Foreign Key (id_status) REFERENCES client_status(id)
);
alter Table clients ADD COLUMN id_status INT

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    description VARCHAR(30) NOT NULL
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
);


CREATE TABLE products(
    id  SERIAL PRIMARY KEY,
    description VARCHAR(45) NOT NULL,
    price_compra INT,
    price_venta INT NOT NULL,
    stock INT,
    id_image INT DEFAULT 1,
    id_user INT NOT NULL,
    id_category INT,
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_image) REFERENCES images(id),
    Foreign Key (id_category) REFERENCES categories(id)
)

CREATE Table equipments(
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    observation VARCHAR(45) NOT NULL,
    amount  INT DEFAULT 1,
    id_image INT DEFAULT 1,
    id_user INT NOT NULL,
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_image) REFERENCES images(id)
);
Create TABLE payments_membership(
    id SERIAL PRIMARY KEY,
    id_client INT,
    id_pay_option INT DEFAULT 2,
    pay_date DATE DEFAULT CURRENT_DATE,
    expiration_date Date,
    id_user int NOT NULL,
    Foreign Key (id_user) REFERENCES users(id)
    Foreign Key (id_client) REFERENCES clients(id),
    Foreign Key ( id_pay_option) REFERENCES pay_options(id),
    total INT
); 

CREATE TABLE sales(
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user INT,
    total int not null,
    Foreign Key (id_user) REFERENCES users(id)
);
CREATE TABLE product_detail(
    id SERIAL PRIMARY KEY,
    id_product INT NOT NULL,
    id_sale INT NOT NULL,
    amount INT DEFAULT 1,
    subtotal INT NOT null,
    Foreign Key (id_product) REFERENCES products(id),
    Foreign Key (id_sale) REFERENCES sales(id)
);

CREATE table pay_options(
    id SERIAL PRIMARY KEY,
    description VARCHAR(45) NOT NULL,
    amount INT NOT NULL
);



ALTER Table products ADD COLUMN id_category INT;
ALTER TABLE products
ADD CONSTRAINT fk_category
FOREIGN KEY (id_category)
REFERENCES categories (id);




insert into categories(description) values('Debida'), ('Nutricion')

SELECT * from sales;

ALTER Table products alter COLUMN id_image add DEFAULT;
ALTER TABLE products ADD COLUMN id_ctegory INT;

alter table sales add column total  int;

ALTER TABLE clients
ADD CONSTRAINT fk_id_status FOREIGN KEY (id_status)
REFERENCES client_status(id);

SELECT * FROM clients


ALTER TABLE categories
ALTER COLUMN id_user SET NOT NULL;

ALTER TABLE payments_membership
ADD CONSTRAINT fk_id_user FOREIGN KEY (id_user)
REFERENCES users(id);


update clients set id_status = 2 where id = 10

select * from clients

SELECT 
    cli.id, 
    cli.name, 
    pm.pay_date AS "datePay", 
    pm.expiration_date AS "dateExpired", 
    cs.description AS "status"
FROM 
    clients AS cli
JOIN 
    client_status AS cs 
    ON cli.id_status = cs.id
JOIN 
    payments_membership AS pm 
    ON pm.id_client = cli.id
JOIN 
    (
        SELECT 
            id_client, 
            MAX(pay_date) AS max_pay_date
        FROM 
            payments_membership
        GROUP BY 
            id_client
    ) AS last_payment 
    ON pm.id_client = last_payment.id_client 
    AND pm.pay_date = last_payment.max_pay_date
WHERE 
    pm.id_pay_option = 1 
    AND cli.id_user = 1
ORDER BY 
    pm.pay_date DESC;