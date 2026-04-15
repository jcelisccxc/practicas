const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta inico
app.get('/', (req, res) => {
    res.send('Inicio');
});

// Ruta bienevenido
app.get('/bienvenido', (req, res) => {
    res.send('Hola, bienvenido a tu sistema de Node');
});

//Ruta acerca de
app.get('/about', (req, res) => {
    res.send('Éste es un espacio acerca del sistema');
});

//Ruta contacto
app.get('/contact', (req, res) => {
    res.send('Ésta es la ruta para mi contacto');
});

//Ruta Login
app.get('/login', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
        <label for="email">Correo Electronico:</label>
        <input type="email">
        <label for="password">Contraseña:</label>
        <input type="password">    
        <button type="submit">Ingresar</button>
        </form>
    `);
});

//Ruta post Login
app.post('/login', (req, res) => {
    res.send('login exitoso');
});


//Ruta Registro practicante
app.get('/practicante', (req, res) => {
    res.send(`
        <html>
        <head>
        <title>Formulario Registro Practicante</title>
        <body>
        <h1>Registro Practicante</h1>
        <form method="POST" action="/practicante">
        <label>Nombre</label>
        <input type="text" name="nombre" required><br>
        
        <label>Edad</label>
        <input type="number" name="edad" required><br>

        <label>Instituto</label>
        <input type="text" name="instituto" required><br>
        <br>
        <button type="submit">Registrar</button>
        </form>
        </body>
        </html>   
    `);
});

//Ruta Post Practicante
app.post('/practicante', (req, res) => {
    const { nombre, edad, instituto } = req.body;

    if (!nombre || !edad || !instituto) {
        return res.send("Todos los campos son obligatorios");
    }

    if(edad <= 0 ) {
        return res.send("La edad debe ser mayor a 0");
    }
    res.send(`
        <html>
        <body>
        <h2>Registro Exitoso</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Instituto:</strong> ${instituto}</p>
        
        <a href="/practicante">Volver</a>
        </body>
        <html>       
        `);
});




// Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});