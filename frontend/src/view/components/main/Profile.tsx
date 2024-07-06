import { AppContextIn} from '../../../interfaces/autInterface'
import { useAuth } from '../../../context/AppContext'
import "../../../css/Profile.css"
import profileImg from "../../../assets/profile.png"
import { useEffect } from 'react'

function Profile() {

  const {user, getProfile} = useAuth() as AppContextIn

  useEffect(() =>{
    getProfile()
  },[])
  

  if(!user || Object.keys(user).length == 0){

      return <h3>Cargando...</h3>

  }else{

      return (
        <div className='profile-section'>
            <div className='profile-img-con'>
                    <img src={profileImg} width= "300px" height= "auto" className='profile-img'/>
            </div>
            <h3>{user? user.name : "Cargando.."}</h3>
        </div>
      )
  }
      
}

export default Profile