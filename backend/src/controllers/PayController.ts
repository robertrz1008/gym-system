import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { CustomRequest } from "../utils/Interfaces";

export const getPayOptipsRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from pay_options order by id")
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const createPaymetRequest = async (req: Request, res: Response) => {
    const { id_client, id_pay_option, pay_date, expiration_date} = req.body

    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO payments_membresy(id_client, id_pay_option, pay_date, expiration_date) VALUES($1, $2, $3, $4)"
        await pgClient.query(sqlQuery, [id_client, id_pay_option, pay_date, expiration_date])
        // obtenemos el tipo del pago realizado
        const pays = await pgClient.query("select * from payments_membresy ORDER BY id DESC LIMIT 1")
        //obtenemos el monto del tipo de pago
        const typePay = await pgClient.query("select * from pay_options where id = $1", [pays.rows[0].id_pay_option])
        //Agregamos el monto al al pago realizado
        await pgClient.query("insert into payments_membresy(total) values($1)", [typePay.rows[0].amount])
        res.json({msg: "pago realizado"})
        pgClient.release()
    } catch (error) {
        console.log(error)        
    }
}