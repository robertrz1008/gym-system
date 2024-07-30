import ProductDetailSerch from "../../../components/form/ProductDetailSerch"
import SaleForm from "../../../components/form/SaleForm"
import "../../../../css/Transaction.css"

function SalePage() {


  return (
    <div className="main-page">
      <h4>Vender</h4>
        <div className="sale-con">
            <ProductDetailSerch/>
            <SaleForm/>
        </div>
    </div>
  )
}

export default SalePage