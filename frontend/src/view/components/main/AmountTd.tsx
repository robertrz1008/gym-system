import { useEffect, useState } from 'react'
import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import { TextField } from '@mui/material'

interface Props{
    amountValue: number
    proId: number
}



function AmountTd({amountValue, proId}: Props) {

  const {changeProductAmount, productDetail, product} = useAbm() as StoreContextIn

  const [amount, setAmount] = useState<number>(0)
  const [productStock, setProductStock] = useState<number>(0)

  function getProStock() {
    const ps = product.filter(pr => pr.id == proId)

    setProductStock(ps[0].stock)
  }

  useEffect(() => {
    setAmount(amountValue)
  }, [])
  useEffect(() => {
    setAmount(amountValue)
    getProStock()
  }, [productDetail])

  useEffect(() => {
    changeProductAmount(proId, amount )
  }, [amount])

  return (
    <td>
    <TextField
          onChange={(e) => {
            const val = parseInt(e.target.value)
            if( val >= productStock){ // si la cantidad ingresada es mayor al stock del producto referenciado
              e.target.value = ""+productStock // el valor de la entrada sera igual al stock
            }
            setAmount(parseInt(e.target.value))
          }}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '70px' }}
          type="number"
          value={amount}
          size='small'
      />
  </td>
  )
}

export default AmountTd