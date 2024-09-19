import { AppSlice } from "../redux/AppEntity";

export interface contexArg {
    children: ReactNode
}
export interface User{
    id: number,
    name: string,
    email: string,
    image_id?: number | null
    password: string
}
export interface ProfileModify {
    name: string,
    email: string,
}
export interface Category{
    id?: int
    description: string 
}
export interface Client{
    id?: number,
    name: string,
    telephone: string,
    dni: string
}
export interface clientMembership{
    id: number,
    name: string,
    datePay: string
    dateExpired: string
    status: string
    id_status: number
}
export interface PaymentsReport{
    name: string,
    dni: string,
    pay_date: string,
    expiration_date: string,
    type_payment: string
    total: number
}
export interface MonthlyMemberships{
    month: string,
    income: number
    memberships: number
}
export interface SalesReport{
    date: string,
    product: string,
    price_venta: number,
    amount: number,
    subtotal: number
}
export interface PymentReportParam{
    fromDate: string,
    toDate: string,
    orderBy: number,
    order:number
}

export interface ClientsParam{
    memberships: boolean
    orderByName: number | null
}
export interface Product{
    id?: number,
    description: string,
    price_compra: double,
    price_venta: double,
    id_image?: number
    category_name?: string,
    id_category: number
    stock: number
}
export interface ProductParams{
    isStock: boolean 
    categoryId: number | null,
    fromPrice: number,
    toPrice: number,
    orderBy:  number | null,
    order: number
}

export interface ProductSale{
    id?: number,
    description: string,
    price_venta: number,
    amount: number,
    subtotal: number
}
export interface Equipment{
    id?: number,
    description: string, 
    observation: string,
    amount: number
    id_image?: number
}
export interface PaymentMembership{
    id?: number,
    id_client: number,
    id_pay_option: number,
    pay_date: string,
    expiration_date: string | null
}
export interface PaymentOptions{
    name: string,
    value: number
}

export interface FormValues{
    name: string,
    email: string,
    password: string
}
export interface ChartItems{
    labels: string[],
    data: number[],
    colors: string[]
  }
export interface AppContextIn{
    isDisabled: boolean,
    singUp: (user: User) => void,
    singIn: (user: User) => void,
    getProfile: () => void,
    getImgProfile: (id: number) => void,
    updateNameProfile: (id:number ,name: Name) => void,
    userImg: string,
    logout: () => void;
    user: User,
    loading: boolean,
    isAutenticate: boolean,
    authLoading: boolean,
    errors: String[]
    SmashSreenShow: () => void
    smashSreen: boolean
    getImage: (id: number) => string
    toast: RefObject<Toast>
    showToasSuccess: (msg: string) => void
    showToasError: (msg: string) => void
    profileImage: string
    getProfileImg:(id: number) => void
}

export interface StoreContextIn{
    clients: Client[]
    getClients: () => void
    createClient: (client: Client) => void
    deleteClient: (id: number) => boolean
    cliRedirect: boolean
    clientModify: Client
    setClientUpdate: (cli: Client) => void
    isCliUpdateMode: boolean,
    cliUPdateMode: (val: boolean) => void
    clientLisded: (cli: ClientsParam) => void
    members: clientMembership[]
    paymentsReport: PaymentsReport[]
    lisPaymentReportByParams: (params: PymentReportParam) => void
    getPaymentReport: (m1: string, m2:string) =>   void
    getClientsMembership: () => void
    getClientMembershipByFIlter: (filter: string) => void
    expireMembership: () => void
    openModalDialog: () => void
    closeModalDialog: () => void
    showModalD: boolean
    getClientsByFilter: (val: string) => void
    product: Array<Product>
    getProductsList: () => void
    getProductsByFilter: (val: string) => void
    categories: Category[]
    getCategoriesList: () => void
    proModify: Product
    isProUpdateMode: boolean
    setProductMode: (val: boolean) => void
    setProductUpdate: (pro: Product) => void
    deleteProduct: (id: number) => boolean
    productListed: (proP: ProductParams) => void
    equipments: Equipment[]
    isEquiUpdateMode: boolean
    equiModify: Equipment
    getEquipmentsList: () => void
    setEquipmentUpdate: (equip: Equipment) => void
    setEquipmentMode: (val: boolean) => void
    getEquipmentsByFilter: (val: string) => void
    deleteEquipment: (id: number) => boolean
    productDetail: ProductSale[]
    isBtnDisabled: boolean
    addProductSale: (pr: ProductSale) => void
    changeProductAmount: (id: number, amountCurrent: number) => void
    deleteProductDetail: (pr: ProductSale) => void
    createSale: () => void
    total: number
    totalZero: () => void
    listSalesReport: (date1:string, date2: string) => void
    salesReport: SalesReport[]
    getMonthMemberships: () => void
    monthlyMemberships: MonthlyMemberships[]
    getMonthlySales: () => void
    monthlySales: {month: string, income: number}[]
}