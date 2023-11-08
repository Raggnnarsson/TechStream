import { motion } from "framer-motion";
import {useMyContext} from "../context/reportesContext";
function Tabla() {
const {reportes} = useMyContext();
console.log(reportes)

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
                    </tr>
                  </thead>
                  <tbody>
                    {reportes &&
                    reportes.map((reporte) =>(
                        <>
                          <tr>
                            <td scope="col">
                              {reporte.serialRov}
                            </td>
                            <td scope="col">
                              {reporte.tipoEstado}
                            </td>
                            <td  scope="col">
                              {reporte.nombreSalmonera}
                            </td>
                            <td scope="col">
                              {reporte.nombre}
                            </td>
                            <td  scope="col">
                              {reporte.fechaIngreso}
                            </td>
                          </tr>
                        </>
                      )
                    )}
                  </tbody>
                </table> 
              </div>
            </motion.div>
    </>
  )
}

export default Tabla