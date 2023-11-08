import { useState,useEffect } from "react";
import "./AddRov.css";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
export default function AddRov() {
  const navigate = useNavigate();
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
  const auth = useAuthUser();
  //nombre:ID CONTRASEÑA:
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(formValues.serialRov===""){
        alert("Ingrese un serial rov")
        return
      }
      const responseCrearRov = await axios.post(
        "http://localhost:3000/crearRov",
        formValues
      );
      const responseIdRov=await axios.get(`http://localhost:3000/crearRov/obtenerid/${formValues.serialRov}`)
      const responseCrearReporte= await axios.post("http://localhost:3000/reportes/crearReporte",{idPiloto : 1, idSalmonera : 1, idRov : responseIdRov.data.idRov, reporteActivo : true, tipoEstado : "Disponible"})
      alert("Rov Creado")
      navigate("/admin")
    } catch (err) {
      if(err.response.status===409){
        alert("Ingrese un rov que no este creado")
      }

    }
    
  }
  console.log(formValues);
  useEffect(()=>{
    if(auth().nombre === "Logística"){
        navigate("/")
    }
  },[])
  return (
    <>
    <Navbar />
    <div className="containergeneraladd">
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
                  placeholder="Ejemplo:1"
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
    </>
  );
}
