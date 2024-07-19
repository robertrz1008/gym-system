import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { CustomRequest } from "../utils/Interfaces";

export const getEquimentsRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from equipments order by id")
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const getEquipmentsByFilterRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const query = `SELECT * FROM equipments WHERE description ILIKE '%${req.params.filter}%' AND id_user = '${req.user.id}'`
        const response = await pgClient.query(query)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const createEquipmentRequest = async (req: CustomRequest, res: Response) => {
    const {description, observation, amount} = req.body
    try {
        console.log("creando producto")
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO equipments(description, observation, amount, id_user) VALUES($1, $2, $3, $4)"
        await pgClient.query(sqlQuery, [description, observation, amount,req.user.id])
        const pro = await pgClient.query("SELECT * FROM equipments ORDER BY id DESC LIMIT 1")
        pgClient.release()
        //obteniendo el objeto del producto
        console.log(pro.rows)
        res.json(pro.rows[0].id)
    } catch (error) {
        console.log(error) 
    }
}
export const changeEquipmentImgRequest = async (req: CustomRequest, res: Response) => {
    const {equiId, imgId} = req.params
    try {
        console.log("cambiando la imagen del equpipo")
        const pgClient = await connectdb.connect()
        const sqlQuery = "update equipments set id_image = $1 where id = $2"
        await pgClient.query(sqlQuery, [imgId, equiId])
        pgClient.release()
        res.json({msg: "Se ha cambiado la imagen del equipo"})
    } catch (error) {
        console.log(error)
    }
}
export const deleteEquipmentRequest = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("DELETE FROM equipments WHERE id = $1", [req.params.id])
        pgClient.release()
        res.json({msg: "producto eliminado"})

    } catch (error) {
        console.log(error)
    }
}
export const updateEquipmentRequest = async (req: Request, res: Response) => {
    const {id, description, observation, amount} = req.body
    try {
        const pgClient = await connectdb.connect()
        const query = "update equipments set description = $1, observation = $2, amount = $3 where id = $4"
        await pgClient.query(query, [description, observation, amount, id])
        pgClient.release()
        res.json({msg: "producto modificado"})
    } catch (error) {
        console.log(error)
    }
}