import { TextField } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { FiDatabase } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useAbm } from "../../../../context/StoreContext";
import {  AppContextIn, Product, StoreContextIn } from "../../../../interfaces/autInterface";
import { useNavigate } from "react-router-dom";
import { changeProductImgRequest, createProductRequest, updateProductRequest } from "../../../../api/productRequest";
import { createImagesRequest, deleteImageRequest, getImageByIdRequest } from "../../../../api/clientRequest";
import { openEditor } from "react-profile";
import "react-profile/themes/dark.min.css";
import ModalDialog from "../../../components/main/ModalDialog";
import DeleteProductImg from "../../../components/ModalDialog/DeleteImageMsg";
import { FaRegImage } from "react-icons/fa";
import ImageForm from "../../../components/rowImage/ImageForm";
import { useAuth } from "../../../../context/AppContext";

function ProductForm() {

  const navigate = useNavigate()
  const { isProUpdateMode, setProductMode, proModify, openModalDialog } = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  const [isBntDisabled, setBtnDisabled] = useState(false)
  const [description, setDescription] = useState("")
  const [priceCompra, setPriceCompra] = useState(0.0)
  const [priceVenta, setPriceVenta] = useState(0.0)
  const [isDecriptionEmp, setDecriptionEmp] = useState(false)
  const [ispriceVentaEmp, setPriceVentaEmp] = useState(false)
  //image state
  const [image, setImage] = useState<string>()
  const [file, setFile] = useState<File | null>()
  const [fileURL, setFileURL ] = useState("")


  const fileInputRef = useRef<HTMLInputElement | null>(null);


  let http = "http://localhost:3000/"+image

  function clear(){
    setProductMode(false)
    setDescription("")
    setPriceCompra(0)
    setPriceVenta(0)

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
      const productId = isProUpdateMode? proModify.id : proId
      console.log(productId)
      //cambiamos el id_image del objeto reciene por el id de la imagen nueva
      await changeProductImgRequest(response.data, productId as number)

      if(proModify.id_image !=3){
        //se elimina si la imagen reemplazada no tiene como id 3
        await deleteImageRequest(proModify.id_image as number)
      }
      navigate("/products")
      if(isProUpdateMode){
        showToasSuccess("Producto modificado")
      }else{
        showToasSuccess("Producto creado")
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
      await changeProductImgRequest(3, proModify.id as number)
      await deleteImageRequest(proModify.id_image as number)
      getImage(3)
    } catch (error) {
      console.log(error)
    }
  }


  async function createProduct(pr: Product){
    try {
      // se crea el producto
      const response = await createProductRequest(pr)
      // si no se ha seleccionado ninguna foto
      if(!fileURL){
        navigate("/products")
        showToasSuccess("Producto creado")
        clear()
        return
      }
      // si se selecciona el producto el id_image insertado por el id de la imagen 
      uploadImg(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function updatePro(pro: Product){
    try {
      await updateProductRequest(pro)
      if(!fileURL){
        navigate("/products")
        showToasSuccess("Producto modificado")
        console.log("nos se ha cambiado foto")
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
    if(!priceVenta){
        setPriceVentaEmp(true)
    }

    if(!description || !priceVenta){
      return false
    }
    return true
  }
  
  function handleSubmit(){
    if(!validateTf()) return

    const pro = {
        description: description.trim(),
        price_compra: priceCompra,
        price_venta: priceCompra,
    }
    if(!isProUpdateMode){
        createProduct(pro)
    }else{
        updatePro({id: proModify.id, ...pro})
    }
    navigate("/Products")
    clear()
  }

  useEffect(() => {
    if(isProUpdateMode){
      getImage(proModify.id_image as number)
      
      if(proModify.id_image == 3){
        setBtnDisabled(true)
      }
    }
  }, [])

  useEffect(() => {
    if(isProUpdateMode){
      console.log("md mode")
      setDescription(proModify.description)
      setPriceCompra(proModify.price_compra)
      setPriceVenta(proModify.price_venta)
    }else{
      setBtnDisabled(true)
    }
  },[proModify])

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
            <div className="title-form-con">
                <h3 className="subtitle">Datos del producto</h3>
            </div>
            <div className="form-con">
                <div className="image-form-con">
                  <ImageForm
                      fileURL={fileURL}
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
                          <DeleteProductImg
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
                    helperText={isDecriptionEmp ? "La description es requerido" : ""}
                    id="standard-error-helper-text"
                    label="Descripción" 
                    variant="outlined" 
                  />
                  <TextField 
                  type="number"
                  onChange={(e) => setPriceCompra(parseFloat(e.target.value))}
                  value={priceCompra}
                  id="Telefono" 
                  label="PrecioCompra" 
                  variant="outlined" 
                />
                 
                <TextField 
                  type="number"
                  onChange={(e) => setPriceVenta(parseFloat(e.target.value))}
                  value={priceVenta}
                  error={ispriceVentaEmp}
                  helperText={ispriceVentaEmp ? "El precioVenta es requerido" : ""}
                  id="DNI" 
                  label="PrecioVenta" 
                  variant="outlined" 
                />
                </div>
            </div>
            
            <div className="btn-con">
                <button 
                  onClick={() => {
                    navigate("/Products")
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
                    console.log("intentando envio")
                    handleSubmit()
                  }}
                  className="btn btn-add"
              > 
                {"Guardar "}<FiDatabase/>
              </button>
            </div>
        </div>
    </div>
  )
}

export default ProductForm