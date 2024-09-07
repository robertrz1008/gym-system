import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AppContextIn, User } from '../../../interfaces/autInterface'
import { useAuth } from '../../../context/AppContext'
import { MdOutlineModeEditOutline } from "react-icons/md";
import ProfileFormModal from '../ModalForm/ProfileFormModal';
import { openEditor } from "react-profile";
import { FaRegImage } from "react-icons/fa6";
import ProfileImage from '../rowImage/ProfileImage';
import { createImagesRequest, deleteImageRequest, getImageByIdRequest } from '../../../api/clientRequest';
import { changeProfileImgRequest } from '../../../api/autRequest';

function ProfileSetting() {

    const {user, getProfile, logout} = useAuth() as AppContextIn

    const [showModal, setShowModal] = useState(false)
    const [userModify, setUserModify] = useState<User>()
    const [profileImgId, setProfileImgId] = useState<number | null>(null)
    const [profileImage, setProfileImg] = useState<string>()
    const [file, setFile] = useState<File | null>()
    const [fileURL, setFileURL ] = useState("")
    
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    let http = "http://localhost:3000/"+profileImage

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
    }

    async function getProfileImg(id: number){
        try {
            const response = await getImageByIdRequest(id)
            setProfileImg(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function selectHandle(e: ChangeEvent<HTMLInputElement>){
        const selectedFile = e.target.files?.[0]
        
        setFile(selectedFile)
        let fileEdited;
        if(selectedFile){
          const objectURL = URL.createObjectURL(selectedFile)
          setFileURL(objectURL)
          //habrimos el editor de imagen para recortar la imagen
          fileEdited = await openEditor({ src: objectURL, square:true, maxWidth:300, maxHeight:300, modules:["crop"]} );
          // la preparamos en formato .pnj
          let fe = fileEdited.editedImage?.getDataURL()
          if(fe) {
            setFileURL(fe)
            //obtenemos el objeto del archivo editado
            const response = await fetch(fe)
            const blob = await response.blob();
            const editedFile = new File([blob], selectedFile.name, { type: blob.type });
            setFile(editedFile);
          }
        }
    } 
    async function uploadImg(profileId: number){
        if (!file){
            console.log("error al subir la imagen")
            return
          }
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response: any = await createImagesRequest(formData) //el id de la imagen
            const profIdImg = user.image_id
            await changeProfileImgRequest(response.data, user.id)
            
            if(profIdImg){
                await deleteImageRequest(profIdImg as number)
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() =>{
      getProfile()
    },[])

    useEffect(() =>{
        if(user){
            setUserModify({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            })
            setProfileImgId(user.image_id as number | null)
        }
        console.log(user)
      },[user])

        return (
            <div className='setting-profile-con'>
                {/* informacion del perfil */}
                <div className='setting-profile-info-con'>
                    <ProfileImage
                            fileURL={fileURL}
                            http={http}
                            profileImgId={profileImgId }
                    />
                    <div className='profile-texts-con'>
                        <p >{!user? "" : user.email}</p>
                        <h3 className='subtitle'>{!user? "" : user.name}</h3>
                    </div>
                    
                </div>
                {/* opciones */}
                <div className='setting-profile-btn-con' style={{width:"54%"}}>
                    {/* cambiar imagen */}
                    <button 
                        className='btn btn-add'
                        onClick={() => handleButtonClick()}
                    >
                        <FaRegImage/>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={selectHandle}
                      />
                    {/* editar perfil */}
                    <button 
                        className='btn btn-add'
                        style={{marginLeft:"5px"}}
                        onClick={() => openModal()}
                    >
                        <MdOutlineModeEditOutline/>
                    </button>
                    {/* serrar sesion */}
                    <button 
                        className='btn btn-res' 
                        onClick={() => logout()}
                        style={{marginLeft:"10px"}}
                    >
                        <h4>Serrar Sesion</h4>
                    </button>
                </div>
                <div>

                </div>
                {userModify && (<ProfileFormModal
                        userModify={userModify as User}
                        whowModal={showModal}
                        closemodal={closeModal}
                />)}
            </div>
    )
}

export default ProfileSetting