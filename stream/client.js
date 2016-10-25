const seneca = require('seneca')().client({port: 1234});
const db_entity = require('./db-entity');

const entity = db_entity.create();

seneca.act({ area: 'meteo', cmd: 'save', ent: entity }, (err, respond) => {
    seneca.act({area: 'meteo', cmd: 'load', id: respond.id }, (err, respond) => {
        console.log(respond);
    });
});

seneca.act({ area: 'meteo', cmd: 'list', filter: {} }, (err, respond) => {
    respond.entities.forEach((value) => { console.log(value) });
    seneca.act({ area: 'database', cmd: 'close' }, (err, respond) => {
        if (err) console.log(err);
        else console.log('DB connection closed.');
    });
});


