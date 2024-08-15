import { Category, Product, ProductParams } from "../interfaces/autInterface";
import axios from "./axios"
export const getCategoriesRequest = () => axios.get("/getCategories")

export const getCategoryByIdRequest = (id: number) => axios.get(`/getCategory/${id}`) 

export const createCategoriesRequest = (category: Category) => axios.post("createCategory", category)

export const getProductListedRequest = (proParams: ProductParams) => axios.post("/getProductListed", proParams)

export const getProductsRequest = () => axios.get("/getProducts")

export const getProductsByFilterRequest = (filter: string) => axios.get(`/getProducts/${filter}`)

export const createProductRequest = (pr: Product) => axios.post("/createProduct", pr)

export const deleteProductRequest = (id: number) => axios.delete(`/deleteProduct/${id}`)

export const updateProductRequest = (pr: Product) => axios.put(`/updateProduct`, pr)

export const changeProductImgRequest = (imgId: number, proId: number) => axios.put(`/changeImgProduct/${proId}/${imgId}`)

interface Stock{stock: number}
export const updateProductStockRequest = (stock: Stock, id: number) => axios.put(`/updateProduct/${id}`, stock)




