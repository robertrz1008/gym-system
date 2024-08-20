-- Active: 1719705734888@@localhost@5432@practica
CREATE Table pago(
    id SERIAL,
    description VARCHAR(35),
    pay_date DATE DEFAULT CURRENT_DATE
)

insert into pago(description) VALUES('libro', )

SELECT * FROM pago