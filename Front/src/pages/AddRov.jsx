import { useState } from "react";
import "./AddRov.css";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function AddRov() {
  const [formValues, setFormValues] = useState({
    serialRov: "",
    tipoEstado: "Disponible",
  });
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  //nombre:ID CONTRASEÑA:
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/crearRov",
        formValues
      );
      console.log("rov creado");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(formValues);
  return (
    <div className="containergeneraladd">
      <Navbar />
      <div className="container-addRov">
        <div className="card">
          <div className="card-body">
            <div className="label">
              <h2 className="text-wrapper text-center">Agregar Rov</h2>
            </div>
            <Form>
              <Form.Group className="">
                <h4 className="text-wrapper text-center">
                  Ingrese serial del rov
                </h4>
                <Form.Control
                  className="input"
                  type="text"
                  name="serialRov"
                  value={formValues.serialRov}
                  onChange={handleChangeInput}
                  placeholder="Ejemplo: 001"
                />
              </Form.Group>

              <h4 className="text-wrapper pt-2">Tipo de estado</h4>

              <Form.Group className="">
                <Form.Select
                  name="tipoEstado"
                  value={formValues.tipoEstado}
                  onChange={handleChangeInput}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En mantención">En mantención</option>
                  <option value="En baja">En baja</option>
                  <option value="Pendiente">Pendiente</option>
                </Form.Select>
              </Form.Group>
              <div className="button pt-4">
                <Button variant="primary" onClick={handleSubmit}>
                  Agregar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
