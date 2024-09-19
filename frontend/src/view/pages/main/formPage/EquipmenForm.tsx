import { TextField } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { FiDatabase } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useAbm } from "../../../../context/StoreContext";
import {  AppContextIn, Equipment, StoreContextIn } from "../../../../interfaces/autInterface";
import { useNavigate } from "react-router-dom";
import { createImagesRequest, deleteImageRequest, getImageByIdRequest } from "../../../../api/clientRequest";
import { openEditor } from "react-profile";
import "react-profile/themes/dark.min.css";
import { FaRegImage } from "react-icons/fa";
import ImageForm from "../../../components/rowImage/ImageForm";
import { changeEquipamentImgRequest, createEquipamentRequest, updateEquipamentRequest } from "../../../../api/equipamentsReq";
import ModalDialog from "../../../components/main/ModalDialog";
import DeleteImgMsg from "../../../components/ModalDialog/DeleteImageMsg";
import { useAuth } from "../../../../context/AppContext";

function EquipmentForm() {

  const navigate = useNavigate()
  const { isEquiUpdateMode, setEquipmentMode, equiModify, openModalDialog } = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn

  const [isBntDisabled, setBtnDisabled] = useState(false)
  const [description, setDescription] = useState("")
  const [observation, setObservation] = useState("")
  const [amount, setAmount] = useState<Number | null>()
  const [isDecriptionEmp, setDecriptionEmp] = useState(false)
  const [isObservationEmp, setObservationEmp] = useState(false)
  //image state
  const [image, setImage] = useState<string>()
  const [file, setFile] = useState<File | null>()
  const [fileURL, setFileURL ] = useState("")


  const fileInputRef = useRef<HTMLInputElement | null>(null);


  let http = "http://localhost:3000/"+image

  function clear(){
    setEquipmentMode(false)
    setDescription("")
    setObservation("")
    setAmount(null)
  }

    //imagen
    async function getImage(id: number){
      try {
          const response = await getImageByIdRequest(id)
          setImage(response.data)
      } catch (error) {
          console.log(error)
      }
  }
  const handleButtonClick = () => { 
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
        // la almacenos en esta variable de estado
        setFileURL(fe)
        //el objeto de la imagen editada para el envio al server
        const response = await fetch(fe)
        const blob = await response.blob();
        const editedFile = new File([blob], selectedFile.name, { type: blob.type });
        setFile(editedFile);
      }
      
    }
    
  }
  const uploadImg = async (proId: number)  => {

    console.log("subiendo imagen")
    if (!file){
      console.log("error al subir la imagen")
      return
    }
    const formData = new FormData()
    formData.append('image', file)
    try {
      //Creamos la imagen
      const response: any = await createImagesRequest(formData)

      //si es para un nuevo producto, esta variable tomara el id_image del objeto. si es para modificacion tomara del objeto pro a modificar
      const equiId = isEquiUpdateMode? equiModify.id : proId
      //cambiamos el id_image del objeto reciene por el id de la imagen nueva
      await changeEquipamentImgRequest(response.data, equiId as number)

      if(equiModify.id_image !=51){
        //se elimina si la imagen reemplazada no tiene como id 3
        await deleteImageRequest(equiModify.id_image as number)
      }
      navigate("/Equipments")
      if(isEquiUpdateMode){
        showToasSuccess("Equipo modificado")
      }else{
        showToasSuccess("Equipo creado")
      }
      setFileURL("")
      clear()
      console.log("imagen subido")
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteImg(){
    try {
      await changeEquipamentImgRequest(51, equiModify.id as number)
      await deleteImageRequest(equiModify.id_image as number)
      getImage(3)
    } catch (error) {
      console.log(error)
    }
  }


  async function createEquipment(eq: Equipment){
    try {
      // se crea el producto
      const response = await createEquipamentRequest(eq)
      // si no se ha seleccionado ninguna foto
      if(!fileURL){
        navigate("/Equipments")
        showToasSuccess("Equipo creado")
        clear()
        return
      }
      // si se selecciona el producto el id_image insertado por el id de la imagen 
      uploadImg(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function updateEquipment(equi: Equipment){
    try {
      await updateEquipamentRequest(equi)
      if(!fileURL){
        navigate("/Equipments")
        showToasSuccess("Equipo modificado")
        clear()
        return
      }
      // si se selecciona el producto el id_image insertado por el id de la imagen 
      uploadImg(0)
    } catch (error) {
      console.log(error)
    }
  }

  function validateTf(){
    if(!description){
        setDecriptionEmp(true)
    }
    if(!observation){
        setObservationEmp(true)
    }

    if(!description || !observation){
      return false
    }
    return true
  }
  
  function handleSubmit(){
    if(!validateTf()) return

    const equip = {
        description: description.trim(),
        observation: observation.trim(),
        amount: amount as number
    }
    if(!isEquiUpdateMode){
        createEquipment(equip)
        console.log("formulario valido")
    }else{
        updateEquipment({id: equiModify.id, ...equip})
    }
    navigate("/Equipments")
    clear()
  }

  

  useEffect(() => {
    if(isEquiUpdateMode){
      setDescription(equiModify.description)
      setObservation(equiModify.observation)
      setAmount(equiModify.amount)
      getImage(equiModify.id_image as number)
      
      if(equiModify.id_image == 3){
        setBtnDisabled(true)
      }
    }else{
      setBtnDisabled(true)
    }
  },[])

  useEffect(() => {
    if(fileURL){
      setBtnDisabled(true)
    }
  }, [fileURL])



  return (
    <div 
      className="main-page"
    >
        <div 
            className="register-form"
        >  
            <div className="form-con">
                <div className="pd-title-con">
                    <h3 className="subtitle">Formulario de Equipos</h3>
                </div>
                <div className="image-form-con">
                  <ImageForm
                      fileURL={fileURL}
                      isEntityMode={isEquiUpdateMode}
                      http={http}
                  />
                  <div className='fileName-body'>
                      <button 
                        disabled={isBntDisabled}
                        className={isBntDisabled? "img-form-btn-disable" : "img-form-btn"}
                        onClick={() => openModalDialog()}
                      >
                        <MdDeleteOutline/>
                      </button>
                      <button 
                        className="img-form-btn"
                        onClick={handleButtonClick}
                      >
                        <FaRegImage/>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={selectHandle}
                      />
                      <ModalDialog> 
                          <DeleteImgMsg
                            deleteImg={deleteImg}
                          />
                      </ModalDialog>
                  </div>
                </div>

                <div className="texfield-form-con">
                  <TextField 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    error={isDecriptionEmp}
                    sx={{ width:"100%"}}
                    helperText={isDecriptionEmp ? "La description es requerido" : ""}
                    id="outlined-textarea"
                    label="Descripción" 
                    maxRows={4}
                    variant="outlined" 
                  />
                 <TextField 
                  type="number"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  value={amount}
                  sx={{ marginTop: 2, width:"100%"}}
                  label="Cantidad" 
                  variant="outlined" 
                />
                <TextField 
                  type="text"
                  onChange={(e) => setObservation(e.target.value)}
                  value={observation}
                  sx={{ marginTop: 2, width:"100%"}}
                  error={isObservationEmp}
                  helperText={isObservationEmp ? "La observación es requerida" : ""}
                  label="Observacion" 
                  variant="outlined" 
                />
                </div>
                <div className="btn-con">
                  <button 
                    onClick={() => {
                      navigate("/Equipments")
                      clear()
                    }}
                    type="reset"
                    className="btn btn-res"
                  > 
                    Cancelar
                  </button>
                  <button
                    type="submit" 
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                    className="btn btn-add"
                  > 
                    Guardar
                  </button>
                </div>
            </div>
            <br />
        </div>
    </div>
  )
}

export default EquipmentForm