import {Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { createPaymetRequest, expireMembershipRequest, getMembersExpiredRequest, getMonthlyPaymentssRequest, getPaymentsReportByParamsRequest, getPaymentsReportRequest, getPayOptipsRequest } from "../controllers/PayController"

const memberRouter = Router()


memberRouter.get("/getPayMembership", authRequired, getPayOptipsRequest)
memberRouter.get("/getMonthlyPayments", authRequired, getMonthlyPaymentssRequest)
memberRouter.get("/getMembersExpired/:date1/:date2", authRequired, getMembersExpiredRequest)
memberRouter.post("/createPayMembership", authRequired, createPaymetRequest)
memberRouter.put("/expireMembership/:id", authRequired, expireMembershipRequest)
memberRouter.get("/getPaymentsReport/:m1/:m2", authRequired, getPaymentsReportRequest)
memberRouter.post("/getPaymentsReportByParams", authRequired, getPaymentsReportByParamsRequest)



export default memberRouter