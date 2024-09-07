import axios from "./axios"

interface ProDetail{
    proId: number,
    idSale: number
    amount: number,
    subTotal: number
}
interface totalSale{
    total: number
}

export const getSalesReportRequest  = (date1: string, date2: string) => axios.get(`/getSalesReport/${date1}/${date2}`)

export const getMonthlySalesRequest = () => axios.get("/getMonthlySales")

export const getDailySalesRequest  = (date1: string, date2: string) => axios.get(`/getDailySales/${date1}/${date2}`)

export const getToDayIncomeRequest = () => axios.get("/getToDaysIncome")

export const createSaleRequest = () => axios.post("/createSale")

export const createProductDetailRequest = (proD: ProDetail) => axios.post(`/createProductDetail`, proD)

export const udpateSaleTotalRequest = (t: totalSale, id: number) => axios.put(`/updateTotalSale/${id}`, t)