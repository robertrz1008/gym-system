import { TabView, TabPanel } from 'primereact/tabview';
import ProductTable from '../../../components/tables/ProductTable';
import ClientTable from '../../../components/tables/ClientTable';

function ReportsPage() {
    
    return (
    <div className='main-page'>
        <div className="report-tables-con">
            <TabView >
                <TabPanel header="Ventas">
                    <h1>div</h1>
                <ProductTable/>
                </TabPanel>

                <TabPanel header="Membresias">
                    <ClientTable/>    
                </TabPanel>
            </TabView>
        </div>
    </div>
)
}

export default ReportsPage