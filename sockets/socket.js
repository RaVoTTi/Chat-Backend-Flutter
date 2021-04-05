const { io } = require('../index.js')

io.on('connection', client => { // comunicacion del socket
    console.log('Cliente conectado');
    // client.on es para escuchar algo
    client.on('disconnect', () => console.log('Cliente desconectado'));

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje !!', payload); // ('Mensaje!!' + payload) == [obaject, object]
        io.emit('mensaje', { admin: 'Mensaje nuevo'}); // emit = publicar
  });
});