import { TextField } from "@mui/material"

function ComparePass() {
  return (
    <div className="profile-form">
        <div className="pd-title-con" style={{ height: "50px" }}>
            <h4 className='subtitle'>Ingresa la contraseña</h4>
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
    </div>
  )
}

export default ComparePass