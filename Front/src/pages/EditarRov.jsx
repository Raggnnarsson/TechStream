import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "../components/Navbar";
import Particle from "../components/Particle";
import "./EditarRov.css";


function EditarRov(props) {
  const [reporte, setReporte] = useState([]);
  const [datos, setDatos] = useState([]);
  const [salmoneras, setSalmoneras] = useState([]);
  const [rovs, setRovs] = useState([]);
  const [pilotos, setPilotos] = useState([]);

  const handleCancelarClick = () => {
    // Redirigir al usuario a la página de inicio
    window.location.href = "/admin";
  };
  //estado donde se guarda si los reportes de los reportes se cargaron o no
  const idReporte = props.idReporte;
  async function setData(idReporte) {
    const response = await axios.put(
      `http://localhost:3000/reportes/editarReporte/${idReporte}`,
      datos
    );
    setReporte(response.data);
  }
  async function getRovs() {
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
        <Particle />
        <div className="position-absolute z-index-1000">
        <h2>Seleccione Rov</h2>
        <Form.Group className="">
          <Form.Select name="tipoEstado" value="">
            {rovs.map((rov, index) => (
              <option key={index} value={rov.idRov}>
                {rov.idRov}{" "}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <h2>Seleccione Centro</h2>
        <Form.Group className="">
          <Form.Select name="centro" value="">
            {salmoneras.map((salmonera, index) => (
              <option key={index} value={salmonera.nombreSalmonera}>
                {salmonera.nombreSalmonera}{" "}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <h2>Seleccione Piloto</h2>
        <Form.Group className="">
          <Form.Select name="piloto" value="">
            {pilotos.map((piloto, index) => (
              <option key={index} value={piloto.nombre}>
                {piloto.nombre}{" "}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="comentario-container">
          <h2>Comentario Piloto</h2>
          <InputGroup>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>

          <h2>Comentario Taller</h2>
          <InputGroup>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>
        </div>
        <div className="buttons-container">
        <button className="btn btn-primary">Guardar</button>
        <button className="btn btn-danger" onClick={handleCancelarClick}>
          Cancelar
        </button>
      </div>
      </div>
      <footer className="footer"></footer>
    </div>
    </div>
  );
}

export default EditarRov;
