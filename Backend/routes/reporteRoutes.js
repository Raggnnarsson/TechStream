const express = require('express');
const router = express.Router();
const con = require("../dbConnection");
// Define rutas para productos
router.get('/reporteActivo', (req, res) => {
  con.query('CALL sp_ObtenerReportesActivos()', (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error al cargar datos" });
    }
    res.json(results[0]);
  });
});
router.get("/", (req, res) => {
  con.query('CALL sp_ObtenerTodosLosReportes()', (error, results, fields) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error al cargar datos" });
    }

    res.json(results[0]);
  });
});
  router.get("/datosReporte/:idReporte", (req, res) => {
    const idReporte = req.params.idReporte;
    con.query('CALL sp_ObtenerDatosReporte(?)', [idReporte], (error, results, fields) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error al cargar datos" });
        }

        // El resultado generalmente viene en un arreglo de arreglos, seleccionamos el primero.
        res.json(results[0]);
    });
});
router.get("/:id",(req, res)=>{
  const elementoId = req.params.id;
  const sql = `SELECT * FROM Reportes WHERE idReporte = ${elementoId}`;
con.query(sql, (error, results) => {
  if (error) {
    console.error("Error en la consulta:", error);
    return res.status(500).json({ error: "Error al cargar datos" });
  }

  res.json(results);
});
});
router.get("/datosReportes/:idRov", (req, res) => {
  const idRov = parseInt(req.params.idRov, 10);
  con.query('CALL sp_ObtenerDatosReportesPorRov(?)', [idRov], (error, results) => {
      if (error) {
          console.error("Error en la consulta:", error);
          return res.status(500).json({ error: "Error al cargar datos" });
      }

      // Los resultados pueden venir en un array de arrays, seleccionamos el primer array.
      res.json(results[0]);
  });
});
router.put('/editarReporte/:id', (req, res) => {
  const idReporte = parseInt(req.params.id);
  console.log(idReporte)
  const { idRov, idPiloto, idSalmonera, fechaIngreso, comentarioPiloto, comentarioTaller, tipoEstado, reporteActivo } = req.body;

  con.query('CALL sp_EditarReporte(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [idReporte, idRov, idPiloto, idSalmonera, fechaIngreso, comentarioPiloto, comentarioTaller, tipoEstado, reporteActivo], 
    (err, result) => {
      if (err) {
        console.error('Error al editar los atributos del reporte:', err);
        return res.status(500).json({ error: 'Error al editar los atributos del reporte' });
      }
      console.log(`Atributos del reporte con ID ${idReporte} editados correctamente`);
      res.json({ mensaje: `Atributos del reporte con ID ${idReporte} editados correctamente` });
  });
});

//Reportes finalizados

router.post('/crearReporte', (req, res) => {
  const { idSalmonera, idRov, tipoEstado, idPiloto, comentarioPiloto, comentarioTaller, fechaIngreso } = req.body;

  // Aquí debes asegurarte de que los datos recibidos son los esperados y están en el formato correcto antes de pasarlos al Stored Procedure.
  
  con.query('CALL sp_CrearReporte(?, ?, ?, ?, ?, ?, ?)', 
    [idSalmonera, idRov, tipoEstado, idPiloto, comentarioPiloto, comentarioTaller, fechaIngreso], 
    (err, results) => {
      if (err) {
        console.error('Error al insertar el reporte:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      console.log('Reporte creado con éxito.');
      // Podrías querer devolver el ID del reporte creado, si tu Stored Procedure está configurado para hacerlo.
      res.status(201).json({ mensaje: 'Reporte creado con éxito.', idReporteCreado: results.insertId });
  });
});


module.exports = router;