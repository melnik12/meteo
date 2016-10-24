"use strict"

const admin = function() {

    this.add({area: 'database', cmd: 'close'}, (msg, respond) => {
        this.close((err) => {
            console.log('Closing db connection ...');
            respond(err, null);
        });
    });
}

module.exports = admin;