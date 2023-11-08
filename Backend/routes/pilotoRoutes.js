// routes.js

const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Ruta para crear un nuevo reporte
router.get('/', (req, res) => {
  con.query('CALL sp_ObtenerTodosLosPilotos()', (err, resultados) => {
    if (err) {
      console.error('Error al obtener elementos de la tabla:', err);
      res.status(500).json({ error: 'Error al obtener elementos de la tabla' });
      return;
    }
    // Los resultados pueden venir en un array de arrays, seleccionamos el primer array.
    res.json(resultados[0]);
  });
});


// Ruta para crear un piloto
router.post('/crearPiloto', (req, res) => {
  const { nombre } = req.body;

  // Verificar si el nombre del piloto se proporciona en el cuerpo de la solicitud
  if (!nombre) {
    res.status(400).send('Nombre del piloto es obligatorio.');
    return;
  }

  // Llamar al Stored Procedure sp_CrearOActualizarPiloto
  con.query('CALL sp_CrearOActualizarPiloto(?)', [nombre.toUpperCase()], (err, results) => {
    if (err) {
      console.error('Error al buscar o insertar el piloto: ' + err.message);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Comprobar si se actualizó o insertó un piloto, y responder adecuadamente
    if (results.affectedRows > 0) {
      res.status(200).send('Piloto creado o actualizado con éxito.');
    } else {
      res.status(200).send('No se realizaron cambios en la base de datos.');
    }
  });
});


router.delete('/eliminarPiloto/:idPiloto', (req, res) => {
  const idPiloto = parseInt(req.params.idPiloto);

  // Verificar que el idPiloto es un número entero válido
  if (!Number.isInteger(idPiloto)) {
    return res.status(400).json({ error: 'El ID del piloto debe ser un número entero válido.' });
  }

  // Llamar al Stored Procedure sp_EliminarPiloto
  con.query('CALL sp_EliminarPiloto(?)', [idPiloto], (error, result) => {
    if (error) {
      console.error('Error al eliminar el piloto:', error);
      return res.status(500).json({ error: 'Error interno del servidor al eliminar el piloto.' });
    }

    // Verificar si se encontró y eliminó el piloto
    if (result.affectedRows > 0) {
      console.log('Piloto eliminado con éxito.');
      return res.status(200).json({ message: 'Piloto eliminado con éxito.' });
    } else {
      return res.status(404).json({ error: 'No se encontró ningún piloto con el ID proporcionado.' });
    }
  });
});

router.put('/editarPiloto/:id', (req, res) => {
  const pilotoId = parseInt(req.params.id);
  const { nombre, apellido, isActive } = req.body; // Asume que estos son los campos que el usuario puede editar

  // Llamar al Stored Procedure sp_EditarPiloto
  con.query('CALL sp_EditarPiloto(?, ?, ?, ?)', 
    [pilotoId, nombre || null, apellido || null, isActive != null ? isActive : null], 
    (err, result) => {
      if (err) {
        console.error('Error al editar los atributos del piloto:', err);
        res.status(500).json({ error: 'Error al editar los atributos del piloto' });
        return;
      }
      console.log(`Atributos del piloto con ID ${pilotoId} editados correctamente`);
      res.json({ mensaje: `Atributos del piloto con ID ${pilotoId} editados correctamente` });
  });
});


module.exports = router;
