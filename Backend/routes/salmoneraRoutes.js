// routes.js

const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Ruta para crear un nuevo reporte
router.get('/', (req, res) => {
  // Consulta SQL para obtener todos los elementos de la tabla
  const sql = 'SELECT * FROM salmonera';

  // Ejecutar la consulta SQL
  con.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener elementos de la tabla:', err);
      res.status(500).json({ error: 'Error al obtener elementos de la tabla' });
      return;
    }
    res.json(resultados);
  });
});

module.exports = router;
