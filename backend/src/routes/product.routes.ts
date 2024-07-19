import {request, Router} from "express"
import { authRequired } from "../middleware/validatorToken"
import { changeProductImgRequest, createProductRequest, deleteProductRequest, getProductsByFilterRequest, getProductsRequest, updateProductoRequest } from "../controllers/productController"

const autRote = Router()

autRote.get("/getProducts", authRequired, getProductsRequest)
autRote.get("/getProducts/:filter", authRequired, getProductsByFilterRequest)
autRote.post("/createProduct", authRequired, createProductRequest)
autRote.delete("/deleteProduct/:id", authRequired, deleteProductRequest)
autRote.put("/updateProduct", authRequired, updateProductoRequest)
autRote.put("/changeImgProduct/:proId/:imgId", authRequired, changeProductImgRequest)





export default autRote