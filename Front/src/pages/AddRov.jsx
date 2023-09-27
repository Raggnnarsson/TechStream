import {useState} from 'react'
import "./AddRov.css"
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';

import Button from 'react-bootstrap/Button';
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

    // Resetea el estado de error cuando el usuario cambia la contraseña
  
  }
   //nombre:ID CONTRASEÑA:
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://localhost:3000/crearRov",
        formValues
      );
      console.log("rov creado")
    }
    catch(err){
      console.log(err)
    }
  }
  console.log(formValues)
  return (
    <div className="container-addRov">
      <Navbar/>
      <div className="label">
      <h2 className="text-wrapper">Agregar id rov</h2>
    </div>
    <div className="div">
      <Form.Control  className="input"           type="text"
          name="serialRov"
          value={formValues.serialRov}
          onChange={handleChangeInput} placeholder="Ejemplo: 001" />
    </div>

          <h2 className="text-wrapper">Elija un tipo de estado</h2>

        <Form.Group className=''>
        <Form.Select
          name="tipoEstado"
          value={formValues.tipoEstado}
          onChange={handleChangeInput}>
        <option value="Disponible">Disponible</option>

        <option value="En mantención">En mantención</option>

        <option value="En mantención">En baja</option>

        <option value="En mantención">Pendiente</option>
        </Form.Select>
      </Form.Group>


        <Button variant="primary" onClick={handleSubmit}>Agregar</Button>
    </div>
  )
}