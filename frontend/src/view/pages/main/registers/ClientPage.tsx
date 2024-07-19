import "../../../../css/Register.css"
import {Input} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import ClientTable from "../../../components/tables/ClientTable";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import { AppContextIn, StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect } from "react";
import { useAuth } from "../../../../context/AppContext";

function ClientPage() {

  const {getClients, getClientsByFilter} = useAbm() as StoreContextIn
  const { toast } = useAuth() as AppContextIn

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
              
            <Input
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