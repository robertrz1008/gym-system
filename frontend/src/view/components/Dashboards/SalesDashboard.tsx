import { useEffect, useState } from "react"
import { useAbm } from "../../../context/StoreContext"
import { StoreContextIn } from "../../../interfaces/autInterface"
import BarChart from "../reusable/BarChart"
import FullLoading from "../main/FullLoading"
import MonthlySalesTable from "../tables/MonthlySalesTable"

interface ChartItems{
  labels: string[],
  data: number[],
  colors: string[]
}

function SalesDashboard() {

  const { monthlySales} = useAbm() as StoreContextIn
  const [items, setItems ] = useState<ChartItems>()
  
function buildItem(){
  let la = []
  let da = []
  let col = []
  for (const i of monthlySales) {
    la.push(i.month)
    da.push(i.income)
    col.push('rgb(54, 162, 235)')
  }
  setItems({
    labels: la,
    data: da,
    colors: col
  })
}

  useEffect(() => {
    buildItem()
  }, [monthlySales])

  return (
    <div className="dashboard-con">
      {
      !items? (<FullLoading/>) : 
        (
          <>
            <MonthlySalesTable/>
            <BarChart 
              title="Ingresos de ventas, 2024"
              items={items as ChartItems}
            />
          </>
        )
      }
    </div>
  )
}

export default SalesDashboard