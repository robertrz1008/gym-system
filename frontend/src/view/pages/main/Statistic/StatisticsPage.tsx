import { TabView, TabPanel } from 'primereact/tabview';
import { useAbm } from '../../../../context/StoreContext';
import { StoreContextIn } from '../../../../interfaces/autInterface';
import { useEffect } from 'react';
import PaymentsDashboard from '../../../components/Dashboards/PaymentsDashboard';
import "../../../../css/DashBoard.css"
import SalesDashboard from '../../../components/Dashboards/SalesDashboard';

function StatisticsPage() {
    const {getMonthMemberships, getMonthlySales} = useAbm() as StoreContextIn

    useEffect(() => {
        getMonthMemberships()
        getMonthlySales()
    }, [])

    return (
        <div className='main-page'>
            <div className='title-con'>
                <h3 className='subtitle'>Reportes</h3>
            </div>
            <div className="report-tables-con" style={{widows:"70%"}}>
                <TabView >
                    <TabPanel header="Ventas">
                        <SalesDashboard/>
                    </TabPanel>
    
                    <TabPanel header="Membresias por Mes">
                        <PaymentsDashboard/>
                    </TabPanel>
                </TabView>
            </div>
            <br />
        </div>
    )
}

export default StatisticsPage