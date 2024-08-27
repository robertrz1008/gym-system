import { Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createProductDetialRequest, createSaleRequest, getMonthlySalesResponse, getSalesReportRequest, updateTotalSaleRequest } from "../controllers/saleController"

const saleRoute = Router()

saleRoute.get("/getSalesReport/:date1/:date2", authRequired, getSalesReportRequest)
saleRoute.get("/getMonthlySales", authRequired, getMonthlySalesResponse)
saleRoute.post("/createSale", authRequired, createSaleRequest)
saleRoute.put("/updateTotalSale/:id", authRequired, updateTotalSaleRequest)
saleRoute.post("/createProductDetail", authRequired, createProductDetialRequest)

export default saleRoute