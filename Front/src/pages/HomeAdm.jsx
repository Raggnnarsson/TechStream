import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./HomeAdm.css"
import { Link } from "react-router-dom";
function HomeAdm() {
  //instanciando funcion que nos elimina las cookies para desloguearnos
  const signOut = useSignOut();
  //instancia una funcion de redireccion
  const navigate = useNavigate();
  //Funcion que retorna el estado del login
  const auth = useAuthUser();
  //reportes de los reportes
  const [reportes, setReportes] = useState([]);
  //estado donde se guarda si los reportes de los reportes se cargaron o no
  const [loading, setLoading] = useState(true);
  //Funcion que desloguea y redirige
  const logout = () => {
    signOut();
    navigate("/");
  };
  //Funcion que obtiene los reportes de los rovs y habilita mostrar los reportes de la tabla
  async function getData() {
    const response = await axios.get("http://localhost:3000/reportes");
    setReportes(response.data);
  }
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
  return (
    <>
      <Navbar></Navbar>
      <div className="containergeneraladd pt-4">
        <div className="position-flex">
          <h1 className="pt-5 text-center text-dark">Reporte Rov</h1>
          <h2 className="text-light text-center">{auth().nombre} </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div id="example-collapse-text">
              <h3 className="text-dark">Rovs disponibles</h3>
              <table className="table table-dark table-bordered mx-auto">
                <thead>
                  <tr>
                    <th scope="col">Id ROV</th>
                    <th scope="col">Estado del rov</th>
                    <th scope="col">Salmonera</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Piloto</th>
                    <th scope="col">Fecha de ingreso</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) =>
                    reporte.tipoEstado === "Disponible" ? (
                      <>
                        <tr>
                          <td key={index} scope="col">
                            {reporte.idRov}
                          </td>
                          <td key={index} scope="col">
                            {reporte.tipoEstado}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombreSalmonera}
                          </td>
                          <td key={index} scope="col">
                            {reporte.centro}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombre}
                          </td>
                          <td key={index} scope="col">
                            {reporte.fechaIngreso}
                          </td>
                          <td key={index} scope="col">
                            <Link to="/EditarRov" >editar</Link>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div id="example-collapse-text">
              <h3 className="text-dark">Rovs pendientes o en mantención</h3>
              <table className="table table-dark table-bordered mx-auto">
                <thead>
                  <tr>
                    <th scope="col">Id ROV</th>
                    <th scope="col">Estado del rov</th>
                    <th scope="col">Salmonera</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Piloto</th>
                    <th scope="col">Fecha de ingreso</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) =>
                    reporte.tipoEstado === "Pendiente" ||
                    reporte.tipoEstado === "En Mantención" ? (
                      <>
                        <tr>
                          <td key={index} scope="col">
                            {reporte.idRov}
                          </td>
                          <td key={index} scope="col">
                            {reporte.tipoEstado}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombreSalmonera}
                          </td>
                          <td key={index} scope="col">
                            {reporte.centro}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombre}
                          </td>
                          <td key={index} scope="col">
                            {reporte.fechaIngreso}
                          </td>
                          <td key={index} scope="col">
                          <Link to="/EditarRov" >editar</Link>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div id="example-collapse-text bg-dark">
              <h3 className="text-dark">Rovs en planta</h3>
              <table className="table table-dark table-bordered mx-auto">
                <thead>
                  <tr>
                    <th scope="col">Id ROV</th>
                    <th scope="col">Estado del rov</th>
                    <th scope="col">Salmonera</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Piloto</th>
                    <th scope="col">Fecha de ingreso</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) =>
                    reporte.tipoEstado === "En planta" ? (
                      <>
                        <tr>
                          <td key={index} scope="col">
                            {reporte.idRov}
                          </td>
                          <td key={index} scope="col">
                            {reporte.tipoEstado}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombreSalmonera}
                          </td>
                          <td key={index} scope="col">
                            {reporte.centro}
                          </td>
                          <td key={index} scope="col">
                            {reporte.nombre}
                          </td>
                          <td key={index} scope="col">
                            {reporte.fechaIngreso}
                          </td>
                          <td key={index} scope="col">
                          <Link to="/EditarRov" >editar</Link>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
          <div className="d-flex  justify-content-center">
            <button className="btn btn-danger" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdm;
