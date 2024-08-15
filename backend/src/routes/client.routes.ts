import {request, Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { changeImage, createClientRequest, createImage, deleteClientRequest, deleteImage, getClientByFilterRequest, getClientsListedRequest, getClientsRequest, getImagesById, updateClientRequest } from "../controllers/clientController"
import upload from "../middleware/upload"

const autRote = Router()

autRote.get("/getClients", authRequired, getClientsRequest)
autRote.get("/getClients/:filter", authRequired, getClientByFilterRequest)
autRote.post("/getClientsListed", authRequired, getClientsListedRequest)
autRote.post("/createClient", authRequired, createClientRequest)
autRote.delete("/deleteClient/:id", authRequired, deleteClientRequest)
autRote.put("/updateClient", authRequired, updateClientRequest)
autRote.get("/getImage/:id", authRequired, getImagesById)
autRote.post("/createImage", authRequired, upload, createImage) 
autRote.put("/changeImage/:id", authRequired, changeImage)
autRote.delete("/deleteImage/:id", authRequired, deleteImage)





export default autRote
