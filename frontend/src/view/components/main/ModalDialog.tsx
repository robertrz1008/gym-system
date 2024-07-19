import Modal from '@mui/material/Modal';
import "../../../css/ModalDialog.css"
import { contexArg, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';

function ModalDialog({children}: contexArg){
  
  const {showModalD, closeModalDialog} = useAbm() as StoreContextIn

  return (
    <Modal
      open={showModalD}
      onClose={closeModalDialog}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className='modal-dlg'
>
          {children}
      </div>
    </Modal>
  );
}

export default ModalDialog