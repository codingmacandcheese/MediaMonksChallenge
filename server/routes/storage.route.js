//STORAGE ROUTE
//Aquí se define la ruta de storage de MediaMonks Challenge

const express = require('express');
const router = express.Router();

const storageController = require('../controllers/storage.controller');

router.get('/storage', storageController.getValue);

module.exports = router;