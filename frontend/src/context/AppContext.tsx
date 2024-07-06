import {useContext, createContext, useState, useEffect} from "react"
import { contexArg, User } from "../interfaces/autInterface"
import { getProfileRequest, loginRequest, logoutRequest, registerRequest, vefifyTokenRequest } from "../api/autRequest"
import axios from "axios"
import Cookies from "js-cookie"


const appContext = createContext({})

export const useAuth = () => {
    const context = useContext(appContext)
    if(!context){
        throw new Error("Context invalid")
    }
    return context
}

export function AppContextProvider({children}: contexArg){
    const [user, setUser] = useState<User>()
    const [isDisabled, setIsDisabled] = useState(false)
    const [userImg, setUserImg] = useState(String)
    const [errors, setErrors] = useState()
    const [isAutenticate, setIstAutenticate] = useState(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const buttonDisable = () => setIsDisabled(true)
    const buttonEnable = () => setIsDisabled(false)

    const singUp = async (user: User) => {
        setAuthLoading(true)
        buttonDisable
        try {
            const res = await registerRequest(user)
            setAuthLoading(false)
            buttonEnable()
            setUser(res.data)
            setIstAutenticate(true)
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error)
                setAuthLoading(false)
                alert("se produjo un error con la coneccion")
                setErrors(error.response?.data)
            }
        }
    }
    const singIn = async (user: User) => {
        setAuthLoading(true)
        buttonDisable
        try {
            await loginRequest(user)
            setAuthLoading(false)
            buttonEnable
            setIstAutenticate(true)
        } catch (error) {
            if(axios.isAxiosError(error)){
                setAuthLoading(false)
                alert("se produjo un error con la coneccion")
                console.log(error)
                setErrors(error.response?.data)
            }
        }
    }
    const checkLogin = async () => {
        const cookies = Cookies.get()
        setLoading(true)
        if(!cookies.token){
            setIstAutenticate(false)
            setLoading(false)
            console.log("NO hay token")
            return
        }
        try {
            const response = await vefifyTokenRequest()
            if(!response.data){
                setIstAutenticate(false)
                setLoading(false)
                return
            }
            setIstAutenticate(true)
            setLoading(false)
            setUser(response.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const logout = async() => {
        try {
            await logoutRequest()
            setIstAutenticate(false)
        } catch (error) {
            console.log(error)
        }
    }
    const getProfile = async () => {
        try {
            const res = await getProfileRequest()
            setUser(res.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <appContext.Provider value={{
            isDisabled,
            singUp,
            singIn,
            isAutenticate,
            loading,
            authLoading,
            user,
            userImg,
            getProfile,
            logout,
            errors,
        }}>
            {children}
        </appContext.Provider>
      )
}