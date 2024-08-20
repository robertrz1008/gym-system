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

export const createPaymetRequest = async (req: CustomRequest, res: Response) => { 
    const { id_client, id_pay_option, pay_date, expiration_date} = req.body

    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO payments_membership(id_client, id_pay_option, pay_date, expiration_date, id_user) VALUES($1, $2, $3, $4, $5)"
        await pgClient.query(sqlQuery, [id_client, id_pay_option, pay_date, expiration_date, req.user.id])

        //si el pago es mensual, el cliente sera miembro
        if(id_pay_option == 1){
            await pgClient.query("update clients set id_status = 1 where id = $1", [id_client])
        }

        // obtenemos el tipo del pago realizado
        const pays = await pgClient.query("select * from payments_membership ORDER BY id DESC LIMIT 1")
        //obtenemos el monto del tipo de pago
        const typePay = await pgClient.query("select * from pay_options where id = $1", [pays.rows[0].id_pay_option])
        //Agregamos el monto al al pago realizado
        const total = typePay.rows[0].amount
        const paymentId = pays.rows[0].id
        await pgClient.query("update payments_membership set total = $1 where id = $2", [total, paymentId])
        res.json(total)
        pgClient.release()
    } catch (error) {
        console.log(error)        
    }
}

export const expireMembershipRequest = async (req: Request, res: Response) => {

    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("update clients set id_status = 2 where id = $1", [req.params.id])
        res.status(501)
        console.log("membresia vencida")
        pgClient.release()

    } catch (error) {
        
    }
}