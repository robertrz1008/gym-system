import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { CustomRequest } from "../utils/Interfaces";


export const getProductsRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from products order by id")
        pgClient.release()
        res.json(response.rows)
        console.log(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const getProductsByFilterRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const query = `SELECT * FROM products WHERE description ILIKE '%${req.params.filter}%' AND id_user = '${req.user.id}'`
        const response = await pgClient.query(query)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const createProductRequest = async (req: CustomRequest, res: Response) => {
    const {description, price_compra, price_venta, stock} = req.body
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO products(description, price_compra, price_venta,  id_user, stock) VALUES($1, $2, $3, $4)"
        await pgClient.query(sqlQuery, [description, price_compra, price_venta, req.user.id, stock])
        const pro = await pgClient.query("SELECT * FROM products ORDER BY id DESC LIMIT 1")
        pgClient.release()
        //obteniendo el objeto del producto
        res.json(pro.rows[0].id)
    } catch (error) {
        console.log(error) 
    }
}
export const changeProductImgRequest = async (req: CustomRequest, res: Response) => {
    const {proId, imgId} = req.params
    try {
        console.log("cambiando la imagen del producto")
        const pgClient = await connectdb.connect()
        const sqlQuery = "update products set id_image = $1 where id = $2"
        await pgClient.query(sqlQuery, [imgId, proId])
        pgClient.release()
        console.log("se ha cambiado la img del producto")
        res.json({msg: "Se ha cambiado la imagen del producto"})
    } catch (error) {
        console.log(error)
    }
}
export const updateProductStockRequest = async (req: CustomRequest, res: Response) => {
    const {stock} = req.body
    try {
        // if(stock == 0) return res.status(404).json([""])
        console.log("restando el stock del producto")
        const pgClient = await connectdb.connect()
        const pro = await pgClient.query("select * from products where id = $1", [req.params.id])
        const result = pro.rows[0].stock - stock
        const sqlQuery = "update products set stock = $1 where id = $2"
        await pgClient.query(sqlQuery, [result, req.params.id])
        pgClient.release()
        res.json({msg: "Se ha restado el stock del producto"})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductRequest = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("DELETE FROM products wHERE id = $1", [req.params.id])
        pgClient.release()
        res.json({msg: "producto eliminado"})

    } catch (error) {
        console.log(error)
    }
}
export const updateProductoRequest = async (req: Request, res: Response) => {
    const {id, description, price_compra, price_venta, stock} = req.body
    try {
        const pgClient = await connectdb.connect()
        const query = "update products set description = $1, price_compra = $2, price_venta = $3, stock = $4 where id = $5"
        await pgClient.query(query, [description, price_compra, price_venta, stock, id])
        pgClient.release()
        res.json({msg: "producto modificado"})
    } catch (error) {
        console.log(error)
    }
}



