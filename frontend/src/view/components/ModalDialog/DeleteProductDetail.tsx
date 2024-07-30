import { useAuth } from '../../../context/AppContext';
import { useAbm } from '../../../context/StoreContext'
import { AppContextIn, ProductSale, StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
    productDetail: ProductSale
}

function DeleteProductDetailMsg({productDetail}: Props) {

  const {closeModalDialog, deleteProductDetail} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Deseas quitar este producto?</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => {
            closeModalDialog()
          }}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
                deleteProductDetail(productDetail)
                showToasSuccess("Producto quitado")
          }}>  Quitar </button>
        </div>
    </div>
  )
}

export default DeleteProductDetailMsg