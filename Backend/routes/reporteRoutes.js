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


module.exports = router;