import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import { ClientFilter, CustomRequest } from "../utils/Interfaces";
import path from "path"
import fs from "fs"
import { getElementByNumber } from "../utils/seachFile";

type Image ={
    id: number,
    name: string, 
    data: string
}

export const getClientsRequest = async (_req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from clients")
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const getClientByFilterRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const query = `SELECT * FROM clients WHERE name ILIKE '%${req.params.filter}%' AND id_user = '${req.user.id}'`
        const response = await pgClient.query(query)
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}
export const createClientRequest = async (req: CustomRequest, res: Response) => {
    const {name, telephone, dni} = req.body
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "INSERT INTO clients(name, telephone, dni, id_user) VALUES($1, $2, $3, $4)"
        await pgClient.query(sqlQuery, [name, telephone, dni, req.user.id])
        pgClient.release()
        res.json({msg: "Cliente creado"})
    } catch (error) {
        console.log(error)
    }
}
export const deleteClientRequest = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("DELETE FROM clients wHERE id = $1", [req.params.id])
        pgClient.release()
        res.json({msg: "Cliente eliminado"})

    } catch (error) {
        console.log(error)
    }
}

export const updateClientRequest = async (req: Request, res: Response) => {
    const {id ,name, telephone, dni} = req.body
    try {
        const pgClient = await connectdb.connect()
        const query = "update clients set name = $1, telephone = $2, dni = $3 where id = $4"
        await pgClient.query(query, [name, telephone, dni, id])
        pgClient.release()
        res.json({msg: "Cliente modificado"})
    } catch (error) {
        console.log(error)
    }
}

export const getImagesById = async (req: Request, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query('SELECT * FROM images WHERE id = $1', [req.params.id])
        if(Array.isArray(response.rows) && response.rows.length == 0) res.status(404).json({msg: "no hay archivos"})
        
        const file: Image[] = response.rows
        //contruye los datos de la db a un archivo .png
        fs.writeFileSync(path.join(__dirname, '../dbImages/' + file[0].id + "-sf.png"), file[0].data)
        //la coleccion de todas las imagenes creadas
        const images = fs.readdirSync(path.join(__dirname, '../dbImages/')) 
        //se selecciona la imagen 
        let fileFound = getElementByNumber(images, parseInt(req.params.id))

        pgClient.release()
        res.json(fileFound)
    } catch (error) {
        console.log(error)
    }
}

export const createImage = async (req: Request, res: Response) => {
    console.log("creando producto")
    const type = req.file?.mimetype
    const name = req.file?.originalname
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file?.filename))
    try {
        const pgClient = await connectdb.connect()
        //subimos la img a la db
        await pgClient.query('INSERT INTO images(type, name, data)  VALUES($1, $2, $3)', [type, name, data])
        //seleccionamos la ultima img de la tabla
        const myImages = await pgClient.query('SELECT * FROM images ORDER BY id DESC LIMIT 1')
        pgClient.release()
        
        if(Array.isArray(myImages.rows))  res.json(myImages.rows[0].id) 
    } catch (error) {
        console.log(error)
    }
}

export const changeImage = async (req: CustomRequest, res: Response) => {
    const imgId = req.params.id
    const {id} = req.body
    try {
        const pgClient = await connectdb.connect()
        await pgClient.query("update users set id_image = $1 where id = $2", [imgId, id])
        pgClient.release()
        res.send("mensaje modificado")
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    try {
        console.log("eliminando producto")
        const pgClient = await connectdb.connect()
        await pgClient.query("DELETE FROM images WHERE id = $1", [req.params.id])
        pgClient.release()
        res.send("mensaje eliminado")
    } catch (error) {
        console.log(error)
    }
}

export const getClientsListedRequest = async (req: Request, res: Response) => {
    console.log(req.body)
    function sqlQuery(filter: ClientFilter): string{
        function setOrderBy(n: number) {
            if(n == 1) return "desc"
            if(n == 2) return "asc"
        }

        let script = `select * from clients  where name like '%%' `

        if(filter.memberships){
            script += `and id_status = 1 `
        }
        if(filter.orderByName){
            script += ` order by name ${setOrderBy(filter.orderByName)}`
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