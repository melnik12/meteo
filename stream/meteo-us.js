"use strict"

const meteo = function() {

    this.add({area: 'meteo', cmd: 'save'}, (msg, respond) => {
        this.make('meteo', 'data')
            .data$({ entity: msg.ent })
            .save$((err, foo) => {
                respond(err, foo.data$(false));
            });               
    });

    this.add({area: 'meteo', cmd: 'load'}, (msg, respond) => {
        this.make('meteo', 'data')
            .load$(msg.id, (err, foo) => {
                respond(err, foo.data$(false));
        });               
    });

    this.add({area: 'meteo', cmd: 'list'}, (msg, respond) => {
        this.make('meteo', 'data')
            .list$(msg.filter || {}, (err, list) => {
                respond(err, { entities: list });
        });               
    });
}

module.exports = meteo; 