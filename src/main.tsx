import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TopBar from './TopBar.tsx'
import RestoranCartRecord from './restoran/RestoranCartRecord.tsx'
import RestaurantForm from './restoran/RestoranCartRecord.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TopBar/>
    <RestaurantForm/>
    
  </StrictMode>,
)
