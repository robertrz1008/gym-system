import { TextField } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { MdDeleteOutline } from "react-icons/md";
import { useAbm } from "../../../../context/StoreContext";
import {  AppContextIn, Category, Product, StoreContextIn } from "../../../../interfaces/autInterface";
import { useNavigate } from "react-router-dom";
import { changeProductImgRequest, createProductRequest, getCategoryByIdRequest, updateProductRequest } from "../../../../api/productRequest";
import { createImagesRequest, deleteImageRequest, getImageByIdRequest } from "../../../../api/clientRequest";
import { openEditor } from "react-profile";
import "react-profile/themes/dark.min.css";
import ModalDialog from "../../../components/main/ModalDialog";
import DeleteProductImg from "../../../components/ModalDialog/DeleteImageMsg";
import { FaRegImage } from "react-icons/fa";
import ImageForm from "../../../components/rowImage/ImageForm";
import { useAuth } from "../../../../context/AppContext";
import CategorySearch from "../../../components/ModalForm/CategorySearch";
import { FaSearch } from "react-icons/fa";


function ProductForm() {

  const navigate = useNavigate()
  const { isProUpdateMode, setProductMode, proModify, openModalDialog } = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  const [isBntDisabled, setBtnDisabled] = useState(false)
  const [description, setDescription] = useState("")
  const [priceCompra, setPriceCompra] = useState(0.0)
  const [priceVenta, setPriceVenta] = useState(0.0)
  const [stock, setStock] = useState(0)
  const [isDecriptionEmp, setDecriptionEmp] = useState(false)
  const [ispriceVentaEmp, setPriceVentaEmp] = useState(false)
  const [categorySelected, setCategorySelected] = useState<Category | null>()
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
    setCategorySelected(null)
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
  //para seleccionar la imagen desde el explorador de archivo al formulario
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  //para la categoria
  const categorySelect = (ctg: Category) => setCategorySelected(ctg)
  //enviar la imagen editada al formulario
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
  //enviar la imagen al servidor
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

      if(proModify.id_image !=1){
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
      getImage(1)
    } catch (error) {
      console.log(error)
    }
  }

  async function getProductCategory(id: number){
    try {
      const res = await getCategoryByIdRequest(id)
      setCategorySelected(res.data[0])
      console.log(res.data[0])
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
      console.log("modificando")
      await updateProductRequest(pro)
      if(!fileURL){
        navigate("/products")
        showToasSuccess("Producto modificado")
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
  
  //enviar el forumulario al backend
  function handleSubmit(){
    if(!validateTf()) return

    const pro: Product = {
        description: description.trim(),
        price_compra: priceCompra,
        price_venta: priceVenta,
        id_category: categorySelected?.id,
        stock: stock
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
      setDescription(proModify.description)
      setPriceCompra(proModify.price_compra)
      setPriceVenta(proModify.price_venta)
      getImage(proModify.id_image as number)
      setStock(proModify.stock)
      getProductCategory(proModify.id_category)

      if(proModify.id_image == 3){
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
                <h3 className="subtitle">Datos del producto</h3>
            </div>
                <div className="image-form-con">
                  <ImageForm
                      fileURL={fileURL}
                      isEntityMode={isProUpdateMode}
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

                {/* campos del formulario */}
                <div className="texfield-form-con">
                  
                    <TextField //descripcion
                      onChange={(e) => setDescription(e.target.value)}
                      sx={{ width:"100%"}}
                      value={description}
                      error={isDecriptionEmp}
                      helperText={isDecriptionEmp ? "La description es requerido" : ""}
                      id="standard-error-helper-text"
                      label="Descripción" 
                      variant="outlined" 
                    />

                    <div //categoria
                      style={{marginTop: "10px"}}
                      className="client-input-con">
                        <div className="client-field">
                          {
                            !categorySelected? (<p>Seleccionar</p>): (<p>{categorySelected.description}</p>)
                          }
                        </div>
                        <button onClick={() => openModalDialog()} className="btn btn-search"><FaSearch/></button>
                    </div>
                    
                    <TextField //costo de compra
                      type="number"
                      onChange={(e) => setPriceCompra(parseFloat(e.target.value))}
                      sx={{ marginTop: 2, width:"100%"}}
                      value={priceCompra}
                      id="Telefono" 
                      label="PrecioCompra" 
                      variant="outlined" 
                    />
                    <TextField //costo de vetna
                      type="number"
                      onChange={(e) => setPriceVenta(parseFloat(e.target.value))}
                      sx={{ marginTop: 2, width:"100%"}}
                      value={priceVenta}
                      error={ispriceVentaEmp}
                      helperText={ispriceVentaEmp ? "El precioVenta es requerido" : ""}
                      id="DNI" 
                      label="PrecioVenta" 
                      variant="outlined" 
                    />
                  
                    <TextField //stock
                      type="number"
                      onChange={(e) => setStock(parseFloat(e.target.value))}
                      sx={{ marginTop: 2, width:"100%"}}
                      value={stock}
                      id="DNI" 
                      label="Stock" 
                      variant="outlined" 
                    />
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
                    Guardar
                    </button>
                </div>
                <ModalDialog>
                    <CategorySearch
                        catgorySelect={categorySelect}
                    />
                </ModalDialog>
            </div>

            <br />
        </div>
    </div>
  )
}

export default ProductForm