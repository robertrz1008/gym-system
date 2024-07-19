import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
  id: number | undefined
}

function DeleteEquipmentsMsg({id}: Props) {

    const {closeModalDialog, deleteEquipment} = useAbm() as StoreContextIn

  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Eliminar este equipo?</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => closeModalDialog()}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
            if(id){
                deleteEquipment(id)
            }
          }}> Eliminar </button>
        </div>
    </div>
  )
}

export default DeleteEquipmentsMsg