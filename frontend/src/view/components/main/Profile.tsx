import { AppContextIn} from '../../../interfaces/autInterface'
import { useAuth } from '../../../context/AppContext'
import "../../../css/Profile.css"
import { useEffect, useState } from 'react'
import imgDefault from "../../../assets/profile.png"

function Profile() {

  const {user, getProfile, profileImage, getProfileImg} = useAuth() as AppContextIn
  const http = "http://localhost:3000/"+profileImage
  const [image, setImage] = useState(http)

  function loadingImg(){
    if(user.image_id == null){
      setImage(imgDefault)
    }else{ 
      setImage(http)
    }
  }

  useEffect(() =>{
    getProfile()
  },[])
  useEffect(() => {
    if(user){
      getProfileImg(user.image_id as number)
    }
  }, [user])
  useEffect(() =>{
    loadingImg()
  },[profileImage])
  

  if(!user || Object.keys(user).length == 0){

      return <h3>Cargando...</h3>

  }else{

      return (
        <div className='profile-section' >
            <div className='profile-img-con'> 
                    <img src={!profileImage? imgDefault: image} width= "300px" height= "auto" className='profile-img'/>
            </div>
            <h3>{user? user.name : "Cargando.."}</h3>
        </div>
      )
  }
      
}

export default Profile