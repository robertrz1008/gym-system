import { useEffect, useState } from "react"
import { useAbm } from "../../../context/StoreContext"
import { AppContextIn, StoreContextIn } from "../../../interfaces/autInterface"
import { getDateDaysAgo, toDay } from "../../../utils/DateUtils"
import SalesReportTable from "../tables/SalesReportTable"
import { Tooltip } from 'react-tooltip'
import { formatNumberWithDots } from "../../../utils/numbersUtils"
import {PDFDownloadLink} from "@react-pdf/renderer"
import { useAuth } from "../../../context/AppContext"
import UploadButton from '../reusable/UploadButton';
import SalePDF from "../../../PDF/reports/SalesReport"
import SaleSidebar from "../FiltersSidebar/SalesFilter"
import { FiFilter } from "react-icons/fi";


function SalesReport() {

  const { listSalesReport, salesReport,} = useAbm() as StoreContextIn
  const {showToasSuccess } = useAuth() as AppContextIn

  const [showSidebar, setSidebar] = useState<boolean>(false);
  const [total, setTotal] = useState(0)

  function getTodayReport(){
    const day = toDay()
    listSalesReport(day.fechaA01, day.fechaActual)
  }
  const closeSidebar = () => setSidebar(false)

  function handleSelect(n: number){
    if(n == 1) {
      getTodayReport()
    }
    if(n == 2) {
      const days = getDateDaysAgo(7)
      listSalesReport(days.fechaPasada, days.fechaHoy)
    }
    if(n == 3){
      const days = getDateDaysAgo(30)
      listSalesReport(days.fechaPasada, days.fechaHoy)
    }
  }

  function calculateTotal(){
    const result = salesReport.reduce((con, el) => con + el.subtotal, 0)
    setTotal(result)
  }

  useEffect(() => {
    calculateTotal()
  }, [salesReport])

  return (
    <div className='report-view-con'>
        <div className='report-payment-header'>
             <div style={{width:"250px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{width: "150px", height: "100%", display:"flex", alignItems:"center", marginLeft: "10px"}}>
                    <select 
                        onChange={(e) => handleSelect(Number(e.target.value))}
                        className={`filter-selectinput`} 
                        style={{height: "30px"}}
                    >
                      <option value={1}>Hoy</option>
                      <option value={2}>Ultimos 7 dias</option>
                      <option value={3}>Ultimos 30 dias</option>
                    </select>
                </div>
                <div 
                  style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}
                  className={`filter-con`}
                  onClick={() => {
                    setSidebar(true)
                  }}
                  >
                    <FiFilter/>
                    <p>Filtro</p>
                </div>
             </div>

              <div>
              <h3>Total: {formatNumberWithDots(total)}</h3>
            </div>
            <div>

            </div>
            <a className="my-export">
          <PDFDownloadLink document={<SalePDF salesReport={salesReport}/>} fileName="ventas-reporte">
              <div onClick={() => {
                setTimeout(() => {showToasSuccess("Reporte generado")}, 200);
              }}>
                <UploadButton/>
              </div>
          </PDFDownloadLink>
          </a>
          <Tooltip anchorSelect=".my-export" place="bottom">Exportar</Tooltip>
        </div>
        <SalesReportTable/>

        <SaleSidebar
              showSidebar={showSidebar}
              closeSidebar={closeSidebar}
        />
    </div>
  )
}

export default SalesReport