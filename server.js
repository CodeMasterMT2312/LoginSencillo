const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5002;

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "bk65jjbvyd1snwreiomm-mysql.services.clever-cloud.com",
    user: "usdaoqnsuoq5h8ds",
    password: "ynmp3UnopvbahqnMq99q",
    database: "bk65jjbvyd1snwreiomm",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL");
});

// Ruta para la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Ruta de autenticación
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt with", { username, password }); // Log de entrada

    const query = "SELECT * FROM Usuarios WHERE Email = ? AND pass = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err); // Log de error
            return res.status(500).send("Internal server error");
        }
        if (results.length > 0) {
            console.log("Successful login for:", username); // Log de éxito
            res.status(302).redirect('/menu.html'); // Redirige a menu.html si el login es exitoso
        } else {
            console.log("Failed login attempt for:", username); // Log de fallo
            res.status(400).send("Credenciales incorrectas"); // Enviar un error en caso de credenciales incorrectas
        }
    });
});


// Ruta para el menú
app.get("/menu.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "menu.html"));
});

// Inicia el servidor
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Manejo de cierre de servidor y conexión a la base de datos
process.on('SIGINT', () => {
    console.log("Cerrando el servidor y la base de datos...");
    db.end((err) => {
        if (err) {
            console.error("Error al cerrar la conexión a la base de datos:", err);
        }
        server.close(() => {
            console.log("Servidor cerrado.");
            process.exit(0);
        });
    });
});

module.exports = { server, db }; // Exporta el servidor y la conexión a la base de datos
