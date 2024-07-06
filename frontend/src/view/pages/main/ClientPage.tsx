import "../../../css/Register.css"
import { Button, Input, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";

function ClientPage() {
  return (
    <div className='main-page'>
        <h3>Clientes</h3>
        <div className='register-header'>
          <div className='tfSeach-con'>
              {/* <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    color="success" 
                    variant="outlined" 
                    size="small" 
              /> */}
              <Input
              color="success"
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
                <IoIosSearch/>
            </InputAdornment>
          }
        />
          </div>
          <Button variant="contained" size="medium" color="success">Nuevo cliente</Button>
        </div>
    </div>
  )
}

export default ClientPage