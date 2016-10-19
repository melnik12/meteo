"use strict"

var ready = false;
var seneca = require('seneca')();

seneca.use(require('seneca-basic')).use(require('seneca-entity'));

seneca.add('role:entities,cmd:save', (msg, respond) => {
    let entity = seneca.make$('entity');
    let dt = new Date();
    entity.dt = dt.getUTCFullYear().toFixed(2) + dt.getUTCMonth().toFixed(2) + dt.getUTCDate().toFixed(2) + 
        dt.getUTCHours().toFixed(2) + dt.getUTCMinutes().toFixed(2) + dt.getUTCSeconds().toFixed(2);  
    entity.data = msg.data;
    entity.save$((err, ent) => {
        respond(err, { value: ent.id });
    })
});

seneca.add('role:entities,cmd:load', (msg, respond) => {
    console.log(msg.id);
    seneca.make$('entity').load$(msg.id, (err, ent) => {
        respond(err, { value: ent });
    })    
});

seneca.add('role:entities,cmd:list', (msg, respond) => {
    respond();
});

seneca.add('role:entities,cmd:ready', (msg, respond) => {
    respond();
});

seneca.ready((err) => {
    if (err) console.log('Error => Seneca is not ready for saving data.');
    else { 
        console.log('Seneca is ready for saving data.');
        ready = true;
    }
})

let checkerId = setInterval(() => {
    if (ready === true) {

        let ent_id;
        clearInterval(checkerId); 

        seneca.act('role:entities,cmd:save', (err, respond) => {
            if (err) console.log(err);
            else {
                ent_id = respond.value;

                seneca.act('role:entities,cmd:load', { id: ent_id }, (err, respond) => {
                    if (err) console.log(err);
                    else console.log("Respond2: " + respond.value);
                });                
            }
        });
    }
}, 100);



