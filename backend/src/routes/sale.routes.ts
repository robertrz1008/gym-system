import { Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createProductDetialRequest, createSaleRequest, getDailySalesRequest, getMonthlySalesRequest, getSalesReportRequest, getTodaysIncomeRequest, updateTotalSaleRequest } from "../controllers/saleController"

const saleRoute = Router()

saleRoute.get("/getSalesReport/:date1/:date2", authRequired, getSalesReportRequest)
saleRoute.get("/getDailySales/:date1/:date2", authRequired, getDailySalesRequest)
saleRoute.get("/getMonthlySales", authRequired, getMonthlySalesRequest)
saleRoute.get("/getToDaysIncome", authRequired, getTodaysIncomeRequest)
saleRoute.post("/createSale", authRequired, createSaleRequest)
saleRoute.put("/updateTotalSale/:id", authRequired, updateTotalSaleRequest)
saleRoute.post("/createProductDetail", authRequired, createProductDetialRequest)

export default saleRoute