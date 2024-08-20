import {Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createPaymetRequest, expireMembershipRequest, getPayOptipsRequest } from "../controllers/PayController"

const memberRouter = Router()


memberRouter.get("/getPayMembership", authRequired, getPayOptipsRequest)
memberRouter.post("/createPayMembership", authRequired, createPaymetRequest)
memberRouter.put("/expireMembership/:id", authRequired, expireMembershipRequest)

export default memberRouter