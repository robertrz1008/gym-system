import { formartDateAndHour } from '../../../utils/DateUtils'

interface Prop{
    date: string
}

function DateHourRow({date}: Prop) {
    const math = formartDateAndHour(date)
  return (
    <td>{math.fecha+"   "+math.hora}</td>
  )
}

export default DateHourRow