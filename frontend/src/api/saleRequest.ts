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

export const getProductDetialRequest = () => axios.get("/getSales")

export const createSaleRequest = () => axios.post("/createSale")

export const createProductDetailRequest = (proD: ProDetail) => axios.post(`/createProductDetail`, proD)

export const udpateSaleTotalRequest = (t: totalSale, id: number) => axios.put(`/updateTotalSale/${id}`, t)