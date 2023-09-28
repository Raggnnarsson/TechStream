const express = require('express');
const router = express.Router();
const con = require("../dbConnection");

// Define rutas para productos
router.get("/", (req, res) => {
    const sql = `SELECT
      ROV.idRov,
      Rov.tipoEstado,
      Salmonera.nombreSalmonera,
      Salmonera.centro,
      Piloto.nombre,
      Reportes.fechaIngreso,
      Reportes.fechaSalida
  FROM
      ROV
  JOIN
      Reportes ON ROV.idRov = Reportes.idRov
  JOIN
      Salmonera ON Reportes.idSalmonera = Salmonera.idSalmonera
  JOIN
      Piloto ON Reportes.idPiloto = Piloto.idPiloto;`;
    con.query(sql, (error, results) => {
      if (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ error: "Error al cargar datos" });
      }
  
      res.json(results);
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
router.put('/editarReporte/:id', (req, res) => {
  const reporteId = req.params.id;
  const nuevosDatos = req.body; // Supongamos que quieres editar varios atributos

  // Construir la consulta SQL dinámica
  let sql = 'UPDATE Reportes SET ';
  const valores = [];

  for (const key in nuevosDatos) {
    if (nuevosDatos.hasOwnProperty(key)) {
      sql += `${key} = ?, `;
      valores.push(nuevosDatos[key]);
    }
  }

 
  sql = sql.slice(0, -2);
  sql += ' WHERE idRov = ?';
  valores.push(reporteId);

  // Realizar la actualización en la base de datos
  con.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Error al editar los atributos:', err);
      res.status(500).json({ error: 'Error al editar los atributos' });
      return;
    }
    console.log(`Atributos del reporte con ID ${reporteId} editados correctamente`);
    res.json({ mensaje: `Atributos del reporte con ID ${reporteId} editados correctamente` });
  });
});


module.exports = router;