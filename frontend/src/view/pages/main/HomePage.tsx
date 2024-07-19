import {} from 'react'
import {useNavigate} from "react-router-dom"

function HomePage() {
  const navigate = useNavigate()
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