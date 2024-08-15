import { MdOutlineErrorOutline } from "react-icons/md";
import Modal from '@mui/material/Modal';

interface Props{
  id: number
  showModal: boolean
  closeModalError: () => void
}

function PaymentErrorMsg({id, showModal, closeModalError}: Props) {


    function isPaymentError(){
        if(id == 1) return "Seleciona el tipo de pago"

        return "Seleciona el cliente"
    }

  return (
    <Modal open={showModal} onClose={closeModalError} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description"
    >
        <div className='modal-dialog-con'>
             <div className='icon-alert-con'>
                 <MdOutlineErrorOutline/>
             </div>

             <h3>ojoj</h3>

             <div className='btn-con'>
               <button className='btn btn-add' onClick={() => {
                    closeModalError()
              }}> Acepart </button>
            </div>
        </div>
    </Modal>
  )
}

export default PaymentErrorMsg