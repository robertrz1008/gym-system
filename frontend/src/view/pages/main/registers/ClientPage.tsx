import "../../../../css/Register.css"
import { TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import ClientTable from "../../../components/tables/ClientTable";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import { StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect } from "react";

function ClientPage() {

  const {getClients, getClientsByFilter} = useAbm() as StoreContextIn

  const navigate = useNavigate()

  function clientForm(){
    navigate("/client/form")
  }

  useEffect(() => {
    getClients()
  }, [])


  return (
    <div className='main-page'>
        <div className="title-con">
            <h3 className="subtitle">Clientes</h3>
        </div>
        <div className='register-header'>
          <div className='tfSeach-con'>
              
            {/* <Input
              onChange={(e) => {
                getClientsByFilter(e.target.value)
              }}
              color="success"
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                    <IoIosSearch/>
                  </InputAdornment>
                }
            /> */}
            <TextField
                onChange={(e) =>
                  getClientsByFilter(e.target.value)
                }
                id="outlined-start-adornment"
                sx={{  width: '250px' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                  <IoIosSearch/>
                </InputAdornment>
                
                }}
                size='small'
            />
        </div> 
          <button 
              onClick={() => clientForm()}
              className="btn btn-add"
          > 
            Nuevo cliente
          </button>
        </div>
        <ClientTable/>
    </div>
  )
}

export default ClientPage