import { AppSlice } from "../redux/AppEntity";

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
}
export interface FormValues{
    name: string,
    email: string,
    password: string
}