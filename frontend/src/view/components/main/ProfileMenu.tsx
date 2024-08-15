import { AppContextIn } from '../../../interfaces/autInterface'
import { useAuth } from '../../../context/AppContext'
import profileImg from "../../../assets/profile.png"

interface Props{
    pMenu: boolean
}

function ProfileMenu({pMenu} : Props) {

  const {logout, user} = useAuth() as AppContextIn

  if(!user || Object.keys(user).length == 0){
      return(
        <div className={`profile-menu-con ${pMenu? "profile-menu-open": ""}`}>
            <div className='menu-profile-con'>
                <div className='menu-profile-img-con'>
                    <img src={profileImg} width= "300px" height= "auto" className='profile-img'/>
                </div>
                <h2>Cargando...</h2>
                <h4>Cargando...</h4>
            </div>
            <div className='line'></div>
            <button className='auth-btn'
                onClick={() => logout()}
            >
                Salir
            </button>
        </div>
      )

  }else{ 

      return (
        <div className={`profile-menu-con ${pMenu? "profile-menu-open": ""}`}>
            <div className='menu-profile-con'>
                <div className='menu-profile-img-con'>
                    <img src={profileImg} width= "300px" height= "auto" className='profile-img'/>
                </div>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className='line'></div>
            <button className='auth-btn'
                onClick={() => logout()}
            >
                Salir
            </button>
        </div>
      )
    }
}

export default ProfileMenu