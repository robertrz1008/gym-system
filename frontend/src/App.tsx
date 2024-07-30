import './css/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './view/pages/auth/LoginPage';
import AppPage from './view/pages/AppPage';
import RegisterPage from './view/pages/auth/RegisterPage';
import ProtectedRoute from './view/pages/RouteProtected';
import HomePage from './view/pages/main/HomePage'
import ClientPage from './view/pages/main/registers/ClientPage';
import ClientForm from './view/pages/main/formPage/ClientForm';
import ProductPage from './view/pages/main/registers/ProductPage';
import ProductForm from './view/pages/main/formPage/ProductForm';
import ImageTest from './view/pages/ImageTest';
import EquipmentPage from './view/pages/main/registers/EquipmentPage';
import EquipmentForm from './view/pages/main/formPage/EquipmenForm';
import SalePage from './view/pages/main/transactions/SalePage';
import PayPage from './view/pages/main/transactions/PayPage';
import SaleSuccess from './view/pages/main/transactions/SaleSuccess';


function App() {


  return (
    <BrowserRouter>
          <Routes>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/Register"} element={<RegisterPage/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path='/img' element={<ImageTest/>}/>
                    <Route path={"/*"} element={<AppPage/>}>
                        <Route path='home' element={<HomePage/>}/>
                        <Route path='clients' element={<ClientPage/>}/>
                        <Route path='client/form' element={<ClientForm/>}/>
                        <Route path='Products' element={<ProductPage/>}/>
                        <Route path='Products/form' element={<ProductForm/>}/>
                        <Route path='Equipments' element={<EquipmentPage/>}/>
                        <Route path='Equipments/form' element={<EquipmentForm/>}/>
                        <Route path='Sale' element={<SalePage/>}/>
                        <Route path='Sale/success/:monto' element={<SaleSuccess/>}/>
                        <Route path='Pay' element={<PayPage/>}/>
                    </Route>
                </Route>
          </Routes>
    </BrowserRouter>
    
  )
}

export default App
