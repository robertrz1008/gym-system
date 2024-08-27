
import { StoreContextIn } from '../../../interfaces/autInterface'
import { useAbm } from '../../../context/StoreContext'
import { formatNumberWithDots } from '../../../utils/numbersUtils'

function MonthlySalesTable() {

  const { monthlySales} = useAbm() as StoreContextIn


  return (
    <div className='statistics-table-con'>
        <table>
            <thead>
                <tr>
                    <th style={{width: "50%", paddingLeft:"10px"}}>Mes</th>
                    <th >Ingresos en ventas</th>
                </tr>
            </thead>
            {
                !monthlySales? (<h2>Esperando</h2>) : (
                    <tbody>
                         {
                            monthlySales.map((data, id)=> (
                                <tr key={id} style={{height:"50px"}}>
                                    <td style={{width: "50%", paddingLeft:"10px"}}>{data.month}</td>
                                    <td>{formatNumberWithDots(data.income)}</td> 
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

export default MonthlySalesTable