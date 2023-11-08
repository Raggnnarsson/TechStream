// routes.js

const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Ruta para crear un nuevo reporte
router.get('/', (req, res) => {
  con.query('CALL sp_ObtenerTodasLasSalmoneras()', (err, resultados) => {
    if (err) {
      console.error('Error al obtener elementos de la tabla:', err);
      res.status(500).json({ error: 'Error al obtener elementos de la tabla' });
      return;
    }
    res.json(resultados[0]);
  });
});

router.post('/crearSalmonera', (req, res) => {
  const { nombreSalmonera } = req.body;

  // Verificar si el nombre de la salmonera se proporciona en el cuerpo de la solicitud
  if (!nombreSalmonera) {
    return res.status(400).send('Nombre de la salmonera es obligatorio.');
  }

  // Llamar al Stored Procedure sp_CrearOActualizarSalmonera
  con.query('CALL sp_CrearOActualizarSalmonera(?, @idSalmonera)', [nombreSalmonera.toUpperCase()], (err, results) => {
    if (err) {
      console.error('Error al buscar o insertar la salmonera:', err.message);
      return res.status(500).send('Error interno del servidor');
    }

    // Obtener el ID de la salmonera creada o actualizada
    con.query('SELECT @idSalmonera AS idSalmonera', (err, results) => {
      if (err) {
        console.error('Error al obtener el ID de la salmonera:', err.message);
        return res.status(500).send('Error interno del servidor');
      }
      
      const idSalmoneraCreada = results[0].idSalmonera;
      if (idSalmoneraCreada) {
        console.log('Salmonera creada o actualizada con éxito.');
        return res.status(201).send({
          mensaje: 'Salmonera creada o actualizada con éxito.',
          idSalmoneraCreada: idSalmoneraCreada
        });
      } else {
        return res.status(409).send('Salmonera ya existe y está activa.');
      }
    });
  });
});



router.delete('/eliminarSalmonera/:idSalmonera', (req, res) => {
  const idSalmonera = parseInt(req.params.idSalmonera);

  // Verificar que el idSalmonera es un número entero válido
  if (!Number.isInteger(idSalmonera)) {
    return res.status(400).json({ error: 'El ID de la salmonera debe ser un número entero válido.' });
  }

  // Llamar al Stored Procedure sp_EliminarSalmonera
  con.query('CALL sp_EliminarSalmonera(?)', [idSalmonera], (error, result) => {
    if (error) {
      console.error('Error al eliminar la salmonera:', error);
      return res.status(500).json({ error: 'Error interno del servidor al eliminar la salmonera.' });
    }

    // Verificar si se encontró y eliminó la salmonera
    if (result.affectedRows > 0) {
      console.log('Salmonera eliminada con éxito.');
      return res.status(200).json({ message: 'Salmonera eliminada con éxito.' });
    } else {
      return res.status(404).json({ error: 'No se encontró ninguna salmonera con el ID proporcionado.' });
    }
  });
});

router.put('/editarSalmonera/:id', (req, res) => {
  const salmoneraId = parseInt(req.params.id);
  const { nombreSalmonera, isActive } = req.body; // Extiende esto según los campos que tengas

  // Asegúrate de que los nombres de los campos en req.body coincidan con los nombres de los parámetros del Stored Procedure.
  con.query('CALL sp_EditarSalmonera(?, ?, ?)', [salmoneraId, nombreSalmonera, isActive], (err, result) => {
    if (err) {
      console.error('Error al editar los atributos de la salmonera:', err);
      return res.status(500).json({ error: 'Error al editar los atributos de la salmonera' });
    }
    // El manejo de la respuesta debe estar basado en los resultados de la llamada al Stored Procedure.
    if (result.affectedRows > 0) {
      console.log(`Atributos de la salmonera con ID ${salmoneraId} editados correctamente`);
      res.json({ mensaje: `Atributos de la salmonera con ID ${salmoneraId} editados correctamente` });
    } else {
      res.status(404).json({ error: 'No se encontró ninguna salmonera con el ID proporcionado para editar.' });
    }
  });
});



module.exports = router;
