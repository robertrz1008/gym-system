import ProductDetailSerch from "../../../components/form/ProductDetailSerch"
import SaleForm from "../../../components/form/SaleForm"
import "../../../../css/Transaction.css"

function SalePage() {


  return (
    <div className="main-page">
      <div className="title-con">
            <h3 className="subtitle">Vender</h3>
        </div>
        <div className="sale-con" style={{marginTop:"10px"}}>
            <ProductDetailSerch/>
            <SaleForm/>
        </div>
    </div>
  )
}

export default SalePage