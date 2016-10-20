"use strict"

const factory = require('./ParameterFactory.js');
const generator = require('./AsciiGenerator.js');

module.exports = class R2Generator extends generator {
    constructor(type, addr) {
        super(type, addr);
        this.add(factory.create({type: 'airTemperature', unit: 'C'}));
        this.add(factory.create({type: 'relativeHumidity'}));
        this.add(factory.create({type: 'barometricPressure', unit: 'H'}));
    }
}
