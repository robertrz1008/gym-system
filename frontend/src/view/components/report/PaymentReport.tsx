import { useEffect, useState } from 'react'
import { FiFilter } from "react-icons/fi";
import PaymentsReportTable from '../tables/PaymentsReportTable';
import { AppContextIn, StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';
import { formatNumberWithDots } from '../../../utils/numbersUtils';
import PaymentSidebar from '../FiltersSidebar/PaymentsFilter';
import {PDFDownloadLink} from "@react-pdf/renderer"
import { Tooltip } from 'react-tooltip'
import UploadButton from '../reusable/UploadButton';
import PaymentPDF from '../../../PDF/reports/PaymentsReport';
import { useAuth } from '../../../context/AppContext';

function PaymentReport() {

  const { paymentsReport} = useAbm() as StoreContextIn
  const {showToasSuccess} = useAuth() as AppContextIn


  const [showSidebar, setSidebar] = useState<boolean>(false);
  const [total, setTotal] = useState(0)

  const closeSidebar = () => setSidebar(false)


  function calculateTotal(){
      if(!paymentsReport) return

      const result = paymentsReport.reduce((a, i) => a + i.total, 0)
      setTotal(result)
  }

  useEffect(() => {
      calculateTotal()
  }, [paymentsReport])


  return (
    <div className='report-view-con'>
        <div className='report-payment-header'>
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
            <div>
              <h3>Total: {formatNumberWithDots(total)}</h3>
            </div>
            <a className="my-export">
          <PDFDownloadLink document={<PaymentPDF paymentsReport={paymentsReport}/>} fileName="pagos-reporte">
              <div onClick={() => {
                setTimeout(() => {showToasSuccess("Reporte generado")}, 200);
              }}>
                <UploadButton/>
              </div>
          </PDFDownloadLink>
          </a>
          <Tooltip anchorSelect=".my-export" place="bottom">Exportar</Tooltip>
        </div>

        <PaymentsReportTable/>
        
        <PaymentSidebar
            closeSidebar={closeSidebar}
            showSidebar={showSidebar}
        />
    </div>
  )
}

export default PaymentReport