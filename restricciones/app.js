const express = require('express');
const app = express();
app.use(express.json());

// Ruta para productos
app.get('/productos', (req, res) => {
  res.send('Vista de todos los productos');
});

// Ruta para producto especifico
app.get('/productos/:slug', (req, res) => {
  const slug = req.params.slug;
  res.send(`Producto: ${slug}`);
});

/* no se puede hacer captura de todos los productos con una sola funcion en Node
ya que el ? no sirve o el Regex en node ya no se utiliza,
la idea es que en laravel si se puede traer datos o agrupar con ? */



//restricciones
//usuario  (toca hacer condicion para poder hacer restriccion en Node)

app.param('id', (req, res, next, id) => {
    if (/^\d+$/.test(id)) {
        next();
    } else {
        res.status(400).send('Error: El ID debe ser numérico');
    }
});

app.get('/user/:id', (req, res) => {
    res.send(`ID de usuario validado: ${req.params.id}`);
});

//Mapamundi
app.param('municipio', (req, res, next, municipio) => {
    if (/^[a-zA-Z]+$/.test(municipio)) {
        next();
    } else {
        res.status(400).send('Error: El Municipio solo debe contener letras')
    }
});

app.get('/tierra/:pais/:municipio', (req, res) => {
    res.send(`El Municipio indicado es: ${req.params.municipio}`);
});


//Productos
app.param('nombre', (req, res, next, nombre) => {
    if (/^[a-zA-Z]+$/.test(nombre)) {
        next();
    } else {
        res.status(400).send(`Error: El Nombre solo debe contener letras...`)
    }
});

app.get('/producto/:nombre', (req, res) => {
    res.send(`Tu producto seleccionado es: ${req.params.nombre}`); 
});

//SISTEMA MODULAR "PREFIJOS" "TIENDA"
const tiendaRouter = express.Router();

tiendaRouter.get('/catalogo', (req, res) => {
    res.send('<h1>Catalogo</h1> <p>Producto1...</> <br> <p>Producto2...</> <p>Producto3...</> <p>Producto4...</>');
});

tiendaRouter.get('/articulo/:id', (req, res) => {
    const {id} = req.params;
    if (!/^\d+$/.test(id)) return res.status(400).send("ID invalido");
    res.send(`Detalle del articulo: ${id}`);
});

app.use('/tienda', tiendaRouter);

//SISTEMA CLASES
const clasesRouter = express.Router();

// Ruta: /clases/servicios
clasesRouter.get('/servicios', (req, res) => {
    res.send(`
        <h1>Clases Disponibles</h1>
        <ul>
            <li>Mañana</li>
            <li>Tarde</li>
            <li>Noche</li>
            <li>Sabatino</li>
        </ul>
    `);
});

// Ruta: /clases/horario/tipo
clasesRouter.get('/horario/:tipo', (req, res) => {
    const { tipo } = req.params;

    // sólo letras
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(tipo)) {
        return res.status(400).send("<h1>Error</h1><p>Los tipos de horario deben contener solo letras.</p>");
    }

    res.send(`<h1>Consulta de Horario</h1><p>El horario a consultar es: <strong>${tipo}</strong></p>`);
});

app.use('/clases', clasesRouter);



//PUERTO
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});