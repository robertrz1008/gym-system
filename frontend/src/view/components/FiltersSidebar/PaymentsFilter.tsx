import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import SelectButton from '../main/SelectButton';
import { PaymentOptions, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';

interface Props{
    showSidebar: boolean
    closeSidebar: () => void
}

export default function PaymentSidebar({showSidebar, closeSidebar}: Props) {

    const {lisPaymentReportByParams} = useAbm() as StoreContextIn

    const [orderSelected, setOrderSelected] = useState<PaymentOptions | null>()
    const [fromDate, setFromDate] = useState<string>("")
    const [toDate, setToDate] = useState<string >("")
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
    }

    function filterPayments(){
        let order;
        if(orderSelected?.value == 1){
            order = 1
        }else{
            order = 2
         }
         lisPaymentReportByParams({
            fromDate: fromDate,
            toDate: toDate,
            orderBy: orderBy as number,
            order:order
         })
        clear()
    }

    return (
            <Sidebar visible={showSidebar}  position='right' onHide={() => {
                closeSidebar()
                setOrderSelected(null)
            }}>
                <h3 style={{position: "absolute", top:"25px", zIndex:"2"}}>Parametros</h3>
                <h4 style={{marginTop:"20px"}}>Rango de fechas</h4>
                <input 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value) }
                    className="input-date" 
                    type="date"
                />
                <input 
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value) }
                    className="input-date" 
                    type="date"
                />

                <h4 style={{marginTop:"20px"}}>Ordenar por</h4>
                <select 
                    onChange={(e) => setOrderBy(parseInt(e.target.value))}
                    className="filter-selectinput"
                    onFocus={() => console.log("select")}
                >
                    <option value={0}>seleccionar</option>
                    <option value={1}>cliente</option>
                    <option value={2}>Fecha pagado</option>
                    <option value={3}>Monto</option>
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
                            filterPayments()
                        }}
                        className='btn btn-add btn-full'
                    >
                        Filtrar
                    </button>
                </div>
            </Sidebar>
    )
}