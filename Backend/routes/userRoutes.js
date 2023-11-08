const express = require('express');
const router = express.Router();
const con = require("../dbConnection");
const jwt = require('jsonwebtoken');

router.post("/", (req, res) => {
  const { nombre, pass } = req.body;

  con.query('CALL sp_VerificarCredencialesAdmin(?, ?)', [nombre, pass], (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error de conexión con la base de datos" });
    }

    // Aquí asumimos que la primera posición del array results contiene los resultados que nos interesan
    const adminResults = results[0];

    if (adminResults.length === 0) {
      return res.status(401).json({ message: "Nombre de usuario o contraseña incorrecta" });
    }

    const user = adminResults[0];

    // Genera un token JWT
    const token = jwt.sign({ id: user.idAdmin, nombre: user.nombre }, "your_secret_key", {
      expiresIn: "1h", // JWT válido por 1 hora
    });

    // Envía el token como respuesta
    res.json({ token: token });
  });
});

module.exports = router;
