import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "../components/Navbar";
import "./EditarRov.css";

function EditarRov() {
  /*const [reporte, setReporte] = useState([]);
  const [datos, setDatos] = useState([]);*/
  const [salmoneras, setSalmoneras] = useState([]);
  const [rovs, setRovs] = useState([]);
  const [pilotos, setPilotos] = useState([]);
  const [selectedIdRov, setSelectedIdRov] = useState("");
  const [selectedCentro, setSelectedCentro] = useState("");
  const [selectedPiloto, setSelectedPiloto] = useState("");

  

  const handleGuardarClick = async () => {
    // Capturar los valores de los comentarios
    const comentarioPiloto = document.querySelector("#comentarioPiloto").value;
    const comentarioTaller = document.querySelector("#comentarioTaller").value;

    // Crear un objeto con los nuevos datos a enviar al servidor
    const nuevosDatos = {
      comentarioPiloto,
      comentarioTaller,
      centro: selectedCentro,
      piloto: selectedPiloto,
    };

    try {
      // Enviar una solicitud PUT para editar los datos en el servidor
      const response = await axios.put(
        `http://localhost:3000/reportes/editarReporte/${selectedIdRov}`,
        nuevosDatos
      );

      // Verificar si la edición fue exitosa
      if (response.status === 200) {
        console.log("Datos editados correctamente");
        // Puedes realizar alguna acción adicional aquí, como redirigir o mostrar un mensaje de éxito
      }
    } catch (error) {
      console.error("Error al editar los datos:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const handleIdRovChange = (e) => {
    setSelectedIdRov(e.target.value);
  };

  const handleCentroChange = (e) => {
    setSelectedCentro(e.target.value);
  };

  const handlePilotoChange = (e) => {
    setSelectedPiloto(e.target.value);
  };

  const handleCancelarClick = () => {
    // Redirigir al usuario a la página de inicio
    window.location.href = "/admin";
  };
  //estado donde se guarda si los reportes de los reportes se cargaron o no
  /*const idReportes = props.idReportes;
  async function setData(idReportes) {
    const response = await axios.put(
      `http://localhost:3000/reportes/editarReporte/${idReporte}`,
      datos
    );
    setReporte(response.data);
  }*/
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
        <div className="position-flex z-index-1000">
          <div className="card">
            <div className="card-body">
              <h2>Seleccione Rov</h2>
              <Form.Group className="">
                <Form.Select
                  name="idRov"
                  value={selectedIdRov}
                  onChange={handleIdRovChange}
                >
                  {rovs.map((rov, index) => (
                    <option key={index} value={rov.idRov}>
                      {rov.idRov}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <h2>Seleccione Centro</h2>
              <Form.Group className="">
                <Form.Select
                  name="centro"
                  value={selectedCentro}
                  onChange={handleCentroChange}
                >
                  {salmoneras.map((salmonera, index) => (
                    <option key={index} value={salmonera.nombreSalmonera}>
                      {salmonera.nombreSalmonera}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <h2>Seleccione Piloto</h2>
              <Form.Group className="">
                <Form.Select
                  name="piloto"
                  value={selectedPiloto}
                  onChange={handlePilotoChange}
                >
                  {pilotos.map((piloto, index) => (
                    <option key={index} value={piloto.nombre}>
                      {piloto.nombre}
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
                <button
                  className="btn btn-primary"
                  onClick={handleGuardarClick}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancelarClick}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default EditarRov;
