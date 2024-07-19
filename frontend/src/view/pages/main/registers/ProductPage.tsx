import "../../../../css/Register.css"
import {Input} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import { StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect } from "react";
import ProductTable from "../../../components/tables/ProductTable";

function ProductPage() {

  const { cliUPdateMode, getProductsByFilter} = useAbm() as StoreContextIn

  const navigate = useNavigate()

  function clientForm(){
    navigate("/Products/form")
  }

  useEffect(() => {
    cliUPdateMode(false)
  }, [])


  return (
    <div className='main-page'>
        <div className="title-con">
            <h3 className="subtitle">Productos</h3>
        </div>
        <div className='register-header'>
          <div className='tfSeach-con'>
              
            <Input
              onChange={(e) => {
                  getProductsByFilter(e.target.value)
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
            Nuevo Producto
          </button>
        </div>
        <ProductTable/>
    </div>
  )
}

export default ProductPage