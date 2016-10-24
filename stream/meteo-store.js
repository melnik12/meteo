"use strict"

const meteo = function() {

    this.add({area: 'meteo', cmd: 'save'}, (msg, respond) => {
        seneca.make('meteo', 'data').data$({dt: new Date(), val: 28.5}).save$((err, foo) => {
            respond(err, { value: foo.data$(false) });
        });               
    });

    this.add({area: 'meteo', cmd: 'load'}, (msg, respond) => {
        seneca.make('meteo', 'data').load$(msg.id, (err, foo) => {
            respond(err, { value: foo.data$(false) });
        });               
    });
}

module.exports = meteo; 

const seneca = require('seneca')();

seneca
    .use(meteo)
    .use('seneca-basic')
    .use('seneca-entity')
    .use('seneca-mongo-store', {
        uri: 'mongodb://dbuser:dbuser@ds063186.mlab.com:63186/meteo'
    });

seneca.ready(() => {
    console.log('ready');
    seneca.listen({port: 1234});
});