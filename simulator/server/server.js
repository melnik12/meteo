"use strict"

var PORT = 3000;
var HOST = '192.168.1.140';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', () => {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT);