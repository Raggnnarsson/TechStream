import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import HomeAdm from "./pages/HomeAdm.jsx"
import {RequireAuth} from 'react-auth-kit'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "react-auth-kit"
import 'bootstrap/dist/js/bootstrap.bundle';
import AddRov from "./pages/AddRov.jsx"
import EditarRov from './pages/EditarRov'
import AddPilot from './pages/AddPilot'
import AddCentro from './pages/AddCentro'
import { MyContextProvider } from './context/reportesContext';
import AllReports from './pages/AllReports'
import DetallesRov from './components/DetallesRov'
import ShowPilots from './pages/ShowPilots'
import ShowCentro from './pages/ShowCentro'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/admin",
    element:           <RequireAuth loginPath={'/'}>
    <HomeAdm />
  </RequireAuth>
  },
  {
    path: "/AddRov",
    element:        <RequireAuth loginPath={'/'}>
    <AddRov />
  </RequireAuth>
  },
  {
    path: "/AddPilot",
    element:           <RequireAuth loginPath={'/'}>
    <AddPilot />
  </RequireAuth>
  },
  {
    path: "/Pilots",
    element:           <RequireAuth loginPath={'/'}>
    <ShowPilots />
  </RequireAuth>
  },
  {
    path: "/EditarRov",
    element:        <RequireAuth loginPath={'/'}>
    <EditarRov />
  </RequireAuth>
  },
  {
    path: "/CrearCentro",
    element:        <RequireAuth loginPath={'/'}>
    <AddCentro />
  </RequireAuth>
  },
  {
    path: "/Centros",
    element:        <RequireAuth loginPath={'/'}>
    <ShowCentro />
  </RequireAuth>
  },
  {

    path: "/Allreports",
    element: <AllReports />
  },
  {
    path:"rovDetails",
    element:<DetallesRov/>
  }
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
    <AuthProvider
    authType={"cookie"} authName='_auth' cookieDomain={window.location.hostname} cookieSecure={false}>
    <RouterProvider router={router} />
    </AuthProvider>
    </MyContextProvider>
  </React.StrictMode>,
)
