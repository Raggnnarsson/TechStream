import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomeAdm.css";
import EditarRov from "./EditarRov";
import { useMyContext } from "../context/reportesContext";
import Form from "react-bootstrap/Form";
import TablaReportesActivos from "../components/TablaReportesActivos";
import DetallesRov from "../components/DetallesRov";

//import EditarRov from "./EditarRov";
function HomeAdm() {
  //instanciando funcion que nos elimina las cookies para desloguearnos
  const signOut = useSignOut();
  //instancia una funcion de redireccion
  const navigate = useNavigate();
  //Funcion que retorna el estado del login
  const auth = useAuthUser();
  //reportes de los reportes
  const {
    clickVerMas,
    setClickVerMas,
    clickReporte,
    setReportesActivos,
    tablaReportesActivos,
    setTablaReportesActivos,
  } = useMyContext();
  //estado donde se guarda si los reportes de los reportes se cargaron o no
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  //Funcion que desloguea y redirige
  const logout = () => {
    signOut();
    navigate("/");
  };

  //Funcion que obtiene los reportes de los rovs y habilita mostrar los reportes de la tabla
  async function getData() {
    const response = await axios.get(
      "http://localhost:3000/reportes/reporteActivo"
    );
    console.log(response.data);
    setReportesActivos(response.data);
    setTablaReportesActivos(response.data);
  }
  const handlechange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    console.log("real");

    var resultadoBusqueda = tablaReportesActivos.filter((elemento) => {
      return elemento.serialRov
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase());
    });

    console.log(resultadoBusqueda);
    setReportesActivos(resultadoBusqueda);
  };
  //useffect funcion que se ejecuta al inciar la pagina carga los reportes y habilita que se muestren
  useEffect(() => {
    getData();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className="bg-dark">
        <Navbar></Navbar>
        <h1 className="text-ligth pt-5 text-center">Cargando...</h1>
      </div>
    );
  }
  if (clickReporte) {
    return (
      <>
        <EditarRov></EditarRov>
      </>
    );
  }
  if (clickVerMas) {
    return (
      <>
        <DetallesRov></DetallesRov>
      </>
    );
  }
  return (
    <>
      <div>
        <Navbar></Navbar>

        <div className="containergeneraladd pt-4">
          <div className="position-flex">
            <h1 className="pt-5 text-center text-dark">Reporte Rov</h1>
            <h2 className="text-dark text-center">{auth().nombre} </h2>
            <div className="containerInput">
              <input
                onChange={handlechange}
                className="InputBusqueda"
                placeholder="Buscar por idRov"
                value={busqueda}
              ></input>
            </div>

            {auth().nombre === "Logística" || auth().nombre === "Administrador" ? (
              <div className="card">
                <div className="card-body">
                    <h1>Rovs disponibles</h1>
                    <TablaReportesActivos tipoEstado="Disponible"></TablaReportesActivos>
                    </div>
              </div>
              ) : null}
                

            {auth().nombre === "Taller" || auth().nombre === "Administrador" ? (
              <div className="card">
              <div className="card-body">
                  <h1>Rovs En Mantención</h1>
                  <TablaReportesActivos tipoEstado="En Mantención"></TablaReportesActivos>
                  </div>
              </div>
            ) : null}

            {auth().nombre === "Taller" || auth().nombre === "Administrador" ? (
              <div className="card">
              <div className="card-body">
                  <h1>Rovs Pendiente</h1>
                  <TablaReportesActivos tipoEstado="Pendiente"></TablaReportesActivos>
                  </div>
              </div>
            ) : null}

            {auth().nombre === "Logística" || auth().nombre === "Administrador" ? (
              <div className="card">
              <div className="card-body">
                  <h1>Rovs En planta</h1>
                  <TablaReportesActivos tipoEstado="En planta"></TablaReportesActivos>
                  </div>
              </div>
            ) : null}

            {auth().nombre === "Taller" || auth().nombre === "Administrador" ? (
              <div className="card">
              <div className="card-body">
                  <h1>Rovs Baja</h1>
                  <TablaReportesActivos tipoEstado="De baja"></TablaReportesActivos>
                  </div>
              </div>
            ) : null}

            <button className="btn btn-danger" onClick={logout}>
              Cerrar Sesión
            </button>

            {auth().nombre === "Administrador" ? (
              <>
                
                <button className="btn btn-primary" onClick={()=>{
                  navigate("/Allreports")
                }
                } >
                  Ver reportes
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdm;