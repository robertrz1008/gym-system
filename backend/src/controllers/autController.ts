import { Request, Response } from "express";
import connectdb from "../db/conectiondb";
import bcrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken";
import { createAccessToken } from "../lib/jwt";
import { CustomRequest, User } from "../utils/Interfaces";
import { TOKEN_SECREAT } from "../utils/config";

export const getUsersRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("select * from users where id = $1", [req.user.id])
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const registerRequest = async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const passwordCrypt = await bcrypt.hash(password, 3) 

    try {
        const pgClient = await connectdb.connect()

        await pgClient.query(`INSERT INTO users(name, email, password) VALUES( $1, $2, $3);`,[name, email, passwordCrypt])
        const response = await pgClient.query("SELECT * FROM users WHERE email = $1", [email])

        if(Array.isArray(response.rows)){
            const userFound: User | any = response.rows[0]
            const token = await createAccessToken({ id: userFound.id })

            res.cookie("token", token)

            res.json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email, 
                password: userFound.password
            })
        }
        pgClient.release()

    } catch (error) {
        console.log(error)
        res.status(400).json([ "El coreo esta en uso"])
    }
}

export const loginReguest = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const pgClient = await connectdb.connect()

        const response = await pgClient.query("SELECT * FROM users WHERE email = $1", [email])
        if(Array.isArray(response.rows) && response.rows.length == 0) return res.status(404).json(["no se reconoce el email"])

        if(Array.isArray(response.rows)){
            const userFound: User | any = response.rows[0]
            const isMatch = await bcrypt.compare(password, userFound.password) 

            if(!isMatch) return res.status(404).json(["La contraseña es incorrecta"])

            const token = await createAccessToken({id: userFound.id}) 
            res.cookie("token", token)
            res.send(`Bienvenido ${userFound.name}`)
        }
        pgClient.release()

    } catch (error) {
        console.log(error)
    }
}
export const logoutRequest = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}
export const comparePasswordRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query("SELECT * FROM users WHERE id = $1", [req.user.id])
        const profile = response.rows[0]
        const isMatch = await bcrypt.compare(req.params.pass, profile.password) 

        if(!isMatch) return res.status(404).json({res: true})

        res.status(501).json({res: false})
    } catch (error) {
        console.log(error)
    }
}

export const profileRequest = async (req: CustomRequest, res: Response) => {
    try {
        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`SELECT * FROM users WHERE id = $1`, [req.user.id])
        pgClient.release()
        if(!response.rows){
            return res.status(404).json({message: "User not Found"}) 
        }
        res.json(response.rows) 

    } catch (error) {
        console.log(error)
    }
} 

export const verifyToken = async (req: CustomRequest, res: Response) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({msg: "No autorizado"})

    Jwt.verify(token, TOKEN_SECREAT, async (error: Jwt.VerifyErrors | null, user: any) => {
        if(error) return res.status(400).json({message: "Token Fallido"})

        const pgClient = await connectdb.connect()
        const response = await pgClient.query(`SELECT * FROM users WHERE id = $1 `, [user.id])
        pgClient.release()

        if(!response.rows) return res.status(404).json({message: "No hay Token"})
        
        res.json(response.rows[0])
    })
}
export const updateProfileRequest = async (req: CustomRequest, res: Response) => {
    const {name, email} = req.body
    try {
        const pgClient = await connectdb.connect()
        const sqlQuery = "update users set name = $1, email = $2 where id = $3"
        const response = await pgClient.query(sqlQuery, [name, email, req.user.id])
        pgClient.release()
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

export const changeProfileImgRequest = async (req: CustomRequest, res: Response) => {
    const {proId, imgId} = req.params
    try {
        console.log("cambiando la imagen del producto")
        const pgClient = await connectdb.connect()
        const sqlQuery = "update users set image_id = $1 where id = $2"
        await pgClient.query(sqlQuery, [imgId, proId])
        pgClient.release()
        res.json({msg:"exito"})
    } catch (error) {
        console.log(error)
    }
}