import { PaymentMembership } from "../interfaces/autInterface"
import axios from "./axios"

export const getPayOptipsRequest = () => axios.get("/getPayMembership" )
export const makePaymentMemership = (pay: PaymentMembership) => axios.post("/createPayMembership", pay) 
export const expireMembershipRequest = (id: number) => axios.put(`/expireMembership/${id}`) 

