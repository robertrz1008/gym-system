import "../../../../css/Register.css"
import { TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom";
import MembershipTable from "../../../components/tables/MembershipTable";
import { useEffect } from "react";
import { useAbm } from "../../../../context/StoreContext";
import { StoreContextIn } from "../../../../interfaces/autInterface";

function isMAy(a: Date, b:Date){
  if(a > b){
    return "Es mayor"
  }else{
    return "es menor"
  }
}


function MembershipList() {

  const navigate = useNavigate()
  const {getClientMembershipByFIlter} = useAbm() as StoreContextIn

  useEffect(() => {
  const a = new Date(2024, 10, 13)
  const b = new Date()
  console.log(isMAy(a, b))
}, [])

  return (
    <div  className="main-page">
        <div className="title-con">
            <h3 className="subtitle">Membresias</h3>
        </div>
        <div className='register-header'>
          <div className='tfSeach-con'>
            <TextField
                  onChange={(e) => {
                    getClientMembershipByFIlter(e.target.value)
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
          </div>

          <div style={{width: "180px", display: "flex", justifyContent:"space-between"}}>
          <a className="my-export">
          {/* <PDFDownloadLink document={<EquipmentReport equipments={equipments}/>} fileName="equipos-reporte">
              <div onClick={() => {
                setTimeout(() => {showToasSuccess("Reporte generado")}, 200);
              }}><UploadButton/></div>
          </PDFDownloadLink> */}
          </a>
          <Tooltip anchorSelect=".my-export" place="bottom">Exportar</Tooltip>

          <button 
              onClick={() => navigate("/Pay")}
              className="btn btn-add"
          > 
             Registrar
          </button>
          </div>
        </div>

        <MembershipTable/>
    </div>
  )
}

export default MembershipList