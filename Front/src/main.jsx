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
import AddRov from "./pages/addRov.jsx"
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
  
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
    authType={"cookie"} authName='_auth' cookieDomain={window.location.hostname} cookieSecure={false}>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
