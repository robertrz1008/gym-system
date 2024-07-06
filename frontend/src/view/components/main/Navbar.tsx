import React from 'react'
import "../../../css/NavBar.css"
import { IoMdMenu } from "react-icons/io";
import Profile from './Profile';

interface Props{
  openDMenu: () => void
  changePMenu: () => void
}

function Navbar({openDMenu, changePMenu}: Props) {
  return (
    <>
      <nav>
        <div onClick={openDMenu}>
          <IoMdMenu/>
        </div>
        
        <h1>Gimnacio</h1>
        <div onClick={() => changePMenu()}>
          <Profile />
        </div>
      </nav>
    </>
    
  )
}

export default Navbar