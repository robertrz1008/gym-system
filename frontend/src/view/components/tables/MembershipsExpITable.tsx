
import { PaymentsReport } from '../../../interfaces/autInterface'
import { useEffect, useState } from 'react'
import { getMembershipsExpiredRequest } from '../../../api/membershipRequest'
import { convertISOStringToDateString, getDateDaysAgo } from '../../../utils/DateUtils'

function MembershipExpiTable() {

    const [members, setMembers] = useState<PaymentsReport[]>([])

    async function getMembersExpired(){
        const days = getDateDaysAgo(7)
        const res = await getMembershipsExpiredRequest(days.fechaPasada, days.fechaHoy)
        setMembers(res.data)
    }

    useEffect(() => {
        getMembersExpired()
    }, [])


  return (
    <div className='home-table-con'>
        <div className="pd-title-con" >
              <h4 className='subtitle'>Membresias caducadas en los ultimos 7dias</h4>
          </div>
        <table>
            <thead style={{backgroundColor: "rgb(231, 229, 229)"}}>
                <tr style={{borderBottom:"none", height:"50px"}}>
                    <th style={{paddingLeft:"10px"}}>Cliente</th>
                    <th>Fecha inicio</th>
                    <th>Fecha fin</th>
                </tr>
            </thead>
            {
                !members? (<h2>Esperando</h2>) : (
                    <tbody>
                         {
                            members.map((data, id)=> (
                                <tr key={id} style={{height:"50px"}}>
                                    <td style={{paddingLeft:"10px"}}>{data.name}</td>
                                    <td>{convertISOStringToDateString(data.pay_date)}</td>
                                    <td>{convertISOStringToDateString(data.expiration_date)}</td>
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

export default MembershipExpiTable