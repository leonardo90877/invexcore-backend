const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración conexión MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // Cambia si tu usuario es otro
  password: "leoDANIEL2025",       // Cambia si tienes contraseña
  database: "invexcore" // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Ruta para recibir datos del formulario
app.post("/api/contacto", (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  const sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";
  db.query(sql, [nombre, correo, mensaje], (err, result) => {
    if (err) {
      console.error("Error al insertar datos:", err);
      res.status(500).send("Error al guardar los datos");
    } else {
      res.send("¡Datos guardados correctamente!");
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
