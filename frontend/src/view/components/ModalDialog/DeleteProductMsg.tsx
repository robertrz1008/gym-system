import { useAuth } from '../../../context/AppContext';
import { useAbm } from '../../../context/StoreContext'
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
  id: number | undefined
}

function DeleteProductMsg({id}: Props) {

  const {closeModalDialog, deleteProduct} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn

  async function deleteE(){
    const r = await deleteProduct(id as number)

    if(r){
      showToasSuccess("Producto eliminado")
    }
    
  }

  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Eliminar este producto?</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => closeModalDialog()}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
            deleteE()
          }}> Eliminar </button>
        </div>
    </div>
  )
}

export default DeleteProductMsg