import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContext' 
import StoreContextProvider from './context/StoreContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppContextProvider >
      <StoreContextProvider>
            <App />
      </StoreContextProvider>
      </AppContextProvider>
  </React.StrictMode>,
)
