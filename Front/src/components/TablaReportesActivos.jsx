import { motion } from "framer-motion";
import axios from "axios";
import { useMyContext } from "../context/reportesContext";
function TablaReportesActivos(props) {
  const {
    setClickVerMas,
    reportesActivos,
    setReporte,
    idReporte,
    setidReporte,
    clickReporte,
    setClickReporte,
    reportes,
    setReportes,
    tablaReportes,
    setTablaReportes,
    serialRov,setSerialRov,
    setIdRov,
  } = useMyContext();
  const tipoEstado = props.tipoEstado;
  console.log(reportesActivos);

  async function getReporte() {
    const response = await axios.get(
      `http://localhost:3000/reportes/${idReporte}`
    );
    setReporte(response.data);
  }
  return (
    <>
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
          <table className="table table-dark table-bordered mx-auto">
            <thead>
              <tr>
                <th scope="col">Id ROV</th>
                <th scope="col">Estado del rov</th>
                <th scope="col">Ubicación</th>
                <th scope="col">Piloto</th>
                <th scope="col">Fecha de modificación</th>
                <th scope="col">Editar</th>
                <th scope="col">Ver Detalles</th>
              </tr>
            </thead>
            <tbody>
              {reportesActivos &&
                reportesActivos.map((reporte) =>
                  reporte.tipoEstado == tipoEstado ? (
                    <>
                      <tr>
                        <td scope="col">
                          {reporte.serialRov}
                        </td>
                        <td scope="col">
                          {reporte.tipoEstado}
                        </td>
                        <td scope="col">
                          {reporte.nombreSalmonera}
                        </td>
                        <td  scope="col">
                          {reporte.nombre}
                        </td>
                        <td scope="col">
                          {(reporte.fechaIngreso) ? new Date(reporte.fechaIngreso).toISOString().split("T")[0]:"Sin Asignar"}
                          
                        </td>
                        <td scope="col">
                          <button
                            onClick={() => {
                              getReporte();
                              setidReporte(reporte.idReporte);
                              setClickReporte(true);
                              setIdRov(reporte.idRov);
                              setSerialRov(reporte.serialRov)
                            }}
                          >
                            editar
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button
                            onClick={() => {
                              getReporte();
                              setidReporte(reporte.idReporte);
                              setClickVerMas(true);
                              setIdRov(reporte.idRov);
                              setSerialRov(reporte.serialRov)
                            }}
                          >
                            detalles
                          </button>
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
    </>
  );
}

export default TablaReportesActivos;
