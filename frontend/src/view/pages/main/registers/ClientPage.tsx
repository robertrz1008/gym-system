import "../../../../css/Register.css"
import { TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import ClientTable from "../../../components/tables/ClientTable";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import { AppContextIn, StoreContextIn } from "../../../../interfaces/autInterface";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import ClientSidebar from "../../../components/FiltersSidebar/ClientsFilters";
import {PDFDownloadLink} from "@react-pdf/renderer"
import ClientReport from "../../../../PDF/reports/ClientReport";
import UploadButton from "../../../components/reusable/UploadButton";
import { useAuth } from "../../../../context/AppContext";
import { Tooltip } from 'react-tooltip'



function ClientPage() {

  const {getClients, getClientsByFilter, clients} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn

  const [showSidebar, setSidebar] = useState<boolean>(false);
  const [isFilterList, setFilterList] = useState(false)

  const closeSidebar = () => setSidebar(false)

  const navigate = useNavigate()

  const onFilterList= () => setFilterList(true)

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
           
            <TextField
                onChange={(e) => {
                  setFilterList(false)
                  getClientsByFilter(e.target.value)
                }}
                autoFocus
                id="outlined-start-adornment"
                sx={{  width: '250px' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                  <IoIosSearch/>
                </InputAdornment>
                
                }}
                size='small'
            />
            <div 
              style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}
              className={`filter-con ${isFilterList? "filter-active": ""}`}
              onClick={() => {
                if(isFilterList){ //si el listado por filtro esta activo 
                  setFilterList(false)
                  getClients()
                  return 
                }
                setSidebar(true)
              }}>
              <FiFilter/>
              <p>Filtro</p>
            </div>
        </div> 

        <div style={{width: "180px", display: "flex", justifyContent:"space-between"}}>
          {/* boton para generar reporte */}
          <a className="my-export">
          <PDFDownloadLink document={<ClientReport clients={clients}/>} fileName="clientes-reporte">
              <div onClick={() => {
                setTimeout(() => {showToasSuccess("Reporte generado")}, 200);
              }}>
                <UploadButton/>
              </div>
          </PDFDownloadLink>
          </a>
          <Tooltip anchorSelect=".my-export" place="bottom">Exportar</Tooltip>

          <button 
              onClick={() => clientForm()}
              className="btn btn-add"
          > 
            + cliente
          </button>
        </div>
        
          
        </div>
        <ClientTable/>
        <ClientSidebar
                showSidebar={showSidebar}
                closeSidebar={closeSidebar}
                onFilterList={onFilterList}
        />
    </div>
  )
}

export default ClientPage