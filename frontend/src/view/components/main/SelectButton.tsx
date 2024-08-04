import { PaymentOptions } from "../../../interfaces/autInterface"


interface Props{
    itemSelected: PaymentOptions | null
    items: PaymentOptions[]
    selectItem: (i: PaymentOptions) => void
}

function SelectButton({items, selectItem, itemSelected}: Props) {


  function isItemSelected(idItem: number): string{ // el elemento seleccionado tendra esta clase
    if(idItem == itemSelected?.value) {
        return "selected-buttom"
    }
    return ""
  }

  return(
    <div>
        <div className="select-button-con"> 
          {
            !items? (<div></div>) : 
              items.map((i, id) => (
                <div 
                  key={id}
                  className={`select-button-item ${isItemSelected(i.value)}`} 
                  onClick={() => selectItem(i)} //se agrega el objeto seleccionado a la funcion
                >
                  {i.name}
                </div>
              ))
          }
        </div>
    </div>
  )
}
export default SelectButton