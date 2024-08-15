import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosSearch } from "react-icons/io";
import ProductList from '../list/ProductList';
import { useAbm } from '../../../context/StoreContext';
import { StoreContextIn } from '../../../interfaces/autInterface';


function ProductDetailSerch() {

  const { getProductsByFilter } = useAbm() as StoreContextIn

  return (
    <div className='product-detail-con'>
        <div className="sale-search-con">
            <TextField
                onChange={(e) =>
                  getProductsByFilter(e.target.value)
                }
                id="outlined-start-adornment"
                sx={{ width: '95%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                  <IoIosSearch/>
                </InputAdornment>
                
                }}
                size='small'
            />
        </div>
        <div style={{ marginTop: "10px"}} className='title-con'>
            <h4>Productos en stock</h4>
        </div>
        <ProductList />
    </div>
  )
}

export default ProductDetailSerch