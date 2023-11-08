import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/reportesContext";
import axios from "axios"
import Tabla from "../components/Tabla";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
export default function AllReports() {
    const {reportes,setReportes,setTablaReportes,tablaReportes} = useMyContext();
    const [busqueda,setBusqueda]=useState("")
    const auth = useAuthUser();
    const navigate = useNavigate();
    const getData=async()=>{
        const response=await axios.get("http://localhost:3000/reportes");
        setReportes(response.data);
        setTablaReportes(response.data)
    }
    const handlechange = e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value)
      }
      const filtrar = (terminoBusqueda) => {
        
        var resultadoBusqueda = tablaReportes.filter((elemento) => {
          return elemento.idRov.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
        });
        
        setReportes(resultadoBusqueda);

      }
    useEffect(()=>{
      if(auth().nombre != "Administrador"){
        navigate("/")
      }
        getData();

        console.log(reportes)
    },[])
  return (
    <>

<div>
        <Navbar></Navbar>
        
        <div className="containergeneraladd pt-4">
          <div className="position-flex">
            <h1 className="pt-5 text-center text-dark">Reporte Rov</h1>
            <h2 className="text-dark text-center">SAA </h2>
            <div className="containerInput">
              <input onChange={handlechange} className="InputBusqueda" placeholder="Buscar por idRov" value={busqueda}></input>
            </div>
            <h1>Todos los reportes</h1>
            <Tabla></Tabla>
            </div>
          </div>
      </div>

    </>
  );
}
