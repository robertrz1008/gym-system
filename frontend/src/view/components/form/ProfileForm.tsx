import { TextField } from "@mui/material"


function ProfileForm() {
  return (
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
        <div style={{width:"40%", color:"blue", cursor:"pointer", marginTop:"10px"}}>
            <h4>Cambiar contraseña</h4>
        </div>
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
  )
}

export default ProfileForm