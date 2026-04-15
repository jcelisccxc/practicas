const express = require('express');
const app = express();
app.use(express.json());

//Parámetro requerido producto
app.get('/product/:nombre', (req, res) => {
    res.send(`Leyendo informacion del producto: ${req.params.nombre}`)
});

//parametros multiples "articulo"
app.get('/tienda/:categoria/:articulo', (req, res) => {
    const { tienda, categoria, articulo} = req.params;
    res.send(`
        <h1>Catalogo de la Tienda</h1>
        <p>Estas en la Categoria de: <strong>${categoria}</strong></p>
        <p>Tu producto es: <strong>${articulo}</strong></p>
        <hr>

        <a href="/product/nombre">Ir a Productos</a>
        `);
});

//parametros multiples "Mapamundi"
app.get('/tierra/:pais/:departamento/:ciudad', (req, res) => {
    const { tierra, pais, departamento, ciudad} = req.params;
    res.send(`
        <h1>Tu Mapamundi</h1>
        <p>Tu Pais Seleccionado es: <strong>${pais}</strong></p>
        <p>Estas en la departamento de: <strong>${departamento}</strong></p>
        <p>Tu ciudad es: <strong>${ciudad}</strong></p>
        `);
});

//Parámetro requerido usuarios
app.get('/user/:id',  (req, res) => {
    res.send(`Leyendo datos del usuario con ID: ${req.params.id}`)
});


//parámetro opcionales
app.get('/:category/:slug', (req, res) => {
    const { category, slug} = req.params;
    res.send(`Categoria: ${category} | Post ${slug}`);
});



//parametros multiples
app.get('/tienda/:categoria/:articulo', (req, res) => {
    const { tienda, categoria, articulo} = req.params;
    res.send(`
        <h1>Catalogo de la Tienda</h1>
        <p>Estas en la Categoria de: <strong>${categoria}</strong></p>
        <p>Tu producto es: <strong>${articulo}</strong></p>
        <hr>

        <a href="user/1">Ir a mi perfil</a>
        `);
});





const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});