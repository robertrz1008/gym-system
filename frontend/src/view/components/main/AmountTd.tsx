import { useEffect, useState } from 'react'
import { useAbm } from '../../../context/StoreContext'
import { StoreContextIn } from '../../../interfaces/autInterface'
import { TextField } from '@mui/material'

interface Props{
    amountValue: number
    proId: number
}

function AmountTd({amountValue, proId}: Props) {

  const {changeProductAmount, productDetail} = useAbm() as StoreContextIn

  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    setAmount(amountValue)
  }, [])
  useEffect(() => {
    setAmount(amountValue)
  }, [productDetail])

  useEffect(() => {
    changeProductAmount(proId, amount )
  }, [amount])

  return (
    <td>
    <TextField
          onChange={(e) => setAmount(parseInt(e.target.value))}
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