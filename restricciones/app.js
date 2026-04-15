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



//Parametro estrictos






const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});