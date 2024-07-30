import {useContext, createContext, useState, useEffect} from "react"
import { contexArg, Client, Product, Equipment, ProductSale } from "../interfaces/autInterface"
import { deleteClientsRequest, getClientsByFilterRequest, getClientsRequest } from "../api/clientRequest"
import { deleteProductRequest, getProductsByFilterRequest, getProductsRequest, updateProductStockRequest } from "../api/productRequest"
import { deleteEquipamentRequest, getEquipamentsByFilterRequest, getEquipamentsRequest } from "../api/equipamentsReq"
import { createProductDetailRequest, createSaleRequest, udpateSaleTotalRequest } from "../api/saleRequest"


const appContext = createContext({})


export const useAbm = () => {
    const context = useContext(appContext)
    if(!context){
        throw new Error("Context invalid")
    }
    return context
}

export default function StoreContextProvider({children}: contexArg){

    const [clients, setClients] = useState<Client[]>([])
    const [product, setProducts] = useState<Array<Product>>([])
    const [clientModify, setClientModify] = useState<Client>() 
    const [isCliUpdateMode, setCliUpdateMode] = useState(false)
    const [showModalD, setShowModalForm] = useState(false)
    const [proModify, setproModify] = useState<Product>() 
    const [isProUpdateMode, setproUpdateMode] = useState(false) 
    const [equipments, setEquipments] = useState<Array<Equipment>>([])
    const [equiModify, setEquiModify] = useState<Equipment>() 
    const [isEquiUpdateMode, setEquiUpdateMode] = useState(false)
    const [productDetail, setProductDetail] = useState<ProductSale[]>([])
    const [isBtnDisabled, setBtnDisabled] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
      sumTotal()
    }, [productDetail])
    
    useEffect(() => {
      if(productDetail.length == 0){
        setBtnDisabled(true)
      }else{
        setBtnDisabled(false)
      }
    }, [productDetail])


    const openModalDialog = () => setShowModalForm(true)
    const closeModalDialog = () => setShowModalForm(false)

    //  CLIENT
    async function getClients() {
        try {
          const response = await getClientsRequest()
          setClients(response.data)
        } catch (error) {
          console.log(error)
        }
    }
    async function getClientsByFilter(value: string) {
      const response = await getClientsByFilterRequest(value)
      setClients(response.data)
    }
    async function cliUPdateMode(val: boolean){
        setCliUpdateMode(val)
    }
    function setClientUpdate(cli: Client) {
        setClientModify(cli)
    }
    async function deleteClient(id: number) {
        try {
          await deleteClientsRequest(id)
          getClients()
          closeModalDialog()
        } catch (error) {
          console.log(error)
        }
    }
    // PRODUCTS
    async function getProductsList(){
      try {
        const response = await getProductsRequest()
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const setProductUpdate = (pro: Product)  => setproModify(pro)
    const  setProductMode = (val: boolean) => setproUpdateMode(val)
    async function deleteProduct(id: number) {
      try {
        await deleteProductRequest(id)
        getProductsList()
        closeModalDialog()
      } catch (error) {
        console.log(error)
      }
    }
    async function getProductsByFilter(value: string) {
      const response = await getProductsByFilterRequest(value)
      setProducts(response.data)
    }
    // EQUIPAMENTS
    async function getEquipmentsList(){
      try {
        const response = await getEquipamentsRequest()
        setEquipments(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const setEquipmentUpdate = (equip: Equipment)  => setEquiModify(equip)
    const setEquipmentMode = (val: boolean) => setEquiUpdateMode(val)
    async function deleteEquipment(id: number) {
      try {
        await deleteEquipamentRequest(id)
        getEquipmentsList()
        closeModalDialog()
      } catch (error) {
        console.log(error)
      }
    }
    async function getEquipmentsByFilter(value: string) {
      const response = await getEquipamentsByFilterRequest(value)
      setEquipments(response.data)
    }
    // product Sale
    
    function sumTotal(){
      const newTotal = productDetail.reduce((con, el) => con + el.subtotal, 0)
      setTotal(newTotal)
      // console.log("La suma total es: "+total)
    }
    function totalZero(){
      setTotal(0)
    }
    function addDetailProduct( id: number){
      setProductDetail((prevProducts) => {
        return prevProducts.map((product) => {
          return product.id === id
            ? { ...product, subtotal: product.price_venta * product.amount }
            : product;
        });
      });
    }
  
    function addProductAmout(id: number){
      setProductDetail((detailPro) => {
        return detailPro.map((pro) => {
          return pro.id == id? { ...pro, amount: pro.amount + 1 } : pro
        })
      })
    }
    function changeProductAmount(id: number, amountCurrent: number){

      if(!amountCurrent) return

      setProductDetail((detailPro) => {
        return detailPro.map((pro) => {
          return pro.id == id? { ...pro, amount: amountCurrent, subtotal: pro.price_venta * amountCurrent } : pro
        })
      })
      sumTotal()
      console.log(productDetail)
    }
  
    function addProductSale(pr: ProductSale){
      if(productDetail.some((data) => data.id === pr.id)){
        console.log("mismo producto")
        addProductAmout(pr.id as number);
      } else {
        console.log("producto diferente")
        setProductDetail([...productDetail, pr])
      }
      addDetailProduct(pr.id as number);
      console.log(productDetail)
    }
    function deleteProductDetail(product: ProductSale){
      const newProduct = productDetail.filter((Data) => Data.id != product.id)
      setTotal((data) => data - product.subtotal)
      closeModalDialog()
      setProductDetail(newProduct)
    }
    async function createSale(){
      if(productDetail.length == 0) return
      try {
        setBtnDisabled(true)
        const saleId: number | any = await createSaleRequest()
        for (const pro of productDetail) {
          await createProductDetailRequest(
            {
              proId: pro.id as number,
              idSale: saleId.data,
              amount: pro.amount,
              subTotal: pro.subtotal
            }
          )
          const proIdCurrent = pro.amount
          await updateProductStockRequest({stock: proIdCurrent}, pro.id as number)
        }
        
        await udpateSaleTotalRequest({total: total}, saleId.data)
        setBtnDisabled(false)
        setProductDetail([])
        return true
      } catch (error) {
        setBtnDisabled(false)
        console.log(error)
        return false
      }
    }

    return (
        <appContext.Provider value={{
            clients, getClients, deleteClient, clientModify, setClientUpdate, cliUPdateMode, isCliUpdateMode, getClientsByFilter,
            product, getProductsList, proModify, setProductUpdate, isProUpdateMode, setProductMode,  deleteProduct, getProductsByFilter,
            equipments, getEquipmentsList, setEquipmentUpdate, isEquiUpdateMode, equiModify, setEquipmentMode, getEquipmentsByFilter, deleteEquipment,
            productDetail, addProductSale, changeProductAmount, total, deleteProductDetail, createSale, totalZero,
            openModalDialog, closeModalDialog, showModalD, isBtnDisabled
        }}>
            {children}
        </appContext.Provider>
      )
}