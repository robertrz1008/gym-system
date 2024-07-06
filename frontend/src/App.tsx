
import './css/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './view/pages/LoginPage';
import AppPage from './view/pages/AppPage';
import RegisterPage from './view/pages/RegisterPage';
import ProtectedRoute from './view/pages/RouteProtected';
import HomePage from './view/pages/main/HomePage'
import ClientPage from './view/pages/main/ClientPage';


function App() {


  return (
    <BrowserRouter>
          <Routes>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/Register"} element={<RegisterPage/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path={"/*"} element={<AppPage/>}>
                        <Route path='home' element={<HomePage/>}/>
                        <Route path='clients' element={<ClientPage/>}/>
                    </Route>
                </Route>
          </Routes>
    </BrowserRouter>
    
  )
}

export default App
