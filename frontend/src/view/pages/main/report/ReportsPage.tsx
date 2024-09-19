import { TabView, TabPanel } from 'primereact/tabview';
import PaymentReport from '../../../components/report/PaymentReport';
import { useAbm } from '../../../../context/StoreContext';
import { StoreContextIn } from '../../../../interfaces/autInterface';
import { useEffect } from 'react';
import { thisMonth, toDay } from '../../../../utils/DateUtils';
import SalesReport from '../../../components/report/SalesReport';


function ReportsPage() {

    const {getPaymentReport, listSalesReport} = useAbm() as StoreContextIn

    useEffect(() => {
        const month = thisMonth()
        getPaymentReport(month.primerDia, month.fechaHoy)
        const day = toDay()
        listSalesReport(day.fechaA01, day.fechaActual)
    }, [])
    
    return (
    <div className='main-page'>
        <div className='title-con'> 
            <h3 className='subtitle'>Reportes</h3>
        </div>
        <div className="report-tables-con">
            <TabView > 
                <TabPanel header="Ventas">
                    <SalesReport/>
                </TabPanel>

                <TabPanel header="Pagos">
                    <PaymentReport/>    
                </TabPanel>
            </TabView>
        </div>
    </div>
)
}

export default ReportsPage