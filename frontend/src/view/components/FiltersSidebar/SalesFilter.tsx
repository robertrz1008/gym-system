import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';
import { useAuth } from '../../../context/AppContext';

interface Props{
    showSidebar: boolean
    closeSidebar: () => void
}

export default function SaleSidebar({showSidebar, closeSidebar}: Props) {

    const {listSalesReport, } = useAbm() as StoreContextIn

    const [fromDate, setFromDate] = useState<string>("")
    const [toDate, setToDate] = useState<string >("")


    function clear(){
        setFromDate("")
        setToDate("")
    }


    return (
            <Sidebar visible={showSidebar}  position='right' onHide={() => {
                closeSidebar()
                clear()
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
                <div style={{width:"280px", position:"absolute", bottom:"10px", right:"20px"}}>
                    
                    <button //aceptar
                        onClick={() => { 
                            closeSidebar()
                            listSalesReport(fromDate, toDate)
                            clear()
                        }}
                        className='btn btn-add btn-full'
                    >
                        Filtrar
                    </button>
                </div>
            </Sidebar>
    )
}