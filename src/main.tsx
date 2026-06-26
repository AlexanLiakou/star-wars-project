import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import { StarWarsProvider } from './context/StarWarsContext';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    </BrowserRouter>
  </StrictMode>
)
