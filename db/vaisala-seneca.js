"use strict"

let ready = false;
const seneca = require('seneca')();

seneca.use(require('seneca-basic')).use(require('seneca-entity'));

seneca.add('role:entities,cmd:save', (msg, respond) => {
    let entity = seneca.make$('entity');
    let dt = new Date();
    entity.dt = dt.getUTCFullYear() + pad0(dt.getUTCMonth()) + pad0(dt.getUTCDate()) + 
        pad0(dt.getUTCHours()) + pad0(dt.getUTCMinutes()) + pad0(dt.getUTCSeconds());  
    entity.data = msg.data;
    entity.save$((err, ent) => {
        respond(err, { value: ent.id });
    })
});

seneca.add('role:entities,cmd:load', (msg, respond) => {
    seneca.make$('entity').load$(msg.id, (err, ent) => {
        respond(err, { value: ent });
    })    
});

seneca.add('role:entities,cmd:list', (msg, respond) => {
    seneca.make$('entity').list$({}, (err, list) => {
        respond(err, { value: list });
    })    
});

seneca.add('role:entities,cmd:ready', (msg, respond) => {
    respond(null, { value: ready });
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

        seneca.act('role:entities,cmd:ready', (err, respond) => {
            if (err) console.log(err);
            else console.log("Respond ready: " + respond.value);
        });                

        for (let i = 0; i < 10; i++) {
            seneca.act('role:entities,cmd:save', (err, respond) => {
                if (err) console.log(err);
                else { 
                    console.log("Respond save: " + respond.value);
                    if (i == 9) {
                        seneca.act('role:entities,cmd:list', (err, respond) => {
                            if (err) console.log(err);
                            else {
                                let list = respond.value;
                                list.forEach( (ent) => { console.log(ent.data$(false)); } );
                            }
                        });
                    }                                   
                }
            });                
        }
    }
}, 100);

const pad0 = (value) => {
    if (value < 10) return '0' + value;
    return value;
}


