import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import DateHourRow from '../rowImage/DateHourRow'

function SalesReportTable() {

    const {salesReport} = useAbm() as StoreContextIn

    function isArray(){
        if(salesReport.length > 0) return true
        return false
    }

  return (
    <div className='table-con' style={{width: "97%"}}>
    <table>
        <thead>
            <tr >
                <th className="td-id">#</th>
                <th>Producto</th>
                <th>Fecha y hora</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th style={{width: "80px"}}>Subtotal</th>
            </tr>
        </thead>
        {
            !isArray? (<h1>No hay cliente</h1>): (
                 <tbody>
                    {
                        salesReport.map((data, id) => (
                            <tr 
                                style={{height: "50px"}}
                                key={id}
                            >
                                <td className="td-id">{id + 1}</td>
                                <td>{data.product}</td>
                                <DateHourRow date={data.date}/>
                                <td>{data.price_venta}</td>
                                <td>{data.amount}</td>
                                <td style={{width: "80px"}}>{data.subtotal}</td>
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

export default SalesReportTable