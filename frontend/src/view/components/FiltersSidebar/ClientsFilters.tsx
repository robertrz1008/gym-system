import { Sidebar } from 'primereact/sidebar';
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { useState } from 'react';
import SelectButton from '../main/SelectButton';
import { PaymentOptions, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';

interface Props{
    showSidebar: boolean
    closeSidebar: () => void
    onFilterList: () => void
}

export default function ClientSidebar({showSidebar, closeSidebar, onFilterList}: Props) {

    const {clientLisded} = useAbm() as StoreContextIn

    const [orderSelected, setOrderSelected] = useState<PaymentOptions | null>()
    const [isMemberships, setIsMemberships] = useState(false)
    const [Orders, _setOrders] = useState<PaymentOptions[]>([
        {name: "Descendente", value:1},
        {name: "Ascendente", value:2},
    ])

    const OrderSelect = (order: PaymentOptions) => setOrderSelected(order)

    function clear(){
        setOrderSelected(null),
        setIsMemberships(false)
    }

    const filterClient = () => {
        let orderBy;
        if(orderSelected?.value == 1){
            orderBy = 1
        }else{
            orderBy = 2
        }

        clientLisded({
            memberships: isMemberships,
            orderByName: orderBy
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
                    <h4>Miembros Actuales</h4> 
                    <InputSwitch checked={isMemberships} onChange={(e: InputSwitchChangeEvent) => setIsMemberships(e.value)} />
                </div>
                <h4 style={{marginTop:"20px"}}>Orden por orden y Apellido</h4>
                <SelectButton
                    items={Orders}
                    selectItem={OrderSelect}
                    itemSelected={orderSelected as PaymentOptions}
                />
                <div style={{width:"280px", position:"absolute", bottom:"10px", right:"20px"}}>
                    <button 
                        autoFocus
                        onClick={() => { 
                            closeSidebar() 
                            onFilterList()
                            filterClient()
                        }}
                        className='btn btn-add btn-full'
                    >
                        Filtrar
                    </button>
                </div>
            </Sidebar>
    )
}