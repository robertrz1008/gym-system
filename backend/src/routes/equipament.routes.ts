import {request, Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { changeEquipmentImgRequest, createEquipmentRequest, deleteEquipmentRequest, getEquimentsRequest, getEquipmentsByFilterRequest, updateEquipmentRequest } from "../controllers/equipmentController"

const autRote = Router()

autRote.get("/getEquipaments", authRequired, getEquimentsRequest)
autRote.get("/getEquipaments/:filter", authRequired, getEquipmentsByFilterRequest)
autRote.post("/createEquipament", authRequired, createEquipmentRequest)
autRote.delete("/deleteEquipament/:id", authRequired, deleteEquipmentRequest)
autRote.put("/updateEquipament", authRequired, updateEquipmentRequest)
autRote.put("/changeImgEquipament/:equiId/:imgId", authRequired, changeEquipmentImgRequest)





export default autRote