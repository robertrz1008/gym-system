import {request, Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createProductDetialRequest, createSaleRequest, getSalesRequest, updateTotalSaleRequest } from "../controllers/saleController"

const saleRoute = Router()

saleRoute.get("/getSales", authRequired, getSalesRequest)
saleRoute.post("/createSale", authRequired, createSaleRequest)
saleRoute.put("/updateTotalSale/:id", authRequired, updateTotalSaleRequest)
saleRoute.post("/createProductDetail", authRequired, createProductDetialRequest)

export default saleRoute