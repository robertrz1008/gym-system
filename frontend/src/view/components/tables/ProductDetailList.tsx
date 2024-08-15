import { StoreContextIn } from "../../../interfaces/autInterface"
import { MdDeleteOutline } from "react-icons/md";
import { useAbm } from "../../../context/StoreContext";
import ModalDialog from "../main/ModalDialog";
import DeleteProductDetailMsg from "../ModalDialog/DeleteProductDetail";
import AmountTd from "../main/AmountTd";
import { formatNumberWithDots } from "../../../utils/numbersUtils";


export default function ProductDetailList() {

    const {productDetail, openModalDialog} = useAbm() as StoreContextIn

    if(productDetail.length == 0){
        return (
          <div className="sale-form-list-con list-void">
              <h2>Vacio</h2>
          </div>
        )
      }else{
    
          return (
            <div className="sale-form-list-con">
              <table className="sale-table-con">
                <thead>
                    <tr>
                      <th>Producto</th>
                      {/* <th className="td-price">Precio</th> */}
                      <th>Cantidad</th>
                      <th className="td-price">SubTotal</th>
                      <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    productDetail.map((pro) => (
                      <tr key={pro.id} className="sale-table-tr">
                        <td>{pro.description}</td>
                        <AmountTd
                            amountValue={pro.amount}
                            proId={pro.id as number}
                        />
                        <td className="td-price">{formatNumberWithDots(pro.subtotal)}</td>
                        <td className="sale-icon-con">
                          <div 
                            onClick={() => openModalDialog()}
                            className="icon-con"
                          >
                              <MdDeleteOutline/>
                          </div>
                          <ModalDialog>
                            <DeleteProductDetailMsg productDetail={pro}/>
                          </ModalDialog>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
    
      }
}
