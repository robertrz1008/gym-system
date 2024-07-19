import React, { ChangeEvent, useRef, useState } from 'react'
import { useAuth } from '../../context/AppContext'
import { AppContextIn } from '../../interfaces/autInterface'
import { changeImagesRequest, createImagesRequest } from '../../api/clientRequest'
import "../../css/FileInput.css"
import { openEditor } from "react-profile";
import "react-profile/themes/dark.min.css";

function ImageTest(): JSX.Element {

  const {userImg, user} = useAuth() as AppContextIn
  const [fileURL, setFileURL] = useState("")
  const [file, setFile] = useState<File | null>()
  
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }


  async function selectHandle(e: ChangeEvent<HTMLInputElement>){
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile)
    console.log("imagen")
    let fileEdited;
    if(selectedFile){
      const objectURL = URL.createObjectURL(selectedFile)
      setFileURL(objectURL)
      //habrimos el editor de imagen para recortar la imagen
      fileEdited = await openEditor({ src: objectURL, square:true, maxWidth:300, maxHeight:300, modules:["crop"]} );
      // la preparamos en formato .pnj
      let fe = fileEdited.editedImage?.getDataURL()
      if(fe) {
        // la almacenos en esta variable de estado
        setFileURL(fe)
      }
      
    }
    
  }

 //subir foto
 const uploadImg = async ()  => {

  console.log("subiendo imagen")
  if (!file){
    console.log("error al subir la imagen")
    return
  }
  const formData = new FormData()
  formData.append('image', file)
  try {
    const response: any = await createImagesRequest(formData)
    const userId= { id: user.id }
    // await changeImagesRequest(response.data.id, userId)
    // if(myId != 3){
      // await deleteImageRequest(myId)
    // }
    // getProfile()
    setFileURL("")
    console.log("imagen subido")
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='fileName-body'>
    <button onClick={handleButtonClick}>Subir Imagen</button>
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: 'none' }}
      onChange={selectHandle}
    />
    <button onClick={() =>{uploadImg()}}>Guardar</button>
    <img src={fileURL} width={100} height={100} />
  </div>
  )
}

export default ImageTest