import {request, Router} from "express"
import { changeProfileImgRequest, comparePasswordRequest, getUsersRequest, loginReguest, logoutRequest, profileRequest, registerRequest, updateProfileRequest, verifyToken } from "../controllers/autController"
import { requireInput, validateSchema } from "../middleware/validatorMiddleware"
import {loginSchema, registerSchema} from "../schemas/authSchema"
import { authRequired } from "../middleware/validatorToken"

const autRote = Router()

autRote.get("/users", getUsersRequest)
autRote.post("/register", requireInput, validateSchema(registerSchema), registerRequest)
autRote.post("/login", validateSchema(loginSchema), loginReguest)
autRote.post("/logout", logoutRequest) 
autRote.get("/profile", authRequired, profileRequest)
autRote.put("/updateProfile", authRequired, updateProfileRequest)
autRote.put("/changeImgProduct/:proId/:imgId", authRequired, changeProfileImgRequest)
autRote.get("/Verify", verifyToken) 
autRote.get("/conparePassword/pass", comparePasswordRequest)
autRote.put("/changeProfileImg/:proId/:imgId", authRequired, changeProfileImgRequest)

export default autRote