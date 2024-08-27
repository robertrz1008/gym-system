import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { CustomRequest } from "../utils/Interfaces";

export const getSalesReportRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = `
            select sa.date, pro.description as "product", pro.price_venta, pd.amount, pd.subtotal 
                from sales as sa JOIN product_detail as pd on sa.id = pd.id_sale 
                join products as pro on pro.id = pd.id_product
            WHERE sa.id_user = '${req.user.id}' and sa.date between $1 and $2`

        const response = await pgClient.query(sqlQuery, [req.params.date1, req.params.date2])
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const getMonthlySalesResponse = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const query = `
            select to_char(date_trunc('Month', date), 'TMMonth') as "month", sum(total) as "income"
            FROM sales 
            WHERE DATE_TRUNC('year', date) = DATE_TRUNC('year', CURRENT_DATE) and id_user = 1
            GROUP BY month ORDER BY month
        `
        const response = await pgClient.query(query)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const createSaleRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()

        const sqlQuery = "INSERT INTO sales(id_user) VALUES($1)"
        await pgClient.query(sqlQuery, [req.user.id])
        const pro = await pgClient.query("SELECT * FROM sales ORDER BY id DESC LIMIT 1")
        pgClient.release()
        //obteniendo el objeto del producto
        res.json(pro.rows[0].id)
        console.log(pro.rows[0].id)
        pgClient.release()
    } catch (error) {
        console.log(error) 
    }
}
export const createProductDetialRequest = async (req: CustomRequest, res: Response) => {
    const {proId, idSale, amount, subTotal} = req.body
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO product_detail(id_product, id_sale, amount, subtotal) VALUES($1, $2, $3, $4)"
        await pgClient.query(sqlQuery, [proId, idSale, amount, subTotal ])
        res.json({msg: "detalle de producto registrado"})
        pgClient.release()
    } catch (error) {
        console.log(error)
    }
}

export const updateTotalSaleRequest = async (req: Request, res: Response) => {
    const {total} = req.body
    try {
        const pgClient = await connectdb.connect()
        const query = "UPDATE sales SET total = $1 WHERE id = $2"
        await pgClient. query(query, [total, req.params.id])
        res.json({msg: "MOdigicado el total de la venta !"})
        pgClient.release()
    } catch (error) {
        console.log(error)
    }
}

export const getTodaysIncome = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const query = `
           SELECT sum(total) from sales 
           WHERE DATE_TRUNC('day', date) = DATE_TRUNC('day', CURRENT_DATE) and id_user = ${req.user.id}
        `
        const response = await pgClient.query(query)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
