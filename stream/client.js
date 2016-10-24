const seneca = require('seneca')().client({port: 1234});

seneca.act({area: 'meteo', cmd: 'save'}, (err, respond) => {
    seneca.act({area: 'meteo', cmd: 'load', id: respond.value.id }, (err, respond) => {
        console.log(respond);
    });
});