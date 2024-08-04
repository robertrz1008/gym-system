import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useAbm } from "../../../../context/StoreContext";
import { Client, PaymentOptions, StoreContextIn } from "../../../../interfaces/autInterface";
import ModalDialog from "../../../components/main/ModalDialog";
import ClientSearch from "../../../components/ModalForm/ClientSearch";
import { makePaymentMemership } from "../../../../api/membershipRequest";
import { addOneMont } from "../../../../utils/DateUtils";
import SelectButton from "../../../components/main/SelectButton";



function PayPage() {

  const {openModalDialog} = useAbm() as StoreContextIn
  const payments: PaymentOptions[] = [
    {name: "Mensual", value: 1},
    {name: "Sesón", value: 2}
  ];

  const [clientName, setClientName] = useState<Client | null>();
  const [entryDate, SetEntryDate] = useState<string>()
  const [typePay, setTypePay] = useState<PaymentOptions | null>();
  


  function clientSelect(cli: Client){
      setClientName(cli)
  }

  function clear(){
    setClientName(null)
    SetEntryDate("")
    setTypePay(null)
  }

  function paySelected(item: PaymentOptions){
    setTypePay(item)
  }
  async function makePayment(){
    try {
      const payment = {
        id_client: clientName?.id as number,
        id_pay_option: typePay?.value as number,
        pay_date: entryDate as string,
        expiration_date: addOneMont(entryDate as string)
      }
      console.log(payment)
      await makePaymentMemership(payment)
      clear()
    } catch (error) {
      console.log(error)
    }
  }

  // const handleChange = (event: SelectChangeEvent) => setTypePay(parseInt(event.target.value));


  return (
    <div className="main-page">
      <div className="pay-con">
          <div className="pd-title-con">
              <h3>Realizar pago</h3>
          </div>

          <div className="pay-inputs-con">
            <h4>Cliente</h4 >
            <div className="client-input-con">
              <div className="client-field">
                {
                  !clientName? (<p>Seleccionar</p>): (<p>{clientName.name}</p>)
                }
              </div>
              <button onClick={() => openModalDialog()} className="btn btn-search"><FaSearch/></button>
            </div>
              
            <h4 style={{marginTop: "15px"}}>Fecha de pago</h4>  
            <input 
              value={entryDate}
              onChange={(e) => SetEntryDate(e.target.value) }
              className="input-date" 
              type="date"
            />
            
          </div>

          {/* <div> */}
                <SelectButton 
                    items={payments}
                    itemSelected={typePay as PaymentOptions}
                    selectItem={paySelected}
                />  
            {/* </div> */}

          <div style={{width: "100%", paddingRight:"10px", paddingLeft:"10px", marginTop: "20px"}}>
              {/* <button 
                className="btn btn-reset"
                onClick={() => clear()}
              >
                Limpiar
              </button> */}
              <button 
                  onClick={() => makePayment()}
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