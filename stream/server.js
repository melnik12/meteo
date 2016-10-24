const seneca = require('seneca')();

seneca.add({area: 'entity', cmd: 'save'}, (msg, respond) => {
    console.log(msg.area, msg.cmd);
    respond(null, {});
});

seneca.listen({port: 1234})//.client().act({channel: 'entity', cmd: 'save'}, console.log);

//seneca.act({channel: 'entity', cmd: 'save'}, console.log);