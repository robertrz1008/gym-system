import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useAbm } from "../../../../context/StoreContext";
import { Client, PaymentOptions, StoreContextIn } from "../../../../interfaces/autInterface";
import ModalDialog from "../../../components/main/ModalDialog";
import ClientSearch from "../../../components/ModalForm/ClientSearch";
import { makePaymentMemership } from "../../../../api/membershipRequest";
import { addOneMont } from "../../../../utils/DateUtils";
import SelectButton from "../../../components/main/SelectButton";
import { useNavigate } from "react-router-dom";



function PayPage() {

  const {openModalDialog} = useAbm() as StoreContextIn
  const payments: PaymentOptions[] = [
    {name: "Mensual", value: 1},
    {name: "Sesón", value: 2}
  ];
  const navigate = useNavigate()

  const [clientName, setClientName] = useState<Client | null>();
  const [entryDate, SetEntryDate] = useState<string>()
  const [typePay, setTypePay] = useState<PaymentOptions | null>();
  // const [payN, setPayN] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string>("")
  

  const clientSelect = (cli: Client) => setClientName(cli)

  function clear(){
    setClientName(null)
    SetEntryDate("")
    setTypePay(null)
  }

  const paySelected = (item: PaymentOptions) => setTypePay(item)

  function validateFields(): boolean {
    const payment = typePay?.value

      if(!payment) {
        setErrorMsg("Seleccionael tipo de pago")
        return false
      }
      if(payment == 1 && !clientName){
        setErrorMsg("Seleccionael el cliente")
        return false
      }

    return true
  }

  //si el pago es mensual, se definira la fecha de expiracion, si es por sesion, no habra fecha
  function isPayMont(): string | null{
    if(typePay?.value == 1){
      return addOneMont(entryDate as string)
    }
    return null
  }

  async function makePayment(){
    try {
      const payment = {
        id_client: clientName?.id as number,
        id_pay_option: typePay?.value as number,
        pay_date: entryDate as string,
        expiration_date:  isPayMont()
      }
      const total =  await makePaymentMemership(payment)
      navigate(`/Pay/success/${total.data}`)
      setErrorMsg("")
      clear()
    } catch (error) {
      console.log(error)
    }
  }

  function hanldeSubmit(){
    if(!validateFields()) return

    makePayment()
  }

  // const handleChange = (event: SelectChangeEvent) => setTypePay(parseInt(event.target.value));


  return (
    <div className="main-page">
      <div className="pay-con">
          <div className="pd-title-con">
              <h3>Realizar pago</h3>
          </div>

          <div className="pay-inputs-con"> 
            <p>Cliente</p>
            <div className="client-input-con">
              <div className="client-field">
                {
                  !clientName? (<p>Seleccionar</p>): (<p>{clientName.name}</p>)
                }
              </div>
              <button onClick={() => openModalDialog()} className="btn btn-search"><FaSearch/></button>
            </div>
              
            <p style={{marginTop: "15px"}}>Fecha de pago</p>  
            <input 
              value={entryDate}
              onChange={(e) => SetEntryDate(e.target.value) }
              className="input-date" 
              type="date"
            />
            
          </div>

          <SelectButton 
              items={payments}
              itemSelected={typePay as PaymentOptions}
              selectItem={paySelected}
          />  

          { errorMsg && (<div className="error-message"> <h4>{errorMsg}</h4></div>)}
              
          <div style={{width: "100%", paddingRight:"10px", paddingLeft:"10px", marginTop: "20px"}}>
              <button 
                  onClick={() => hanldeSubmit()}
                  className="btn btn-add btn-full"
              >
                Aceptar
              </button>
          </div> 

          <ModalDialog>
            <ClientSearch
              clientSelect={clientSelect}/>
          </ModalDialog>
      </div>
    </div>
  )
}

export default PayPage