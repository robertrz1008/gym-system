import { IoIosArrowDropleft } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosFitness } from "react-icons/io";
import { MdOutlinePeople } from "react-icons/md";


interface Props{
    closeDMenu: () => void
    dMenu: boolean
}
function SidebarMenu({closeDMenu, dMenu}: Props) {
  return (
    <div className={`dashboard-menu ${dMenu? "dashboard-menu-open" : ""}`}>
        <h3>Menu</h3>
        <div className='menu-exit-con'>
            <IoIosArrowDropleft
                        onClick={closeDMenu}/>
        </div>
        <ul className='dashborad-list'>
              <li>
                <div className={'link-item'}>
                    <MdOutlineHome/>
                    <h5>Inicio</h5>
                </div>
              </li>
              <li>
                <div className={'link-item'}>
                    <IoPersonOutline/>
                    <h5>Cliente</h5>
                </div>
              </li>
              <li>
                <div className={'link-item'}>
                    <AiOutlineProduct/>
                    <h5>Productos</h5>
                </div>
              </li>
              <li>
                <div className={ 'link-item'}>
                    <IoIosFitness/>
                    <h5>Maquinas</h5>
                </div>
              </li>
              <li>
                <div className={ 'link-item'}>
                    <MdOutlinePeople/>
                    <h5>Miembros</h5>
                </div>
              </li>
            </ul>
    </div>
  )
}

export default SidebarMenu