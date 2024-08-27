
import { StoreContextIn } from '../../../interfaces/autInterface'
import { useAbm } from '../../../context/StoreContext'
import { formatNumberWithDots } from '../../../utils/numbersUtils'

function MonthlyMembershipTable() {

  const { monthlyMemberships} = useAbm() as StoreContextIn


  return (
    <div className='statistics-table-con'>
        <table>
            <thead>
                <tr>
                    <th style={{paddingLeft:"10px"}}>Mes</th>
                    <th>Membresias</th>
                    <th>Ingresos</th>
                </tr>
            </thead>
            {
                !monthlyMemberships? (<h2>Esperando</h2>) : (
                    <tbody>
                         {
                            monthlyMemberships.map((data, id)=> (
                                <tr key={id} style={{height:"50px"}}>
                                    <td style={{paddingLeft:"10px"}}>{data.month}</td>
                                    <td>{data.memberships}</td>
                                    <td>{formatNumberWithDots(data.income )}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                )
            }
        </table>
    </div>
  )
}

export default MonthlyMembershipTable