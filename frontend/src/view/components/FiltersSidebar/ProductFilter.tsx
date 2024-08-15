import { Sidebar } from 'primereact/sidebar';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { useState } from 'react';
import SelectButton from '../main/SelectButton';
import { Category, PaymentOptions, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';
import { TextField } from '@mui/material';

interface Props{
    showSidebar: boolean
    closeSidebar: () => void
    categoriesParam: Category[]
    onFilterList: () => void
}

export default function ProductSidebar({showSidebar, closeSidebar, categoriesParam, onFilterList}: Props) {

    const {productListed} = useAbm() as StoreContextIn

    const [orderSelected, setOrderSelected] = useState<PaymentOptions | null>()
    const [isStock, setStock] = useState(false)
    //price
    const [fromPrice, setFromPrice] = useState<number | null>()
    const [toPrice, setToPrice] = useState<number | null>()
    const [categoryIdSelected, setCategoriIdSelected] = useState<number | null>()
    const [orderBy, setOrderBy] = useState<number | null>(0)
    const [Orders, _setOrders] = useState<PaymentOptions[]>([
        {name: "Descendente", value:1},
        {name: "Ascendente", value:2},
    ])

    // const categorySelect = (order: PaymentOptions) => setCategorieSelected(order)
    const OrderSelect = (order: PaymentOptions) => setOrderSelected(order)

    function clear(){
        setOrderSelected(null)
        setOrderBy(null)
        setStock(false)
        setCategoriIdSelected(null)
        setFromPrice(null)
        setToPrice(null)
    }

    function filterProducts(){
        let order;
        if(orderSelected?.value == 1){
            order = 1
        }else{
            order = 2
         }
        productListed({
            isStock: isStock,
            categoryId: categoryIdSelected as number,
            fromPrice: fromPrice as number,
            toPrice: toPrice as number,
            orderBy: orderBy,
            order: order
        })
        clear()
    }

    return (
            <Sidebar visible={showSidebar}  position='right' onHide={() => {
                closeSidebar()
                setOrderSelected(null)
            }}>
                <h3 style={{position: "absolute", top:"25px", zIndex:"2"}}>Parametros</h3>
                <div style={{display:"flex", widows:"100%", justifyContent:"space-between", marginTop:"10px", alignContent:"center"}}>
                    <h4>En stock</h4> 
                    <InputSwitch checked={isStock} onChange={(e: InputSwitchChangeEvent) => setStock(e.value)} />
                </div>

                <h4 style={{marginTop:"20px"}}>Categoria</h4>
                {/* <SelectButton
                    items={categoriesParam}
                    selectItem={categorySelect}
                    itemSelected={categoySelected as PaymentOptions}
                />  */}
                <select 
                    onChange={(e) => setCategoriIdSelected(parseInt(e.target.value))}
                    className="filter-selectinput"
                    onFocus={() => console.log("select")}
                >   
                    <option value={0}>Seleccionar</option>
                    {
                        categoriesParam.map(data => (
                            <option key={data.id} value={data.id}>{data.description}</option>
                        ))
                    }
                </select>

                <h4 style={{marginTop:"20px"}}>Rango de monto de venta</h4>
                <TextField 
                    onChange={(e) => setFromPrice(parseInt(e.target.value))}
                    sx={{paddingTop:"10px", width:"100%"}}
                    value={fromPrice}
                    type='number'
                    id="standard-error-helper-text"
                    label="Desde" 
                    size='small'
                    variant="outlined" 
                />
                <TextField 
                    onChange={(e) => setToPrice(parseInt(e.target.value))}
                    sx={{paddingTop:"12px", width:"100%"}}
                    type='number'
                    value={toPrice}
                    id="standard-error-helper-text"
                    size='small'
                    label="Hasta" 
                    variant="outlined" 
                />

                <h4 style={{marginTop:"20px"}}>Ordenar por</h4>
                <select 
                    onChange={(e) => setOrderBy(parseInt(e.target.value))}
                    className="filter-selectinput"
                    onFocus={() => console.log("select")}
                >
                    <option value={0}>Seleccionar</option>
                    <option value={1}>Descripcion</option>
                    <option value={2}>Precio</option>
                </select>

                <SelectButton
                    items={Orders}
                    selectItem={OrderSelect}
                    itemSelected={orderSelected as PaymentOptions}
                /> 

                <div style={{width:"280px", position:"absolute", bottom:"10px", right:"20px"}}>
                    
                    <button //aceptar
                        
                        onClick={() => { 
                            closeSidebar() 
                            onFilterList()
                            filterProducts()
                        }}
                        className='btn btn-add btn-full'
                    >
                        Filtrar
                    </button>
                </div>
            </Sidebar>
    )
}