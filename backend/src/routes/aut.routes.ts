import {request, Router} from "express"
import { getUsersRequest, loginReguest, logoutRequest, profileRequest, registerRequest, verifyToken } from "../controllers/autController"
import { requireInput, validateSchema } from "../middleware/validatorMiddleware"
import {loginSchema, registerSchema} from "../schemas/authSchema"
import { authRequired } from "../middleware/validatorToken"

const autRote = Router()

autRote.get("/users", getUsersRequest)
autRote.post("/register", requireInput, validateSchema(registerSchema), registerRequest)
autRote.post("/login", validateSchema(loginSchema), loginReguest)
autRote.post("/logout", logoutRequest)
autRote.get("/profile", authRequired, profileRequest)
autRote.get("/Verify", verifyToken) 

export default autRote