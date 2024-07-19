import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { FiDatabase } from "react-icons/fi";
import { useAbm } from "../../../../context/StoreContext";
import { AppContextIn, Client, StoreContextIn } from "../../../../interfaces/autInterface";
import { useNavigate } from "react-router-dom";
import { createClientsRequest, updateClientsRequest } from "../../../../api/clientRequest";
import { useAuth } from "../../../../context/AppContext";

function ClientForm() {

  const navigate = useNavigate()
  const {getClients, clientModify, cliUPdateMode, isCliUpdateMode} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [cin, setCin] = useState("")
  const [isNameEmpty, setNameEmpty] = useState(false)


  useEffect(() => {
    if(isCliUpdateMode){
      console.log("md mode")
      setName(clientModify.name)
      setTel(clientModify.telephone)
      setCin(clientModify.dni)
    }
  },[clientModify])

  function clear(){
    cliUPdateMode(false)
      setName("")
      setTel("")
      setCin("")
  }

  async function createClient(client: Client){
    try {
      await createClientsRequest(client)
      getClients()
      navigate("/clients")
      showToasSuccess("Cliente creado")
      clear()
    } catch (error) {
      console.log(error)
    }
  }
  async function updateClient(client: Client){
    try {
      await updateClientsRequest(client)
      getClients()
      navigate("/clients")
      showToasSuccess("Cliente modificado")
      clear()
    } catch (error) {
      
    }
  }
  

  function validateTf(){
    if(!name){
        setNameEmpty(true)
        console.log("rechasado")
        return false
    }
    console.log("completado")
    return true
  }
  
  function handleSubmit(){

    if(!validateTf()) return

    if(!isCliUpdateMode){
        createClient({
          name: name.trim(),
          telephone: tel.trim(),
          dni: cin.trim()
        })
    }else{
        updateClient({
          id: clientModify.id,
          name: name.trim(),
          telephone: tel.trim(),
          dni: cin.trim()
        })
    }
  }


  return (
    <div 
      className="main-page"
    >
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="register-form"
        >
            <div className="title-con">
                <h3 className="subtitle">Datos del cliente</h3>
            </div>
            <div className="form-con">
                <TextField 
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  error={isNameEmpty}
                  helperText={isNameEmpty ? "El nombre es requerido" : ""}
                  id="standard-error-helper-text"
                  label="Nombre y Apellido" 
                  variant="filled" 
                />
                <TextField 
                  onChange={(e) => setTel(e.target.value)}
                  value={tel}
                  id="Telefono" 
                  label="Telefono" 
                  variant="filled" 
                />
                <TextField 
                  onChange={(e) => setCin(e.target.value)}
                  value={cin}
                  id="DNI" 
                  label="DNI" 
                  variant="filled" 
                />
            </div>
            
            <div className="btn-con">
                <button 
                  onClick={() => {
                    navigate("/clients")
                    clear()
                  }}
                  type="reset"
                  className="btn btn-res"
                > 
                  Cancelar
                </button>
                <button
                  type="submit" 
                  className="btn btn-add"
              > 
                {"Guardar "}<FiDatabase/>
              </button>
            </div>
        </form>
    </div>
  )
}

export default ClientForm