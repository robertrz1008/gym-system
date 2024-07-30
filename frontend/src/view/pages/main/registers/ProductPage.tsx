import "../../../../css/Register.css"
import {Input, TextField} from '@mui/material'
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
          <TextField
              onChange={(e) =>
                getProductsByFilter(e.target.value)
              }
              id="outlined-start-adornment"
              sx={{  width: '250px' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"> <IoIosSearch/> </InputAdornment>
              }}
              size='small'
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