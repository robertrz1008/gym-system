import "../../../../css/Register.css"
import { TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import {  AppContextIn, StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import EquipmentTable from "../../../components/tables/EquipmentTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EquipmentReport from "../../../../PDF/reports/EquipmentReport";
import UploadButton from "../../../components/reusable/UploadButton";
import { Tooltip } from 'react-tooltip'
import { useAuth } from "../../../../context/AppContext";


function EquipmentPage() { 


  const { cliUPdateMode, getEquipmentsByFilter, equipments} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  const navigate = useNavigate()


  useEffect(() => {
    cliUPdateMode(false)
  }, [])


  return (
    <div className='main-page'>
        <div className="title-con">
            <h3 className="subtitle">Equipos</h3>
        </div>
        <div className='register-header'>
          <div className='tfSeach-con'>
            <TextField
                  onChange={(e) =>
                    getEquipmentsByFilter(e.target.value)
                  }
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
          </div>

          <div style={{width: "180px", display: "flex", justifyContent:"space-between"}}>
          <a className="my-export">
          <PDFDownloadLink document={<EquipmentReport equipments={equipments}/>} fileName="equipos-reporte">
              <div onClick={() => {
                setTimeout(() => {showToasSuccess("Reporte generado")}, 200);
              }}><UploadButton/></div>
          </PDFDownloadLink>
          </a>
          <Tooltip anchorSelect=".my-export" place="bottom">Exportar</Tooltip>

          <button 
              onClick={() => navigate("/Equipments/form")}
              className="btn btn-add"
          > 
             + Equipo
          </button>
          </div>
        </div>
        <EquipmentTable/>
    </div>
  )
}

export default EquipmentPage