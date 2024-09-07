import {Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { changeProductImgRequest, createCategoryRequest, createProductRequest, deleteProductRequest, getCategoryByIdRequest, getCategoryesRequest, getProductListedRequest, getProductsByFilterRequest, getProductsRequest, updateProductoRequest, updateProductStockRequest } from "../controllers/productController"

const autRote = Router()

autRote.get("/getCategories", authRequired, getCategoryesRequest)
autRote.get("/getCategory/:id", authRequired, getCategoryByIdRequest)
autRote.post("/getProductListed", authRequired, getProductListedRequest)
autRote.post("/createCategory", authRequired, createCategoryRequest)
autRote.get("/getProducts", authRequired, getProductsRequest)
autRote.get("/getProducts/:filter", authRequired, getProductsByFilterRequest)
autRote.post("/createProduct", authRequired, createProductRequest) 
autRote.delete("/deleteProduct/:id", authRequired, deleteProductRequest)
autRote.put("/updateProduct", authRequired, updateProductoRequest)
autRote.put("/changeImgProduct/:proId/:imgId", authRequired, changeProductImgRequest)
autRote.put("/updateProduct/:id", authRequired, updateProductStockRequest)




export default autRote
