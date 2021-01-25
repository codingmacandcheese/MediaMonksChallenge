//SERVER
//Aquí se configurará el server

const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const Storage = require('./server/models/storage.model');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//----------------------
//  Conexión a la BDD
//----------------------

mongoose.connect('mongodb+srv://admin:123456.a@cluster0-l7zwq.mongodb.net/mediamonkschallenge', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
    if (err) {
        throw err;
    }

    console.log('Database ONLINE');
});

//------------------------------
//  Configuración WebSocket
//------------------------------

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {
        ws.send(`Stored -> ${message}`);

        let key = message.split(":")[0].trim();
        let value = message.split(":")[1].trim();

        Storage.findOne({ key: key }, (err, pairDB) => {
            if (!pairDB) {
                let newStorage = new Storage({
                    key: key,
                    value: value
                })
                newStorage.save();
            } else {
                pairDB.value = value;
                pairDB.save();
            }
        })
    });
    ws.send('Hi there, I am a WebSocket server!');
})

//----------------------------------
//  Configuración Global de Rutas
//----------------------------------

app.use(require('./server/routes/index.route'));

//-------------------------
//  Conexión al servidor
//------------------------- 

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});