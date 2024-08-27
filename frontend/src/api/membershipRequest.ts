import { PaymentMembership, PymentReportParam } from "../interfaces/autInterface"
import axios from "./axios"

export const getPayOptipsRequest = () => axios.get("/getPayMembership" )

export const getMonthlyMembershipRequest = () => axios.get("/getMonthlyPayments")

export const makePaymentMemership = (pay: PaymentMembership) => axios.post("/createPayMembership", pay) 

export const expireMembershipRequest = (id: number) => axios.put(`/expireMembership/${id}`) 

export const getPaymentsReportRequest = (m1: string, m2:string) => axios.get(`/getPaymentsReport/${m1}/${m2}`)

export const getPaymentsReportByParamsRequest = (params: PymentReportParam) => axios.post("/getPaymentsReportByParams", params) 
