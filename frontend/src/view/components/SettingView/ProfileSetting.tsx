import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AppContextIn, StoreContextIn, User } from '../../../interfaces/autInterface'
import { useAuth } from '../../../context/AppContext'
import { MdOutlineModeEditOutline } from "react-icons/md";
import ProfileFormModal from '../ModalForm/ProfileFormModal';
import { openEditor } from "react-profile";
import { FaRegImage } from "react-icons/fa6";
import ProfileImage from '../rowImage/ProfileImage';
import { createImagesRequest, deleteImageRequest, getImageByIdRequest } from '../../../api/clientRequest';
import { changeProfileImgRequest } from '../../../api/autRequest';
import ModalDialog from '../main/ModalDialog';
import ChangeProfileImageMsg from '../ModalDialog/ChangeImageMsg';
import { useAbm } from '../../../context/StoreContext';
import imgDefault from "../../../assets/default.jpg"

function ProfileSetting() {

    const {user, getProfile, logout} = useAuth() as AppContextIn
    const {openModalDialog, closeModalDialog} = useAbm() as StoreContextIn

    const [showModal, setShowModal] = useState(false)
    const [userModify, setUserModify] = useState<User>()
    const [profileImage, setProfileImg] = useState<string>()
    const [file, setFile] = useState<File | null>()
    const [fileURL, setFileURL ] = useState("")

    const http = "http://localhost:3000/"+profileImage
    //la imagen que se mostrara en el perfil teniendo la imagen por defecto hasta que se carge el indicado
    const [image, setImage] = useState(http)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    

  function loadingImg(){
    if(user.image_id == null){
      setImage(imgDefault)
    }else{ 
      setImage(http)
    }
  }


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
            setFileURL("")
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
            openModalDialog()
          }
        }
    } 
    async function uploadImg(){
        if (!file){
            console.log("error al subir la imagen")
            return
          }
        const formData = new FormData()
        formData.append('image', file)

        try {
            console.log("subiendo img del perfil")
            const response: any = await createImagesRequest(formData) //el id de la imagen
            const profIdImg = user.image_id
            console.log("cambiando img anterior")
            await changeProfileImgRequest(response.data, user.id)
            
            if(profIdImg){
                await deleteImageRequest(profIdImg as number)
                console.log("deleting before image")
            }
            getProfile()
            //cargamos la imagen del perfil
            setTimeout(()=>{
                getProfileImg(user.image_id as number)
            }, 500)
            closeModalDialog()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() =>{
      loadingImg()
      getProfile()
      getProfileImg(user.image_id as number)
    },[])
    useEffect(() => {
        loadingImg()
    }, [profileImage])

    useEffect(() =>{
        if(user){
            setUserModify({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            })
            getProfileImg(user.image_id as number)
        }
      },[user])

        return (
            <div className='setting-profile-con'>
                {/* informacion del perfil */}
                <div className='setting-profile-info-con'>
                    <ProfileImage
                            fileURL={fileURL}
                            image={image}
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
                <ModalDialog>
                    <ChangeProfileImageMsg
                                uploadImg={uploadImg}
                    />
                </ModalDialog>
            </div>
    )
}

export default ProfileSetting