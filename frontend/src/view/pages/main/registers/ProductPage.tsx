import "../../../../css/Register.css"
import {TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAbm } from "../../../../context/StoreContext";
import { FiFilter } from "react-icons/fi";
import { Category, StoreContextIn } from "../../../../interfaces/autInterface";
import { useEffect, useState } from "react";
import ProductTable from "../../../components/tables/ProductTable";
import ProductSidebar from "../../../components/FiltersSidebar/ProductFilter";
import { getCategoriesRequest } from "../../../../api/productRequest";

function ProductPage() {

  const { cliUPdateMode, getProductsByFilter, getProductsList} = useAbm() as StoreContextIn

  const [showSidebar, setSidebar] = useState<boolean>(false);
  const [categoriesParam, setCategorieParam] = useState<Category[]>([])
  const [isFilterList, setFilterList] = useState(false)


  const closeSidebar = () => setSidebar(false)

  const navigate = useNavigate()

  const onFilterList= () => setFilterList(true)

  function clientForm(){
    navigate("/Products/form")
  }

  //obtenemos todas las categorias creadas para usar como parametro de filtro
  async function getCategories(){
    try {
      const response= await getCategoriesRequest();
      // let paramC;
      // const a: Category[] = response.data

      // paramC = a.map((da) => {
      //   return { name: da.description, value: da.id}
      // })
      // setCategorieParam(paramC)
      setCategorieParam(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cliUPdateMode(false)
    getCategories()
  }, [])


  return (
    <div className='main-page'>
        <div className="title-con">
            <h3 className="subtitle">Productos</h3>
        </div>
        <div className='register-header'>
          <div className='tfSeach-con'>
          <TextField
              onChange={(e) =>{
                setFilterList(false)
                getProductsByFilter(e.target.value)
              }}
              id="outlined-start-adornment"
              sx={{  width: '250px' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"> <IoIosSearch/> </InputAdornment>
              }}
              size='small'
            />
            <div 
              style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}
              className={`filter-con ${isFilterList? "filter-active": ""}`}
              onClick={() =>{
                if(isFilterList){ //si el listado por filtro esta activo
                  setFilterList(false)
                  getProductsList()
                  return 
                }
                setSidebar(true)
            }}>
              <FiFilter/>
              <p>Filtro</p>
            </div>
        </div>
        
          <button 
              onClick={() => clientForm()}
              className="btn btn-add"
          > 
            Nuevo Producto
          </button>
        </div>
        <ProductTable/>
        <ProductSidebar
          showSidebar={showSidebar}
          closeSidebar={closeSidebar}
          categoriesParam={categoriesParam}
          onFilterList={onFilterList}
        />
    </div>
  )
}

export default ProductPage