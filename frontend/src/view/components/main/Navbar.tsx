import "../../../css/NavBar.css"
import { IoMdMenu } from "react-icons/io";
import Profile from './Profile';
import { useNavigate } from "react-router-dom";

interface Props{
  openDMenu: () => void
  changePMenu: () => void
}

function Navbar({openDMenu}: Props) {

  const navigate = useNavigate()
  return (
    <>
      <nav>
        <div 
          className='menu-icon-con'
          onClick={openDMenu}>
          <IoMdMenu/>
        </div>
        
        <h1>Gimnacio</h1>
        <div onClick={(e) => {
          e.stopPropagation()
          navigate("/Settings")
        }}>
          <Profile />
        </div>
      </nav>
    </>
    
  )
}

export default Navbar