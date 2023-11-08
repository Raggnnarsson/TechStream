import { useState,useEffect } from "react";
import "./AddRov.css";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

export default function AddPilot() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [formValues, setFormValues] = useState({nombre:""});
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  //nombre:ID CONTRASEÑA:
  async function handleSubmit(e) {
    if(formValues.nombre===""){
      alert("Ingrese un nombre")
      return;
    }
    e.preventDefault();
    try {
      const responseCrearPilot = await axios.post(
        "http://localhost:3000/piloto/crearPiloto",
        formValues
      );
      alert("Piloto creado")
      navigate("/pilots")
    } catch (err) {
      if(err.response.status===409){
        alert("Piloto ya existe")
      }
      console.log(err.response);
    }
    
  }
  useEffect(()=>{
    if(auth().nombre === "Taller"){
        navigate("/")
    }
  },[])
  return (
    <><Navbar />
    <div className="containergeneraladd">
      <div className="container-addRov">
        <div className="card">
          <div className="card-body">
            <div className="label">
              <h2 className="text-wrapper text-center">Agregar Piloto</h2>
            </div>
            <Form>
              <Form.Group className="">
                <h4 className="text-wrapper text-center">
                  Ingrese nombre del piloto
                </h4>
                <Form.Control
                  className="input"
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChangeInput}
                  placeholder="Ejemplo: Matías Vargas"
                />
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
