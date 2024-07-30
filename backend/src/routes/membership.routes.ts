import {Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createPaymetRequest, getPayOptipsRequest } from "../controllers/PayController"

const memberRouter = Router()


memberRouter.get("/getPayMembership", authRequired, getPayOptipsRequest)
memberRouter.post("/createPayMembership", authRequired, createPaymetRequest)

export default memberRouter