import { useEffect } from "react"
import { useAbm } from "../../../context/StoreContext"
import { Client, StoreContextIn } from "../../../interfaces/autInterface"
import { TextField } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";

interface Props{
  clientSelect: (cli:Client) => void
}

function ClientSearch({clientSelect}: Props) {

  const {getClients, getClientsByFilter, clients, closeModalDialog} = useAbm() as StoreContextIn

  useEffect(() => {
    getClients()
  }, [])

  return (
    <div className='client-search-con'>
        <div className='pd-title-con'>
            <h3>Seleccionar Cliente</h3>
        </div>
        <TextField
                onChange={(e) =>
                  getClientsByFilter(e.target.value)
                }
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                  <IoIosSearch/>
                </InputAdornment>
                
                }}
                size='small'
            />

        <div className="pay-client-search-list-con">
            {
              !clients? (<h3>No hay clientes</h3>) : clients.map(data => (
                <div 
                  key={data.id} 
                  onClick={() =>{
                    clientSelect(data)
                    closeModalDialog()
                  }}
                  className="pay-client-search-target">
                    <p>{data.name}</p>
                </div>
              ))
            }
        </div>
        {/* <button className="btn btn-add btn-full">Seleccionar</button> */}
    </div>
  )
}

export default ClientSearch