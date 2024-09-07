import { useEffect, useState } from 'react'
import { clientMembership, Product, StoreContextIn } from '../../../interfaces/autInterface'
import { useAbm } from '../../../context/StoreContext'
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePeople } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { getClientsRequest, getMembersRequest } from '../../../api/clientRequest'
import { getProductsRequest } from '../../../api/productRequest'
import { getToDayIncomeRequest } from '../../../api/saleRequest'
import { formatNumberWithDots } from '../../../utils/numbersUtils'
import MembershipExpiTable from '../../components/tables/MembershipsExpITable';
import DailyIncomeDashboard from '../../components/Dashboards/DailyIncomeDashboard';


function HomePage() {

  const {expireMembership} = useAbm() as StoreContextIn
  const [clinumber, setCliNumber] = useState(0)
  const [proNumber, setProNumber] = useState(0)
  const [memNumber, setMemNumber] = useState(0)
  const [income, setIncome] = useState(0)

  async function getCliNumber(){
    const res =await getClientsRequest()
    setCliNumber(res.data.length) 
  }
  async function getProNumber(){
    const res = await getProductsRequest()
    const pro:Product[] = res.data
    const p = pro.filter((data) => data.stock > 0)
    setProNumber(p.length)
  }
  async function getMemNumber(){
    const res = await getMembersRequest()
    const pro: clientMembership[] = res.data
    const p = pro.filter((data) => data.status = "miembro")
    setMemNumber(p.length)
  }
  async function getIncome(){
    const res =await getToDayIncomeRequest()
    setIncome(res.data[0].sum)
  }

  useEffect(() => {
    expireMembership()
    getCliNumber()
    getProNumber()
    getMemNumber()
    getIncome()
  }, [])

  return (
    <div className='main-page'>
      <div className='title-con'>
        <h3>Inicio</h3>
      </div>
      {/* <button onClick={() => {
        navigate("/img")
      }}>
          img
      </button> */}

      <div className='targets-con'>
        <div className='target-body t-cli'>
          <IoPersonOutline/>
          <div className='target-texts'>
            <h4>Clientes</h4>
            <h1>{clinumber}</h1>
          </div>
        </div>

        <div 
          className='target-body t-pro'>
          <AiOutlineProduct/>
          <div className='target-texts' >
            <h4>Productos en Stock</h4>
            <h1>{proNumber}</h1>
          </div>
        </div>

        <div 
          className='target-body t-ma'>
          <MdOutlinePeople/>
          <div className='target-texts' >
            <h4>Miembros actuales</h4>
            <h1>{memNumber}</h1>
          </div>
        </div>

        <div 
          className='target-body'>
          <FaDollarSign/>
          <div className='target-texts' >
            <h4>Ingresos del dia</h4>
            <h1>{!income? "0": formatNumberWithDots(income)}</h1>
          </div>
        </div>
      </div>
      
      <div className='data-section'>
        <MembershipExpiTable/>
        <DailyIncomeDashboard/>
      </div>
      <br />
    </div>
  )
}

export default HomePage