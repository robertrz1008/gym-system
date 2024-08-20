import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { StoreContextIn } from '../../../interfaces/autInterface'
import { useAbm } from '../../../context/StoreContext'

function HomePage() {
  const navigate = useNavigate()

  const {expireMembership} = useAbm() as StoreContextIn

  useEffect(() => {
    expireMembership()
  }, [])

  return (
    <div>
      <h3>Inicio</h3>
      <button onClick={() => {
        navigate("/img")
      }}>
          img
      </button>
    </div>
  )
}

export default HomePage