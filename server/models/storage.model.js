//STORAGE MODEL
//Aquí se define el modelo de datos de los key-value pairs de MediaMonks Challenge

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let storageSchema = new Schema({
    key: {
        type: String,
        required: [true, 'El key es obligatorio']
    },
    value: {
        type: String,
        required: [true, 'El value es obligatorio']
    }
});

module.exports = mongoose.model('Storage', storageSchema);