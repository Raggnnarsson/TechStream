// routes.js

const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Ruta para crear un nuevo reporte
router.post('/', (req, res) => {
  const { serialRov } = req.body; 

  // Verifica que todos los campos requeridos estén presentes
  if (!serialRov) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Llamar al Stored Procedure sp_CrearROV
  con.query('CALL sp_CrearROV(?, @resultado)', [serialRov], (error, results) => {
    if (error) {
      console.error('Error al verificar o crear el ROV:', error);
      return res.status(500).json({ error: 'Error al verificar o crear el ROV' });
    }

    // Recuperar el valor de _resultado
    con.query('SELECT @resultado', (error, results) => {
      if (error) {
        console.error('Error al recuperar el resultado:', error);
        return res.status(500).json({ error: 'Error al recuperar el resultado' });
      }

      const resultado = results[0]['@resultado'];
      if (resultado > 0) {
        return res.status(409).json({ error: 'Ya existe un ROV con este serialRov' });
      }

      console.log('ROV se ha creado con éxito');
      res.status(201).json({ message: 'ROV se ha creado con éxito' });
    });
  });
});


router.get('/', (req, res) => {
  con.query('CALL sp_ObtenerTodosLosROV()', (err, resultados) => {
    if (err) {
      console.error('Error al obtener elementos de la tabla:', err);
      res.status(500).json({ error: 'Error al obtener elementos de la tabla' });
      return;
    }
    // Los resultados pueden venir en un array de arrays si hay múltiples conjuntos de resultados, seleccionamos el primer conjunto.
    res.json(resultados[0]);
  });
});


router.get('/obtenerid/:serialRov', (req, res) => {
  const { serialRov } = req.params;

  con.query('CALL sp_ObtenerIdPorSerialRov(?)', [serialRov], (err, resultados, fields) => {
    if (err) {
      console.error('Error al obtener idRov de la tabla:', err);
      res.status(500).json({ error: 'Error al obtener idRov de la tabla' });
      return;
    }
    if (resultados[0].length === 0) {
      console.log("No se encontró ningún idRov para el serialRov proporcionado");
      res.status(404).json({ error: 'No se encontró ningún idRov para el serialRov proporcionado' });
      return;
    }
    const idRov = resultados[0][0].idRov;
    res.json({ idRov });
  });
});



module.exports = router;
