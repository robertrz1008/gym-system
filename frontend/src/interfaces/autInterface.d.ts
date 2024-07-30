import { AppSlice } from "../redux/AppEntity";

export interface Props{
    id?:number
    http?:string
}

export interface ReduxState {
    auth: AppSlice; 
}
export interface contexArg {
    children: ReactNode
}
export interface User{
    id: number,
    name: string,
    email: string,
    password: string
}
export interface Client{
    id?: number,
    name: string,
    telephone: string,
    dni: string
}
export interface Product{
    id?: number,
    description: string,
    price_compra: double,
    price_venta: double,
    id_image?: number
    stock: number
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
export interface FormValues{
    name: string,
    email: string,
    password: string
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
}

export interface StoreContextIn{
    clients: Client[]
    getClients: () => void
    createClient: (client: Client) => void
    deleteClient: (id: number) => void
    cliRedirect: boolean
    clientModify: Client
    setClientUpdate: (cli: Client) => void
    isCliUpdateMode: boolean,
    cliUPdateMode: (val: boolean) => void
    openModalDialog: () => void
    closeModalDialog: () => void
    showModalD: boolean
    getClientsByFilter: (val: string) => void
    product: Array<Product>
    getProductsList: () => void
    getProductsByFilter: (val: string) => void
    proModify: Product
    isProUpdateMode: boolean
    setProductMode: (val: boolean) => void
    setProductUpdate: (pro: Product) => void
    deleteProduct: (id: number) => void
    equipments: Equipment[]
    isEquiUpdateMode: boolean
    equiModify: Equipment
    getEquipmentsList: () => void
    setEquipmentUpdate: (equip: Equipment) => void
    setEquipmentMode: (val: boolean) => void
    getEquipmentsByFilter: (val: string) => void
    deleteEquipment: (id: number) => void
    productDetail: ProductSale[]
    isBtnDisabled: boolean
    addProductSale: (pr: ProductSale) => void
    changeProductAmount: (id: number, amountCurrent: number) => void
    deleteProductDetail: (pr: ProductSale) => void
    createSale: () => void
    total: number
    totalZero: () => void
}