import { FaSearch } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { useAbm } from "../../../../context/StoreContext";
import { Client, StoreContextIn } from "../../../../interfaces/autInterface";
import ModalDialog from "../../../components/main/ModalDialog";
import ClientSearch from "../../../components/ModalForm/ClientSearch";
import { getPayOptipsRequest } from "../../../../api/membershipRequest";


function PayPage() {

  const {openModalDialog} = useAbm() as StoreContextIn


  const [clientName, setClientName] = useState<Client>();
  const [typePay, setTypePay] = useState<number>()
  const [entryDate, SetEntryDate] = useState<String>()
  const [payOptions, setPayOptions] = useState<{id: number, description: string, amount: number}[]>([])


  function clientSelect(cli: Client){
      setClientName(cli)
  }
  function agregarUnMes(fecha: Date): Date {
    // Crear una nueva fecha basada en la fecha dada
    let nuevaFecha = new Date(fecha);
    
    // Incrementar el mes
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);

    return nuevaFecha;
}

  async function getPayOptions(){
    try {
      const response = await getPayOptipsRequest()
      setPayOptions(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPayOptions()
    const d = new Date()
    console.log(agregarUnMes(d))
  }, [])

  const handleChange = (event: SelectChangeEvent) => setTypePay(parseInt(event.target.value));

  return (
    <div className="main-page">
      <div className="pay-con">
          <div className="pd-title-con">
              <h3>Realizar pago</h3>
          </div>

          <div className="pay-inputs-con">
            <h4>Cliente</h4 >
            <div className="client-input-con">
              <div className="client-field">
                {
                  !clientName? (<p>Seleccionar</p>): (<p>{clientName.name}</p>)
                }
              </div>
              <button onClick={() => openModalDialog()} className="btn btn-search"><FaSearch/></button>
            </div>
            <h4 style={{marginTop: "15px"}}>Tipo de pago</h4>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                sx={{marginTop:"5px", width:"100%"}}
                onChange={handleChange}
              >
                <MenuItem value={"0"}>
                  <em>Seleccionar</em>
                </MenuItem>
                <MenuItem value={"1"}> Mensual</MenuItem>
                <MenuItem value={"2"}>Sesion</MenuItem>
              </Select>

            <h4 style={{marginTop: "15px"}}>Fecha de pago</h4>  
            <input 
              onChange={(e) => SetEntryDate(e.target.value) }
              className="input-date" 
              type="date"
            />
          </div>

          <div className="btn-con">
              <button className="btn btn-reset">Limpiar</button>
              <button 
                  onClick={() => console.log({
                    id_client: clientName?.id,
                    type_pay: typePay,
                    date: entryDate
                  })}
                  className="btn btn-add"
              >
                Aceptar
              </button>
          </div>
          <ModalDialog>
            <ClientSearch
              clientSelect={clientSelect}/>
          </ModalDialog>
      </div>
    </div>
  )
}

export default PayPage