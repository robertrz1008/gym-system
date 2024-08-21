import  'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import { useEffect } from "react";
import { convertISOStringToDateString,  } from "../../../utils/DateUtils";
import { useAbm } from "../../../context/StoreContext";
import { StoreContextIn } from "../../../interfaces/autInterface";


function MembershipTable() {

    const {members, getClientsMembership} = useAbm() as StoreContextIn

    function isArray(){
        if(members.length > 0) return true
        return false
    }

    
    function isStatus(x: string){
        if(x == "miembro") return true
    
        if(x == "caducado") return false
      }

    useEffect(() => {
        getClientsMembership()
    }, [])

  return (
    <div className='table-con'>
        <table>
            <thead>
                <tr>
                    <th className="td-id">#</th>
                    <th>Nombre y Apellido</th>
                    <th>Fecha Pagado</th>
                    <th>Fecha de Vencimeinto</th>
                    <td style={{width:"80px"}} >Estado</td>
                </tr>
            </thead>
            {
                !isArray? (<h1>No hay cliente</h1>): (
                     <tbody>
                        {
                            members.map((data, id) => (
                                <tr
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{convertISOStringToDateString(data.datePay)}</td>
                                    <td>{convertISOStringToDateString(data.dateExpired)}</td>
                                    <td style={{width:"80px"}}>
                                        <div className={`cli-status-div ${isStatus(data.status)? "member-div":"expired-div"}`}>
                                            {data.status}
                                        </div>
                                        
                                    </td>
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

export default MembershipTable