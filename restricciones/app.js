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





const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});