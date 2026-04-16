<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// METODO GET
Route::get('/saludo', function () {
    return ('<h1>Hola a todos</h1>');
});
// METODO GET
Route::get('/productos', function () {
    return ('<h1>Nuestros productos</h1>
    <p>Arroz</p>
    <p>Café</p>
    <p>Aceite</p>
    <p>Panela</p>
    ');
});
// METODO GET
Route::get('/users', function () {
    return ('<h1>Nuestros Usuarios</h1>
    <p>SuperAdmin</p>
    <p>Admin</p>
    <p>Cliente</p>
    <p>Proveedor</p>
    ');
});


// METODO GET SUSCRIBIRSE
Route::get('/suscribirse', function () {
    return '
        <form action="/suscribirse" method="POST">
            ' . csrf_field() . '
            <input type="text" name="nombre" placeholder="Tu nombre">
            <input type="email" name="email" placeholder="Tu email">
            <button type="submit">Suscribirme</button>
        </form>
    ';
});

// METODO POST SUSCRIBIRSE
Route::post('/suscribirse', function (Request $request) {
    $nombre = $request->input('nombre');
    $email = $request->input('email');
    return "<h1>¡Gracias, $nombre!</h1><p>Hemos registrado tu correo: $email</p>";
});

// METODO GET LOGINPRUEBA
Route::get('/loginprueba', function () {
    return '
        <form action="/loginprueba" method="POST">
        ' . csrf_field() . '
            <h1>Login</h1>
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="contraseña" placeholder="Contraseña">
            
            <button type="submit">Iniciar Sesion</button>
        </form>
    ';
});
//METODO POST LOGINPRUEBA
Route::post('/loginprueba', function (Request $request) {
    $email = $request->input('email');
    $contraseña = $request->input('contraseña');
    return "<h1>Bienvenido a tu panel</h1>";
});


//METODO GET TIENDA
Route::get('/compras', function () {
    return '
        <form action="/tienda" method="POST">
        ' . csrf_field() . '
            <h1>Compras</h1>
            <p>Elige tu producto</p>
                <select name="productos">
                    <option value="camisa">Camisa</option>
                    <option value="pantalon">Pantalón</option>
                    <option value="zapatos">Zapatos</option>
                 </select>
            
            <button type="submit">Comprar</button>
        </form>
    ';
});
//METODO POST TIENDA
Route::post('/tienda', function (Request $request) {
    $productos = $request->input('productos');
    return "<h1>Excelente decision, compraste: $productos</h1>";
});









//PARAMETROS DE RUTA
//PARAMETRO USUARIOS
Route::get('/user/{id}', function (string $id) {
    return "Mostrando al usuario: " . $id;
})->whereNumber('id'); 


//PARAMETRO PRODUCTOS
Route::get('/productos/{id}', function (string $id) {
    return "Mostrando el producto: " . $id;
})->whereNumber('id'); 

//PARAMETRO FILTRO CATEGORIA
Route::get('/productos/{categoria?}', function ($categoria = 'Todos') {
    return "<h1>Catálogo de Productos</h1>
            <p>Filtrando por la categoría: <strong>$categoria</strong></p>";
});

//PARAMETRO SERVICIO
Route::get('servicio/{name}', function (string $name) { 
    return "Mostrando informacion del servicio seleccionado: " . $name;
})->where('name', '[A-Za-z]+');

//PARAMETROS RESTRICCIONES
//FACTURA CON MENSAJE DE ERROR
Route::get('/factura/{id}', function ($id) {
    return "<h1>Expediente de Facturación</h1>
            <p>Mostrando detalles de la factura N°: <strong>$id</strong></p>";
})->whereNumber('id');








//RUTAS NOMBRADAS O CON REDIRECCION
// Definimos la ruta con nombre
Route::get('/home/principal/dashboard', function () {
    return "<h1>Bienvenido al Panel Principal</h1>";
})->name('inicio');

// Ruta que nos redirige usando el nombre
Route::get('/salir', function () {
    return 'Haz clic aquí para volver: <a href="' . route('inicio') . '">Ir al Inicio</a>';
});

//ENLACES
Route::get('/ayuda/ticket/{id}', function ($id) {
    return "Soporte para el ticket número: " . $id;
})->name('soporte.ticket');

Route::get('/ver-mi-ultimo-ticket', function () {
    // Genera automáticamente /ayuda/ticket/99
    $url = route('soporte.ticket', ['id' => 99]);
    return "Tu último ticket está en: " . $url;
});