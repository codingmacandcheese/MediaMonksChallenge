//ROUTE INDEX
//Aquí se definen todas las rutas de MediaMonks Challenge

const express = require('express');

const storageRoute = require('./storage.route');

const app = express();

app.use(storageRoute);

module.exports = app;