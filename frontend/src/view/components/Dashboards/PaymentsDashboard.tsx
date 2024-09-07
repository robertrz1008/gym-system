import { useEffect, useState } from "react"
import { useAbm } from "../../../context/StoreContext"
import { ChartItems, StoreContextIn } from "../../../interfaces/autInterface"
import BarChart from "../reusable/BarChart"
import FullLoading from "../main/FullLoading"
import MonthlyMembershipTable from "../tables/MonthlyMembershipTable"



function PaymentsDashboard() {

  const { monthlyMemberships} = useAbm() as StoreContextIn
  const [items, setItems ] = useState<ChartItems>()
  
function buildItem(){
  let la = []
  let da = []
  let col = []
  for (const i of monthlyMemberships) {
    la.push(i.month)
    da.push(i.memberships)
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
  }, [monthlyMemberships])

  return (
    <div className="dashboard-con">
      {
      !items? (<FullLoading/>) : 
        (
          <>
            <MonthlyMembershipTable/>
            <BarChart 
              title="Membresias por mes, 2024"
              items={items as ChartItems}
            />
          </>
        )
      }
    </div>
  )
}

export default PaymentsDashboard