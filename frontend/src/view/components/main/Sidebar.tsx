import "../../../css/Sidebar.css"
import { IoMdMenu } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { TbCreditCardPay } from "react-icons/tb";
import { MdOutlinePeople } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CiAlignBottom } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

interface Props{
    ChangeLaout:() => void
    dbMinimixe: boolean
}

function Sidebar({ChangeLaout, dbMinimixe}: Props) {
  return (
    <section className='dashboard-section'>
        <div 
          className='menu-exit-con'
            onClick={(_e) => {
                ChangeLaout()
            }}
        >  
            <IoMdMenu/>
        </div>
           <div className="dashboard-list-con">
           <ul className={!dbMinimixe? 'dashborad-list': "dashborad-list-minimixe"}>
              <li>
                <NavLink 
                      to="/home"
                      className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}
                >
                    <MdOutlineHome/>
                    <h5>Inicio</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                      to="/clients"
                      className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <IoPersonOutline/>
                    <h5>Cliente</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Products"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <AiOutlineProduct/>
                    <h5>Productos</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Equipments"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <IoIosFitness/>
                    <h5>Equipos</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Sale"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <MdOutlineShoppingCart/>
                    <h5>Vender</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Pay"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <TbCreditCardPay/>
                    <h5>Realizar pago</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Memberships"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <MdOutlinePeople/>
                    <h5>Miembros</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/Reports"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <TbReportSearch/>
                    <h5>Reportes</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <CiAlignBottom/>
                    <h5>Estadistica</h5>
                </NavLink>
              </li>
              <li>
                <NavLink 
                    to="/"
                    className={({isActive}) => (isActive ? "link-item item-active" : "link-item")}>
                    <IoSettingsOutline/>
                    <h5>Estadistica</h5>
                </NavLink>
              </li>
            </ul>
           </div>
    </section>
  )
}

export default Sidebar