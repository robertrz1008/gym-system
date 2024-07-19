import { useAuth } from "../../../context/AppContext.tsx" 
import { Link, useNavigate } from "react-router-dom"
import {useForm, SubmitHandler} from "react-hook-form"
import { FormValues, AppContextIn, User } from "../../../interfaces/autInterface.d.ts"
import { useEffect } from "react"

function RegisterPage() {

    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {isDisabled, singUp, isAutenticate , authLoading, errors: registerErrors} = useAuth() as AppContextIn
    const navigate = useNavigate()

    useEffect(() => {
        if(isAutenticate) navigate("/")
      },[isAutenticate])

    const submit: SubmitHandler<FormValues> = async (data) => {
        singUp(data as User)
    }

  return (
    <div className='authPage'>
        <div className="auth-view-con">
            <div className="auth-backgroud">
                <h1>Gimnacio</h1>
            </div>
            <form 
            onSubmit={ handleSubmit(submit) }
            className="auth-form-con"
        >

            <h3>Registrarse</h3>

            <div className="auth-body">
                <h4 className="for-parr">Nombre</h4>
                <input 
                    className="auth-input" 
                    type="text" 
                    {...register("name", {required: true})}
                    placeholder='Nombre de usuario'
                />
                {
                    errors.name && (
                        <p style={{"color":"red"}}>El nombre de usuario es requerido</p>
                    )
                }
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
                registerErrors? registerErrors.map((error, id) => (
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
                authLoading? "Registrando..." : "Registrarse"
                }
            </button>
            </form> 
        </div>
        

        <div className="auth-link-p">
            <Link to={"/login"} className="auth-link">¿Ya tienes una cuenta?</Link>
        </div>

    </div>
  )
}

export default RegisterPage