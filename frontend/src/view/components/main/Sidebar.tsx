import React from 'react'
import "../../../css/Sidebar.css"
import { IoMdMenu } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosFitness } from "react-icons/io";
import { NavLink } from 'react-router-dom';

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
                <div className={'link-item'}>
                    <AiOutlineProduct/>
                    <h5>Productos</h5>
                </div>
              </li>
              <li>
                <div className={'link-item'}>
                    <IoIosFitness/>
                    <h5>Maquinas</h5>
                </div>
              </li>
            </ul>
    </section>
  )
}

export default Sidebar