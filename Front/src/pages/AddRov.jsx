import React from 'react'
import "./AddRov.css"
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
export default function AddRov() {
  return (
    <div className="index">
      <Navbar/>
    <div className="div">
<Form.Control className="input" placeholder="Ejemplo: 001" />
      <div className="text-wrapper">Agregar id rov</div>
      <p className="p">Elija un tipo de estado</p>
      <button className="button">
        <button className="button-2">Agregar</button>
      </button>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>


  </div>
  )
}