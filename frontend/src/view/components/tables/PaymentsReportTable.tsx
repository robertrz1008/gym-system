import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import { convertISOStringToDateString } from '../../../utils/DateUtils'

function PaymentsReportTable() {

    const {paymentsReport} = useAbm() as StoreContextIn

    function isArray(){
        if(paymentsReport.length > 0) return true
        return false
    }

  return (
    <div className='table-con'>
    <table>
        <thead>
            <tr>
                <th className="td-id">#</th>
                <th>Cliente</th>
                <th>dni</th>
                <th>Fecha de pagado</th>
                <th>Tipo de pago</th>
                <td className="td-price">Monto</td>
            </tr>
        </thead>
        {
            !isArray? (<h1>No hay cliente</h1>): (
                 <tbody>
                    {
                        paymentsReport.map((data, id) => (
                            <tr
                                key={id}>
                                <td className="td-id">{id + 1}</td>
                                <td>{!data.name? "Desconocido": data.name}</td>
                                <td>{!data.dni? "-------": data.dni}</td>
                                <td>{convertISOStringToDateString(data.pay_date)}</td>
                                <td>{data.type_payment}</td>
                                <td className="td-price">{data.total}</td>
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

export default PaymentsReportTable