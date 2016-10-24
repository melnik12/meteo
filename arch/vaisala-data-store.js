"use strict"

const plugin = () => {

    seneca.add({ role: 'entities', cmd: 'save' }, (msg, respond) => {
        seneca
            .make$('entity')
            .data$({
                dt: getFormattedUTCDateTime(),
                data: msg.data
            })
            .save$(respond);
        console.log("Data saved: ", msg.data);
    });

    seneca.add('role:entities,cmd:load', (msg, respond) => {
        seneca.make$('entity').load$(msg.id, respond);    
    });

    seneca.add('role:entities,cmd:list', (msg, respond) => {
        seneca.make$('entity').list$({}, respond);
    });

    seneca.add('role:entities,cmd:ready', (msg, respond) => {
        respond(null, { value: ready });
    });
};

module.exports = plugin;

const seneca = require('seneca')();

seneca
    .use(require('seneca-entity'))
    .use(require('seneca-basic'))
    //.use('seneca-mongo-store', { uri: ' mongodb://dbuser:dbpassword@ds063186.mlab.com:63186/meteo' })
    .use('seneca-level-store', { folder: 'db' })
    .use(plugin);

seneca.ready((err) => {
    if (err) console.log('Error => Seneca is not ready for saving data.');
    else console.log('Seneca is ready for saving data.');
});

const getFormattedUTCDateTime = () => {
    let dt = new Date();
    return dt.getUTCFullYear() + pad0(dt.getUTCMonth()) + pad0(dt.getUTCDate()) + pad0(dt.getUTCHours()) + pad0(dt.getUTCMinutes()) + pad0(dt.getUTCSeconds());  
}

const pad0 = (value) => {
    if (value < 10) return '0' + value;
    return value;
}
