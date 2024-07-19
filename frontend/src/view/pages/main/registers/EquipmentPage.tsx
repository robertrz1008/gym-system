import "../../../../css/Register.css"
import { Input} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import {  StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import EquipmentTable from "../../../components/tables/EquipmentTable";
function EquipmentPage() { 


  const { cliUPdateMode, getEquipmentsByFilter} = useAbm() as StoreContextIn


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
              
            <Input
              onChange={(e) => {
                getEquipmentsByFilter(e.target.value)
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
              onClick={() => navigate("/Equipments/form")}
              className="btn btn-add"
          > 
             + Equipo
          </button>
        </div>
        <EquipmentTable/>
    </div>
  )
}

export default EquipmentPage