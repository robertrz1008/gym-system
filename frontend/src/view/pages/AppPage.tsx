import Navbar from "../components/main/Navbar"
import "../../css/AppPage.css"
import { useEffect, useState } from "react"
import ProfileMenu from "../components/main/ProfileMenu"
import SmashSreen from "../components/main/SmashSreen"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import SidebarMenu from "../components/main/SidebardMenu"
import Sidebar from "../components/main/Sidebar"
import { Toast} from 'primereact/toast';
import { AppContextIn } from "../../interfaces/autInterface"
import { useAuth } from "../../context/AppContext"

function AppPage() {

  const navigate = useNavigate()
  const [dbMinimixe, setDbMinimixe] = useState(false)
  const [dMenu, setDMenu] = useState(false)
  const [pMenu, ssetPMenut] = useState(false)
  const [smashSreen, setSmashSren] = useState(true);

  const { toast } = useAuth() as AppContextIn

  function ChangeLaout(){
    setDbMinimixe(!dbMinimixe)
  }
  function openDMenu(){
      setDMenu(true)
  }
  function closeDMenu(){
    setDMenu(false)
  }
  function changePMenu(){
    ssetPMenut(!pMenu)
  }

  useEffect(() => {
      setTimeout(() => {
        setSmashSren(false);
      }, 2000); 
    navigate("/home")
  }, []);

  return (
    <div className="app-con">
      <Toast ref={toast} position="bottom-right"/>
      {smashSreen && (<SmashSreen/>)}
        <Navbar 
              openDMenu={openDMenu}
              changePMenu={changePMenu}
        />
        <ProfileMenu 
              pMenu={pMenu}
        />
        <div className={!dbMinimixe? "app-layout": "app-db-minimixe"}>
            <Sidebar 
                  ChangeLaout={ChangeLaout}
                  dbMinimixe={dbMinimixe}
            />
            <SidebarMenu 
                  dMenu={dMenu}
                  closeDMenu={closeDMenu}
            />
                <Outlet/> 
        </div>
    </div>
  )
}

export default AppPage