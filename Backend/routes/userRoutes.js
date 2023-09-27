const express = require('express');
const router = express.Router();
const con = require("../dbConnection");
const jwt = require('jsonwebtoken');

// Define rutas para productos
router.post("/", (req, res) => {
  const { nombre, pass } = req.body;
  //

  // Consulta SQL para verificar las credenciales del usuario
  const sql =
    "SELECT idAdmin, nombre FROM administrador WHERE nombre = ? AND pass = ?";
  con.query(sql, [nombre, pass], (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res
        .status(500)
        .json({ error: "Error de conexión con la base de datos" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const user = results[0];

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, nombre: user.nombre }, "asjidsaj", {
      expiresIn: "1h", // JWT válido por 1 hora
    });

    res.json({ token });
  });
});


module.exports = router;