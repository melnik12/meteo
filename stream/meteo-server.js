const seneca = require('seneca')();
const meteo = require('./meteo-us');
const admin = require('./db-admin-us');

seneca
    .use(meteo)
    .use(admin)
    .use('seneca-basic')
    .use('seneca-entity')
    .use('seneca-mongo-store', {
        uri: 'mongodb://dbuser:dbuser@ds063186.mlab.com:63186/meteo'
    });

seneca.ready(() => {
    console.log('DB server ready ...');
    seneca.listen({port: 1234});
});