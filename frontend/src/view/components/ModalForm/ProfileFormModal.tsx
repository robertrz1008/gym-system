import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material"
import "../../../css/ModalDialog.css"
import { useState } from 'react';
import { AppContextIn, User } from '../../../interfaces/autInterface';
import { useAuth } from '../../../context/AppContext';
import { updateProfileRequest } from '../../../api/autRequest';

interface Props {
    whowModal: boolean
    closemodal: () => void
    userModify: User
}

function ProfileFormModal(prop: Props) {

    const {getProfile, showToasSuccess} = useAuth() as AppContextIn

    const [name, setName] = useState(prop.userModify.name)
    const [email, setEmail] = useState(prop.userModify.email)

    async function udpateProfile() {
      const pr = {
        name: name,
        email: email
      }
      try {
        await updateProfileRequest(pr)
        getProfile()
        showToasSuccess("Perfil editado")
        prop.closemodal()
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <Modal
            open={prop.whowModal}
            onClose={prop.closemodal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className='profile-form'>
                <div className="pd-title-con" style={{ height: "50px" }}>
                    <h4 className='subtitle'>Mis datos</h4>
                </div>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    sx={{ marginTop: "20px", width: "90%" }}
                    size="small"
                    //   error={isNameEmpty}
                    //   helperText={isNameEmpty ? "El nombre es requerido" : ""}
                    id="standard-error-helper-text"
                    label="Nombre "
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                    value={name}
                    sx={{ marginTop: 2, width: "90%" }}
                    id="Telefono"
                    label="Telefono"
                    variant="outlined"
                />
                <div className="btn-con">
                  <button
                    className="btn btn-res"
                  > 
                    Cancelar
                  </button>
                  <button
                    type="submit" 
                    className="btn btn-add"
                    onClick={() => {
                      udpateProfile()
                    }}
                  > 
                    Guardar 
                  </button>
                </div>
                
            </div>
        </Modal>
    );
}

export default ProfileFormModal