import { useNavigate } from "react-router-dom"
import { useAbm } from "../../../context/StoreContext"
import { StoreContextIn } from "../../../interfaces/autInterface"
import ProductDetailList from "../tables/ProductDetailList"
import { useState } from "react"

function SaleForm() {

  const { total, isBtnDisabled, createSale, totalZero} = useAbm() as StoreContextIn
  const [btnText, setBtnText] = useState<string>("Guardar")
  const navigate = useNavigate()

  async function vender(){
    setBtnText("Procesando")
    await createSale()
    setBtnText("guardar")

    navigate(`/Sale/success/${total}`)
    //se borrara el total de la venta realizada
    setTimeout(() => {
      totalZero()
    }, 500)
  }
  
  return(
      <div className="sale-form-con">
          {/* <div className='pd-title-con'>
              <h3>Detalle de productos</h3>
          </div> */}

          <ProductDetailList/>
          <div className="total-con">
            {
              !total? (<h3>{"TOTAL: 0"}</h3>) : (<h3>{"TOTAL: "+total}</h3>)
            }
          </div>
              <button 
                className={`btn btn-add btn-full ${isBtnDisabled? "btn-add-disabled" : ""}`}
                disabled={isBtnDisabled}
                onClick={() => {
                  vender()
                }}
              >
                {btnText}
              </button>
      </div>
      
  )
  
}

export default SaleForm