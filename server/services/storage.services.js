//STORAGE SERVICE
//Aquí se define el servicio de storage de MediaMonks Challenge

const Storage = require('../models/storage.model');

exports.getValue = async function (key) {
    try {
        let response = new Object();

        await Storage.findOne({ key: key }, (err, pairDB) => {
            if (!pairDB) {
                response.status = false;
                response.value = null;
            } else {
                response.status = true;
                response.value = pairDB.value;
            }
        });

        return response;
    } catch (error) {
        throw Error('Error getting value of key ' + key);
    }
}