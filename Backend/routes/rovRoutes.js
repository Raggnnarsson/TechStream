// routes.js

const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Ruta para crear un nuevo reporte
router.post('/', (req, res) => {
  const { serialRov, tipoEstado } = req.body; // Suponiendo que recibes estos datos en la solicitud

  // Verifica que todos los campos requeridos estén presentes
  if (!serialRov || !tipoEstado) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Crea la consulta SQL para insertar un nuevo reporte
  const sql = `
    INSERT INTO rov (serialRov, tipoEstado)
    VALUES (?, ?);`;

  const values = [serialRov, tipoEstado];

  con.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al crear el rov:', error);
      return res.status(500).json({ error: 'Error al crear el rov' });
    }

    console.log('Rov se ha creado con éxito');
    res.status(201).json({ message: 'Rov se ha creado con éxito' });
  });
});

module.exports = router;