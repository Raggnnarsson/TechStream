import { useState,useEffect}  from "react";
import "./AddRov.css";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
export default function AddCentro() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [formValues, setFormValues] = useState({nombreSalmonera:""});
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
      if(formValues.nombreSalmonera===""){
        alert("Ingrese nombre del centro")
        return;
      }
        
      const responseCrearCentro= await axios.post(
        "http://localhost:3000/salmonera/crearSalmonera",
        formValues
      );
      alert("Centro creado")
      navigate("/Centros")
    } catch (err) {
      if(err.response.status===409){
        alert("Centro ya existe")
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
              <h2 className="text-wrapper text-center">Agregar Centro</h2>
            </div>
            <Form>
              <Form.Group className="">
                <h4 className="text-wrapper text-center">
                  Ingrese nombre del centro
                </h4>
                <Form.Control
                  className="input"
                  type="text"
                  name="nombreSalmonera"
                  value={formValues.nombreSalmonera}
                  onChange={handleChangeInput}
                  placeholder="Ejemplo: Camanchaca"
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
