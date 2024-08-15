import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { CustomRequest, ProductParams } from "../utils/Interfaces";


export const getCategoryesRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from categories")
        pgClient.release() 
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const getCategoryByIdRequest = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from categories where id = $1", [req.params.id])
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const createCategoryRequest = async (req: CustomRequest, res: Response) => {
    const {description} = req.body
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO categories(description) VALUES($1)"
        await pgClient.query(sqlQuery, [description])
        pgClient.release()
        res.status(501).json({msg: "success"})
    } catch (error) {
        console.log(error) 
    }
}

export const getProductsRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = `
        select pr.id, pr.description, pr.price_venta, pr.price_compra, pr.stock, pr.id_category, pr.id_image, ca.description as "category_name"
            from products as pr LEFT JOIN categories as ca 
            on pr.id_category = ca.id;
        `
        const response = await pgClient.query(sqlQuery)
        pgClient.release()
        res.json(response.rows)
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
    const {description, price_compra, price_venta, stock, id_category} = req.body
    console.log(req.body)
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO products(description, price_compra, price_venta,  id_user, stock, id_category) VALUES($1, $2, $3, $4, $5, $6)"
        await pgClient.query(sqlQuery, [description, price_compra, price_venta, req.user.id, stock, id_category])
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
        console.log("obteniendo id_image del producto")
        const product = await pgClient.query("select * from products where id = $1", [req.params.id])
        const par = product.rows[0].id_image
        await pgClient.query("DELETE FROM products wHERE id = $1", [req.params.id])
        console.log("eliminado la imagen del producto")
        await pgClient.query("DELETE FROM images wHERE id = $1", [par])
        pgClient.release()
        res.json({msg: "producto eliminado"})

    } catch (error) {
        console.log(error)
    }
}

export const updateProductoRequest = async (req: Request, res: Response) => {
    const {id, description, price_compra, price_venta, stock, id_category} = req.body
    console.log(req.body)
    try {
        const pgClient = await connectdb.connect()
        const query = "update products set description = $1, price_compra = $2, price_venta = $3, stock = $4, id_category = $5 where id = $6"
        await pgClient.query(query, [description, price_compra, price_venta, stock, id_category, id])
        pgClient.release()
        res.json({msg: "producto modificado"})
        console.log("producto modificado")
    } catch (error) {
        console.log(error)
    }
}

export const getProductListedRequest = async (req: Request, res: Response) => {

    function setOrderBy(n: number){
        if(n == 1) return "description"
        if(n == 2) return "price_compra"
    }

    function sqlQuery(proParams: ProductParams): string{

        let script = `select pr.id, pr.description, pr.price_venta, pr.price_compra, pr.stock, pr.id_category, pr.  id_image, ca.description as "category_name"
            from products as pr LEFT JOIN categories as ca 
            on pr.id_category = ca.id where pr.description like '%%' `

        if(proParams.isStock){
            script += `and pr.stock > 0 `
        }
        if(proParams.categoryId){
            script += `and pr.id_category = ${proParams.categoryId} `
        }
        if(proParams.fromPrice && proParams.toPrice){
            script += `and pr.price_compra between ${proParams.fromPrice} and ${proParams.toPrice} `
        }
        if(proParams.orderBy > 0){
            script += `order by pr.${setOrderBy(proParams.orderBy)} `

            if(proParams.order == 1){
                script += `desc`
            }else{
                script += `asc`
            }
        }
        console.log(script)
        return script
    }

    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(sqlQuery(req.body))
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }

}
