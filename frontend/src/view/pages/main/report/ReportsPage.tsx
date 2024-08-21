import { TabView, TabPanel } from 'primereact/tabview';
import ProductTable from '../../../components/tables/ProductTable';
import PaymentReport from '../../../components/report/PaymentReport';
import { useAbm } from '../../../../context/StoreContext';
import { StoreContextIn } from '../../../../interfaces/autInterface';
import { useEffect } from 'react';
import { thisMonth } from '../../../../utils/DateUtils';


function ReportsPage() {

    const {getPaymentReport} = useAbm() as StoreContextIn

    useEffect(() => {
        const month = thisMonth()
        getPaymentReport(month.primerDia, month.fechaHoy)
    }, [])
    
    return (
    <div className='main-page'>
        <div className="report-tables-con">
            <TabView >
                <TabPanel header="Ventas">
                <ProductTable/>
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