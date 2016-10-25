"use strict"

const client = require('dgram').createSocket('udp4');
const generator = require('../vaisala/R2Generator.js')

//const HOST = '192.168.1.130';
const HOST = 'localhost';
const PORT = 3000;

const r2 = new generator(2, 0); 

const sendMsg = () => {
    let message = new Buffer(r2.generate()); 
    client.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
    });
}

sendMsg();

setInterval(sendMsg, 60000);