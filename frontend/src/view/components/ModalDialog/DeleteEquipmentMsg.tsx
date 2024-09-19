import { useAuth } from '../../../context/AppContext';
import { useAbm } from '../../../context/StoreContext'
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
  id: number | undefined
}

function DeleteEquipmentsMsg({id}: Props) {

    const {closeModalDialog, deleteEquipment} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


    async function deleteE(){
      const r = await deleteEquipment(id as number)
  
      if(r){
        showToasSuccess("Equipo eliminado")
      }
      
    }

  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Eliminar este equipo?</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => closeModalDialog()}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
            deleteE()
          }}> Eliminar </button>
        </div>
    </div>
  )
}

export default DeleteEquipmentsMsg