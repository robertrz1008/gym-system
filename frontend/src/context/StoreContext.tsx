import {useContext, createContext, useState, useEffect} from "react"
import { contexArg, Client, Product, Equipment, ProductSale, Category, ClientsParam, ProductParams, clientMembership, PaymentsReport, PymentReportParam, SalesReport, MonthlyMemberships } from "../interfaces/autInterface"
import { deleteClientsRequest, getClientsByFilterRequest, getClientsListedRequest, getClientsRequest, getMembersByFilterRequest, getMembersRequest } from "../api/clientRequest"
import { deleteProductRequest, getCategoriesRequest, getProductListedRequest, getProductsByFilterRequest, getProductsRequest, updateProductStockRequest } from "../api/productRequest"
import { deleteEquipamentRequest, getEquipamentsByFilterRequest, getEquipamentsRequest } from "../api/equipamentsReq"
import { createProductDetailRequest, createSaleRequest, getMonthlySalesRequest, getSalesReportRequest, udpateSaleTotalRequest } from "../api/saleRequest"
import { convertISOStringToDateString, formatStringToDate } from "../utils/DateUtils"
import { expireMembershipRequest, getMonthlyMembershipRequest, getPaymentsReportByParamsRequest, getPaymentsReportRequest } from "../api/membershipRequest"


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
    const [members, SetMembers] = useState<clientMembership[]>([])
    const [paymentsReport, setPaymentSReport] = useState<PaymentsReport[]>([])
    const [product, setProducts] = useState<Array<Product>>([])
    const [categories, setCategories] = useState<Category[]>([])
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
    const [salesReport, setSalesReport] = useState<SalesReport[]>([])
    const [monthlyMemberships, setMonthlyMemberships] = useState<MonthlyMemberships[]>([])
    const [monthlySales, setMonthlySales] = useState<{month: string, income: number}[]>([])


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
    async function clientLisded(clientParams: ClientsParam){
      try {
        const response = await getClientsListedRequest(clientParams)
        setClients(response.data)
      } catch (error) {
        
      }
    }
    //CLIENT MEMBERS
    const getClientsMembership = async () => {
      try {
          const response = await getMembersRequest()
          SetMembers(response.data)
      } catch (error) {
          console.log(error)
      }
    } 
    async function getClientMembershipByFIlter(val: string){
      try {
        const response = await getMembersByFilterRequest(val)
        SetMembers(response.data)
      } catch (error) {
          console.log(error)
      }
    }
    async function expireMembership(){ // se caduca aquellas membresias una ves acabado el plazo

    const response = await getMembersRequest()
    SetMembers(response.data)

    for (const cli of members) {
        const dateExpire = convertISOStringToDateString(cli.dateExpired)
        const a = formatStringToDate(dateExpire)
        const toDay = new Date()
        if(a <= toDay && cli.id_status == 1){
            await expireMembershipRequest(cli.id)
        }
    }
    getClientsMembership()

    }
    async function getPaymentReport(m1: string, m2:string) {
      try {
        const response = await getPaymentsReportRequest(m1, m2)
        setPaymentSReport(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    async function lisPaymentReportByParams(params: PymentReportParam){
      try {
        const response = await getPaymentsReportByParamsRequest(params)
        setPaymentSReport(response.data)
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
    async function getCategoriesList(){
      try {
        const response = await getCategoriesRequest()
        setCategories(response.data)
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
    async function productListed(proP: ProductParams){
      try {
        const response = await getProductListedRequest(proP)
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
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
    async function listSalesReport(date1: string, date2: string){
      console.log([date1, date2])
      try {
        const response = await getSalesReportRequest(date1, date2)
        setSalesReport(response.data)
      } catch (error) {
          console.log(error)
      }
    }
    //statistics
    async function getMonthMemberships(){
      try {
        const response = await getMonthlyMembershipRequest()
        setMonthlyMemberships(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    async function getMonthlySales(){
      try {
        console.log("peticion de ingresos")
        const response = await getMonthlySalesRequest()
        console.log(response.data)
        setMonthlySales(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <appContext.Provider value={{
            clients, getClients, deleteClient, clientModify, setClientUpdate, cliUPdateMode, isCliUpdateMode, getClientsByFilter, clientLisded, 
            members, getClientsMembership, getClientMembershipByFIlter, expireMembership, paymentsReport, getPaymentReport, lisPaymentReportByParams, getMonthMemberships, monthlyMemberships,
            product, getProductsList, proModify, setProductUpdate, isProUpdateMode, setProductMode,  deleteProduct, getProductsByFilter, getCategoriesList, categories, productListed,
            equipments, getEquipmentsList, setEquipmentUpdate, isEquiUpdateMode, equiModify, setEquipmentMode, getEquipmentsByFilter, deleteEquipment,
            productDetail, addProductSale, changeProductAmount, total, deleteProductDetail, createSale, totalZero, listSalesReport, salesReport, getMonthlySales, monthlySales,
            openModalDialog, closeModalDialog, showModalD, isBtnDisabled,
        }}>
            {children}
        </appContext.Provider>
      )
}