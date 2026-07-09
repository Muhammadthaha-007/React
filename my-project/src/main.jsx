import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { logedInContext } from './context/context.jsx'
import './index.css'
import App from './App.jsx'

function Root() {
  const [logedIn, setlogedIn] = useState(false);
  return (
    <logedInContext.Provider value={{ logedIn, setlogedIn }} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </logedInContext.Provider>
  );
}
createRoot(document.getElementById('root')).render(
  <Root />
)
