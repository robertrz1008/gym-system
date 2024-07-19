import { useAuth } from '../../../context/AppContext';
import { useAbm } from '../../../context/StoreContext'
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
  id: number | undefined
}

function DeleteClientMsg({id}: Props) {

  const {closeModalDialog, deleteClient} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Eliminar este cliente</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => {
            closeModalDialog()
            showToasSuccess("Cliente eliminado")
          }}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
            if(id){
              deleteClient(id)
            }
          }}> Eliminar </button>
        </div>
    </div>
  )
}

export default DeleteClientMsg