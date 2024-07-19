import { useAuth } from "../../../context/AppContext.tsx" 
import "../../../css/Auth.css"
import {useForm, SubmitHandler} from "react-hook-form"
import { FormValues, AppContextIn, User } from "../../../interfaces/autInterface"
import {Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SmashSreen from "../../components/main/SmashSreen.tsx"

function LoginPage() {

    
    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {isDisabled, singIn, isAutenticate, authLoading, errors: loginErrors} = useAuth() as AppContextIn
    const navigate = useNavigate()

  const [smashSreen, setSmashSren] = useState(true);

    useEffect(() => {
        if(isAutenticate) navigate("/")
      },[isAutenticate])

    useEffect(() =>{
        if(!isAutenticate){
            setTimeout(() => {
                setSmashSren(false);
            }, 2000); 
        } 
    },[])

    const submit: SubmitHandler<FormValues> = async (data) => {
        singIn(data as User)
    }
   


  return (
    <div className='authPage'>
        {smashSreen && (<SmashSreen/>)}
        <div className="auth-view-con">
            <div className="auth-backgroud">
                <h1>Gimnacio</h1>
            </div>
                <form 
                    onSubmit={ handleSubmit(submit) }
                    className="auth-form-con"
                >

                    <h3 >Iniciar Seción</h3>

                    <div className="auth-form-body">
                        <h4 className="for-parr">Correo</h4>
                        <input 
                            className="auth-input" 
                            type="email" 
                            {...register("email", {required: true})}
                            placeholder="Correo"
                        />
                        {
                            errors.email && (
                                <p style={{"color":"red"}}>El correo es requerido</p>
                            )
                        }
                        <h4 className="for-parr">Contraseña</h4>
                        <input 
                        onFocus={(e) => console.log("true")}
                            className="auth-input" 
                            type="password" 
                            {...register("password", {required: true})}
                            placeholder='Contraseña'
                        />
                        {
                            errors.password && (
                                <p style={{"color":"red"}}>La contraseña es requerida</p>
                            )
                        }
                    </div>
                    {
                        loginErrors? loginErrors.map((error, id) => (
                            <div key={id} className="error-list">
                                {error}
                            </div>
                        )) : ""
                    }
                    <button 
                        disabled={isDisabled}
                        className={authLoading? "auth-buttonOff" : "auth-btn"}
                    >
                        {
                        authLoading? "Iniciando Session..." : "Inicar Sesion"
                        }
                    </button>
                    
                </form>
        </div>
        <div className="auth-link-p"> 
                    <Link to={"/register"} className="auth-link">¿Aun no tientes una cuenta?</Link>
                </div>
    </div>
  )
}

export default LoginPage