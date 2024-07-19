import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props{
    deleteImg: () => void
}

function DeleteImgMsg({deleteImg}: Props) {

    const {closeModalDialog} = useAbm() as StoreContextIn

  return (
    <div className='modal-dialog-con'>
        <div className='icon-alert-con'>
            <MdOutlineErrorOutline/>
        </div>
        <h3>Decea eliminar la imagen?</h3>
        <div className='btn-con'>
          <button className='btn btn-res' onClick={() => closeModalDialog()}> Cancelar </button>
          <button className='btn btn-add' onClick={() => {
                deleteImg()
                closeModalDialog()
          }}> Eliminar </button>
        </div>
    </div>
  )
}

export default DeleteImgMsg