import { useAuth } from '../../../context/AppContext';
import { useAbm } from '../../../context/StoreContext'
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
  uploadImg: () => void
}

function ChangeProfileImageMsg(props: Props) {

  const {closeModalDialog} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>¿Desea cambiar la imagen?</h3>
        <div className='btn-con'>
            <button 
              className='btn btn-res' 
              onClick={() => {
                closeModalDialog()
                showToasSuccess("Cliente eliminado")
            }}
            > 
                Cancelar 
            </button>
            
            <button 
              className='btn btn-add' 
              onClick={() => {
              props.uploadImg()
            }}>
              cambiar 
            </button>

        </div>
    </div>
  )
}

export default ChangeProfileImageMsg