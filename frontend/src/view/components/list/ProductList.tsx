import { useEffect, useState } from "react"
import { useAbm } from "../../../context/StoreContext"
import { Product, StoreContextIn } from "../../../interfaces/autInterface"
import ProductTargetImg from "../rowImage/ProductTargetImg"


function ProductList() {

    const {product, getProductsList, addProductSale} = useAbm() as StoreContextIn
    const [productsInStock, setProductInStock] = useState<Product[]>([])


    useEffect(() => {
        getProductsList()
    }, [])

    function showText(str: string){
        if(str.length > 16){
            let newStr = str.slice(0, 15)
            return newStr+"..."
        }
        return str
    }

    useEffect(() => {
        let newProduct = product.filter(pro => pro.stock > 0)
        setProductInStock(newProduct)
    }, [product])

    if(!productsInStock){

        return <h1>No hay productos</h1>

    }else{

        return (
            <div className="pd-list-con">
                {
                    productsInStock.map(pr => (
                        <div
                          onClick={() => addProductSale({
                            id: pr.id as number,
                            description: pr.description,
                            price_venta: pr.price_venta,
                            amount: 1,
                            subtotal: 0
                          })}
                          className="product-card-con"
                          key={pr.id}
                        >
                            <ProductTargetImg id={pr.id_image}/>
                            <p>{showText(pr.description)}</p>
                            <p>{"$ "+pr.price_venta}</p>
                        </div>
                    ))
                }
            </div>
          )
    }
    
  
}

export default ProductList