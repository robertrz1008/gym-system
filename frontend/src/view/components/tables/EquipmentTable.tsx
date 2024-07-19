import { MdDeleteOutline } from "react-icons/md";
import { StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../main/ModalDialog";
import DeleteProductMsg from "../ModalDialog/DeleteProductMsg";
import ProductImage from "../rowImage/ProductImage";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import DeleteEquipmentsMsg from "../ModalDialog/DeleteEquipmentMsg";


function ProductTable() {

    const navigate = useNavigate()

    const {equipments, getEquipmentsList, openModalDialog, setEquipmentMode, setEquipmentUpdate} = useAbm() as StoreContextIn

    useEffect(() => {
        getEquipmentsList()
    }, [])

  return (
    <div className='table-con'>
        <table>
            <thead>
                <tr>
                    <th className="td-id">#</th>
                    <th>imagen</th>
                    <th>Descripción</th>
                    <th >Observacion</th>
                    <th className="td-id">Cant</th>
                    <th className='td-icon'></th>
                </tr>
            </thead>
            {
                !equipments? (<h1>No hay cliente</h1>): (
                     <tbody>
                        {
                            equipments.map((data, id) => (
                                <tr 
                                    onClick={() => {
                                        setEquipmentUpdate(data)
                                        setEquipmentMode(true)
                                        navigate("/Equipments/form")
                                    }}
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    
                                    <ProductImage id={data.id_image as number}/>
                                    <td>{data.description}</td>
                                    <td>{data.observation}</td>
                                    <td className="td-id">{data.amount}</td>
                                    <td 
                                        onClick={(e) =>{    
                                            e.stopPropagation()
                                            console.log("eliminar")
                                        }}
                                        className='td-icon'
                                    >
                                        <div onClick={ () => openModalDialog()}> 
                                            <Tooltip title="Eliminar" placement="top-end">
                                                <MdDeleteOutline/> 
                                            </Tooltip>
                                        </div>
                                        <ModalDialog>
                                            <DeleteEquipmentsMsg id={data.id}/>
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

export default ProductTable