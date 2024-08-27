import { MdDeleteOutline } from "react-icons/md";
import { StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../main/ModalDialog";
import DeleteClientMsg from "../ModalDialog/DeleteClientMsg";
import  'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function ClientTable() {

    const navigate = useNavigate()

    const {clients, setClientUpdate, cliUPdateMode, openModalDialog} = useAbm() as StoreContextIn

    function isArray(){
        if(clients.length > 0) return true
        return false
    }
  return (
    <div className='table-con'>
        <table>
            <thead className="register-thead">
                <tr>
                    <th className="td-id">#</th>
                    <th>Nombre y Apellido</th>
                    <th>telefono</th>
                    <th>DNI</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !isArray? (<h1>No hay cliente</h1>): (
                     <tbody>
                        {
                            clients.map((data, id) => (
                                <tr 
                                    onClick={() => {
                                        cliUPdateMode(true)
                                        setClientUpdate(data)
                                        navigate("/client/form")
                                    }}
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.telephone}</td>
                                    <td>{data.dni}</td>
                                    <td
                                        onClick={(e) =>{    
                                            e.stopPropagation()
                                        }}
                                        className='td-icon'
                                    >
                                        <div 
                                        className="icon-con"
                                         onClick={ () => openModalDialog()}>
                                            <a className="my-anchor-element">
                                                <MdDeleteOutline/> 
                                            </a>
                                            <Tooltip anchorSelect=".my-anchor-element" place="left-start">Eliminar</Tooltip>

                                        </div>
                                        <ModalDialog>
                                            <DeleteClientMsg id={data.id}/>
                                        </ModalDialog>
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

export default ClientTable