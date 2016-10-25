"use strict"

var PORT = 3000;
//var HOST = '192.168.1.140';
var HOST = 'localhost';

var dgram = require('dgram');
var seneca = require('seneca')().client({ host: '192.168.1.130', port: 1234 });
var server = dgram.createSocket('udp4');
var entity = require('./db-entity');

server.on('listening', () => {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    let _ent = entity.create();
    _ent.value = message.toString();
    seneca.act({ area: 'meteo', cmd: 'save', ent: _ent }, console.log);
});

server.bind(PORT);