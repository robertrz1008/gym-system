import { IoCheckmarkSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

function formatNumberWithDots(value: number): string {
    return value.toLocaleString('es-ES');
}


function PaymentSuccess() {

    const {monto} = useParams()
    const navigate = useNavigate()


  return (
    <div className='main-page'>
        <div className="page-outside">
            <div className='sale-success-con'>
                <div className='Sale-success-icon'>
                    <IoCheckmarkSharp/>
                </div>

                <h3>Pago Realizado</h3>

                <div className="total-sale-con">
                    <h2>{"$ "}{formatNumberWithDots(parseInt(monto as string))}</h2>
                </div>

                <button 
                    className="btn btn-add btn-full" 
                    onClick={() => navigate("/Pay")}
                    autoFocus
                >
                    Aceptar
                </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess