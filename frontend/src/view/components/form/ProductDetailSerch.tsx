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
      {/* <div className='pd-title-con'>
          <h3>Productos en Stock</h3>
      </div> */}
        <div className="sale-search-con">
            <TextField
                onChange={(e) =>
                  getProductsByFilter(e.target.value)
                }
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                  <IoIosSearch/>
                </InputAdornment>
                
                }}
                size='small'
            />
        </div>
        <ProductList />
    </div>
  )
}

export default ProductDetailSerch