import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FileProvider } from './utils/Context.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FileProvider>
        <App />
      </FileProvider>
    </BrowserRouter>
  </StrictMode>
)
