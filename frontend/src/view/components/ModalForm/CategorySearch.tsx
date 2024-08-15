import { useEffect } from "react"
import { useAbm } from "../../../context/StoreContext"
import { Category, StoreContextIn } from "../../../interfaces/autInterface"
import { TextField } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";

interface Props{
  catgorySelect: (cli:Category) => void
}

function CategorySearch({catgorySelect}: Props) {

  const {categories, getCategoriesList, closeModalDialog} = useAbm() as StoreContextIn

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <div className='client-search-con'>
        <div className='pd-title-con'>
            <h3>Seleccionar Cliente</h3>
        </div>
        <TextField
                // onChange={(e) =>
                //   getCategoriesByFilter(e.target.value)
                // }
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
              !categories? (<h3>No hay categorias</h3>) : categories.map(data => (
                <div 
                  key={data.id} 
                  onClick={() =>{
                    catgorySelect(data)
                    closeModalDialog()
                  }}
                  className="pay-client-search-target">
                    <p>{data.description}</p>
                </div>
              ))
            }
        </div>
        {/* <button className="btn btn-add btn-full">Seleccionar</button> */}
    </div>
  )
}

export default CategorySearch