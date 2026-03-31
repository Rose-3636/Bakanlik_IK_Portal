import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext' // Hafızayı çağırdık

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* İşte burası: Artık tüm proje bu hafızayı kullanabilir */}
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>,
)