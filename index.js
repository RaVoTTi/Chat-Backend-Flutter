const express = require('express');
const path = require('path');
require('dotenv').config();

// App express
const app = express();

// Lectura y parseo del body
app.use(express.json()); // is a middleware, se ejecuta al pasar en la funcion

// mongoose & init mongoose
require('./database/config').dbConnect(); //  const {dbConnect} = require('./database/config');


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // io = in and out y ademas lo exporta
require('./sockets/socket');

// Public path
const publicPath = path.resolve(__dirname, 'public'); // trae el index.html
app.use(express.static(publicPath)); // pone en funcionamiento el index.html

// my Routes
app.use('/api/login', require('./routes/auth').router);


server.listen(process.env.PORT, (err) => { // variables de entorno
    if(err) throw Error(err);
    console.log('Server on port:', process.env.PORT);
}); 