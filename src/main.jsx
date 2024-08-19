import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AllSet,CreatePass,MainScreen,RecoveryWarming,SeedGenerator,WalletMainScreen} from './components/index.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element ={<App/>}>
    <Route path='' element={<WalletMainScreen/>}/>
    <Route path='/mainscreeen' element={<MainScreen/>}/>
    <Route path='/warning' element={<RecoveryWarming/>}/>
    <Route path='/secretphrase' element={<SeedGenerator/>}/>
    <Route path='/createpass' element={<CreatePass/>}/>
    <Route path='/allset' element={<AllSet/>}/>
  </Route>
))



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
