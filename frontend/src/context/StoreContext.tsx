import {useContext, createContext, useState} from "react"
import { contexArg, Client, Product, Equipment } from "../interfaces/autInterface"
import { deleteClientsRequest, getClientsByFilterRequest, getClientsRequest } from "../api/clientRequest"
import { deleteProductRequest, getProductsByFilterRequest, getProductsRequest } from "../api/productRequest"
import { deleteEquipamentRequest, getEquipamentsByFilterRequest, getEquipamentsRequest } from "../api/equipamentsReq"


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
  
    


    return (
        <appContext.Provider value={{
            clients, getClients, deleteClient, clientModify, setClientUpdate, cliUPdateMode, isCliUpdateMode, getClientsByFilter,
            product, getProductsList, proModify, setProductUpdate, isProUpdateMode, setProductMode,  deleteProduct, getProductsByFilter,
            equipments, getEquipmentsList, setEquipmentUpdate, isEquiUpdateMode, equiModify, setEquipmentMode, getEquipmentsByFilter, deleteEquipment,
            openModalDialog, closeModalDialog, showModalD
        }}>
            {children}
        </appContext.Provider>
      )
}