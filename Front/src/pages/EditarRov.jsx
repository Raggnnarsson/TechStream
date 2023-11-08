import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "../components/Navbar";
import "./EditarRov.css";
import { useMyContext } from "../context/reportesContext";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
function EditarRov(props) {
  const {
    reporte,
    setReporte,
    idReporte,
    setReportesActivos,
    setTablaReportesActivos,
    setClickReporte,
    reportes,
    setReportes,
    serialRov,
    idRov,
  } = useMyContext();
  const [salmoneras, setSalmoneras] = useState([]);
  const [rovs, setRovs] = useState([]);
  const [pilotos, setPilotos] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [result, setResult] = useState("");
  const tipoEstado = [
    "Disponible",
    "En Mantención",
    "Pendiente",
    "En planta",
    "De baja",
  ];
  const auth = useAuthUser();
  const navigate = useNavigate();
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  }
  async function getData() {
    const response = await axios.get(
      "http://localhost:3000/reportes/reporteActivo"
    );
    console.log(response.data);
    setReportesActivos(response.data);
    setTablaReportesActivos(response.data);
  }
  const handleGuardarClick = async () => {
    try {
      // Enviar una solicitud PUT para editar los datos en el servidor
      console.log(formValues);
      const responseCrearReporte = await axios.post(
        "http://localhost:3000/reportes/crearReporte",
        { ...formValues, idRov: idRov }
      );
      const responseCambiarReporte = await axios.put(
        `http://localhost:3000/reportes/editarReporte/${idReporte}/`,
        { reporteActivo: false }
      );
      // Verificar si la edición fue exitosa
      if (
        responseCrearReporte.status === 201 &&
        responseCambiarReporte.status === 200
      ) {
        setResult("Datos editados correctamente");
        alert("Reporte creado");
        setClickReporte(false);
        getData();
        // Puedes realizar alguna acción adicional aquí, como redirigir o mostrar un mensaje de éxito
      }
    } catch (error) {
      setResult("Error al editar los datos");
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const handleCancelarClick = () => {
    // Redirigir al usuario a la página de inicio
    window.location.href = "/admin";
  };
  async function getRovs() {
    console.log(idReporte);
    const response = await axios.get("http://localhost:3000/crearRov");
    setRovs(response.data);
    const responseSalmonera = await axios.get(
      "http://localhost:3000/salmonera"
    );
    setSalmoneras(responseSalmonera.data);
    const responsePiloto = await axios.get("http://localhost:3000/piloto");
    setPilotos(responsePiloto.data);
  }
  useEffect(() => {
    getRovs();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="containergeneraladd">
        <div className="position-flex z-index-1000">
          <div className="card">
            <div className="card-body">
              <h2>ROV {serialRov}</h2>
              <h2>Estado</h2>
              <Form.Group className="">
                <Form.Select
                  name="tipoEstado"
                  value={reporte.tipoEstado}
                  onChange={handleChangeInput}
                >
                  <option value="">Seleccionar...</option>
                  {tipoEstado.map((estado, index) => (
                    <option key={index} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <h2>Seleccione Centro</h2>
              <Form.Group className="">
                <Form.Select name="idSalmonera" onChange={handleChangeInput}>
                  <option value="">Seleccionar...</option>
                  {formValues.tipoEstado === "Disponible" ? (
                    // Si el tipo de estado es "Disponible", muestra opciones del taller
                    <>
                      <option value={1}>Bodega Taller</option>
                      <option value={2}>Bodega Transitoria</option>
                    </>
                  ) : formValues.tipoEstado === "En Mantención" ? (
                    // Si el tipo de estado es "En Mantencion", muestra solo "Centro Taller"
                    <option value={3}>Taller</option>
                  ) : formValues.tipoEstado === "En planta" ? (
                    // Si el tipo de estado es "En Planta", muestra opciones desde el tercer elemento de salmoneras
                    salmoneras.slice(3).map((salmonera, index) => (
                      <option
                        key={index}
                        value={parseInt(salmonera.idSalmonera, 10)}
                      >
                        {salmonera.nombreSalmonera}
                      </option>
                    ))
                  ) : formValues.tipoEstado === "De baja" ? (
                    // Si el tipo de estado es "De Baja", muestra solo la opción "Bodega Taller"
                    <option value={1}>Bodega Taller</option>
                  ) : formValues.tipoEstado === "Pendiente" ? (
                    // Si el tipo de estado es "De Baja", muestra solo la opción "Bodega Taller"
                    <option value={3}>Taller</option>
                  ) : (
                    // Para cualquier otro tipo de estado, muestra opciones de salmoneras desde el primer elemento
                    salmoneras.map((salmonera, index) => (
                      <option
                        key={index}
                        value={parseInt(salmonera.idSalmonera, 10)}
                      >
                        {salmonera.nombreSalmonera}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>

              <h2>Seleccione Piloto</h2>
              <Form.Group className="">
                <Form.Select
                  name="idPiloto"
                  value={reporte.idPiloto}
                  onChange={handleChangeInput}
                >
                  <option value="">Seleccionar...</option>
                  {pilotos.map((piloto, index) => (
                    <option key={index} value={piloto.idPiloto}>
                      {piloto.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {auth().nombre === "Logística" ||
              auth().nombre === "Administrador" ? (
                <>
                  {" "}
                  <h2>Comentario Piloto</h2>
                  <Form.Group className="">
                    <Form.Control
                      name="comentarioPiloto"
                      value={formValues.comentarioPiloto}
                      onChange={handleChangeInput}
                      as="textarea"
                      aria-label="With textarea"
                    />
                  </Form.Group>
                </>
              ) : (
                <></>
              )}
              {auth().nombre == "Taller" || auth().nombre == "Administrador" ? (
                <>
                  {" "}
                  <h2>Comentario Taller</h2>
                  <Form.Group className="">
                    <Form.Control
                      name="comentarioTaller"
                      value={formValues.comentarioTaller}
                      onChange={handleChangeInput}
                      as="textarea"
                      aria-label="With textarea"
                    />
                  </Form.Group>
                </>
              ) : (
                <></>
              )}
            </div>
            <label form="start">Ingrese Fecha:</label>

            <input
              type="date"
              id="start"
              name="fechaIngreso"
              value={formValues.fechaIngreso}
              onChange={handleChangeInput}
              min="2023-01-01"
              max="2030-12-31"
            />
            <div className="buttons-container">
              <button className="btn btn-primary" onClick={handleGuardarClick}>
                Guardar
              </button>
              <button className="btn btn-danger" onClick={handleCancelarClick}>
                Cancelar
              </button>
            </div>
            {result != "" ? (
              <>
                <h1>{result} </h1>{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default EditarRov;
