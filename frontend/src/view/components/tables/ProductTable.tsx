import { MdDeleteOutline } from "react-icons/md";
import { StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../main/ModalDialog";
import DeleteProductMsg from "../ModalDialog/DeleteProductMsg";
import ProductImage from "../rowImage/ProductImage";
import { useEffect } from "react";
import { Tooltip } from 'react-tooltip'


function ProductTable() {

    const navigate = useNavigate()

    const {product, openModalDialog, setProductUpdate, setProductMode, getProductsList,} = useAbm() as StoreContextIn

    useEffect(() => {
        getProductsList()
    }, [])

  return (
    <div className='table-con'>
        <table>
            <thead>
                <tr>
                    <th className="td-id">#</th>
                    <th>imagen</th>
                    <th>Descripción</th>
                    <th className="td-price">Categoría</th>
                    <th className="td-price">precioVenta</th>
                    
                    <th className='td-icon'>Stock</th>
                </tr>
            </thead>
            {
                !product? (<h1>No hay cliente</h1>): (
                     <tbody>
                        {
                            product.map((data, id) => (
                                <tr 
                                    onClick={() => {
                                        setProductMode(true)
                                        setProductUpdate(data)
                                        navigate("/Products/form")
                                    }}
                                    key={id}>
                                    <td className="td-id">{id + 1}</td>
                                    
                                    <ProductImage id={data.id_image}/>
                                    <td>{data.description}</td>
                                    <td className="td-price">{data.category_name}</td>
                                    <td className="td-price">{data.price_venta}</td>
                                    <td className="td-id">{data.stock}</td>
                                    <td 
                                        onClick={(e) =>{    
                                            e.stopPropagation()
                                            console.log("eliminar")
                                        }}
                                        className='td-icon'
                                    >
                                        <div onClick={ () => openModalDialog()}> 
                                        <a className="my-anchor-element">
                                                <MdDeleteOutline/> 
                                            </a>
                                            <Tooltip anchorSelect=".my-anchor-element" place="bottom">Eliminar</Tooltip>
                                        </div>
                                        <ModalDialog>
                                            <DeleteProductMsg id={data.id}/>
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