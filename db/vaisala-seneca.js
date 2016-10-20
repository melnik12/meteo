"use strict"

let ready = false;
const seneca = require('seneca')();

console.log(seneca.version);

seneca
    .use(require('seneca-entity'))
    .use(require('seneca-basic'))
    //.use(require('seneca-jsonfile-store'), { folder: 'D:\\' });
    .use('mongo-store', { name:'meteo', host:'ds063186.mlab.com', port:63186 })

seneca.add('role:entities,cmd:save', (msg, respond) => {
    seneca
        .make$('entity')
        .data$({
            dt: getFormattedUTCDateTime(),
            data: msg.data
        })
        .save$(respond);
});

seneca.add('role:entities,cmd:load', (msg, respond) => {
    seneca.make$('entity').load$(msg.id, respond);    
});

seneca.add('role:entities,cmd:list', (msg, respond) => {
    seneca.make$('entity').list$({dt: '20160920130107'}, respond);
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
            else console.log("Respond ready: ", respond.value);
        });                

        for (let i = 0; i < 10; i++) {
            seneca.act('role:entities,cmd:save', (err, respond) => {
                if (err) console.log(err);
                else {
                    console.log("Respond save: " + respond);
                    if (i == 9) {
                        seneca.act('role:entities,cmd:list', (err, respond) => {
                            if (err) console.log(err);
                            else {
                                respond.forEach( (ent) => {
                                    seneca.act('role:entities,cmd:load', { id: ent.id }, (err, respond) => {
                                        console.log("Respond load: ", respond.data$(false));
                                    });            
                                });
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

const getFormattedUTCDateTime = () => {
    let dt = new Date();
    return dt.getUTCFullYear() + pad0(dt.getUTCMonth()) + pad0(dt.getUTCDate()) + pad0(dt.getUTCHours()) + pad0(dt.getUTCMinutes()) + pad0(dt.getUTCSeconds());  
}


