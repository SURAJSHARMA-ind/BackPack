
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AllSet, CreatePass, MainScreen,WalletPopUp, RecoveryWarming, SeedGenerator, WalletMainScreen,Importwallet } from './components/index.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from "@vercel/analytics"
inject()
injectSpeedInsights();



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path='/' element={<App />}>
      <Route path='' element={<WalletMainScreen />} />
      <Route path='/mainscreen' element={<MainScreen />} />
      <Route path='/warning' element={<RecoveryWarming />} />
      <Route path='/secretphrase' element={<SeedGenerator />} />
      <Route path='/createpass' element={<CreatePass />} />
      <Route path='/allset' element={<AllSet />} />
      <Route path='/walletpopup' element={<WalletPopUp />} />
      <Route path='/importwallet' element={<Importwallet />} />

    </Route>
  ))



createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 //</StrictMode>,
)
