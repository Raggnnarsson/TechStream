const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const reportesRoutes = require('./routes/reporteRoutes');
const rovRoutes = require('./routes/rovRoutes');
const salmoneraRoutes = require("./routes/salmoneraRoutes")
const pilotoRoutes = require("./routes/pilotoRoutes")
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto al puerto que desees
  })
);
app.use(express.json());
app.use('/login', userRoutes);
app.use("/salmonera",salmoneraRoutes);
app.use('/reportes', reportesRoutes);
app.use('/crearRov', rovRoutes);
app.use("/piloto",pilotoRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
