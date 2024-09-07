import { useEffect, useState } from 'react'
import { ChartItems } from '../../../interfaces/autInterface'
import { convertISOStringToDateString, getDateDaysAgo } from '../../../utils/DateUtils'
import LineChart from '../reusable/LineChart'
import { getDailySalesRequest } from '../../../api/saleRequest'
import FullLoading from '../main/FullLoading'
function DailyIncomeDashboard() {

    const [items, setItems ] = useState<ChartItems>()

    interface DailySale{
        sale_date: string, 
        total_sales: number
    }

    async function getDailyIncome(){
        const days = getDateDaysAgo(7)
        const response = await getDailySalesRequest(days.fechaPasada, days.fechaHoy)
        
        const incomes: DailySale[] = response.data
        let la = []
        let data = []
        let color = []

        for (const i of incomes) {
            la.push(convertISOStringToDateString(i.sale_date))
            data.push(i.total_sales)
            color.push("red")
        }
        setItems({
            labels: la,
            data: data,
            colors: color
        })
    }

    useEffect(() => {
        getDailyIncome()
    }, [])

    if(!items){
        return (
            <div className='home-sales-con'>
                 
                <FullLoading/>
            </div>
        )
    }else{
        return (
            <div className='home-sales-con'>
                <div className="pd-title-con" >
                    <h4 className='subtitle'>Ingresos de ventas en los ultimos 7dias</h4>
                </div>
                <br />
                <LineChart
                    title='Ingresos de ventas por dia'
                    items={items}
                />
            </div>)
    }
}

export default DailyIncomeDashboard