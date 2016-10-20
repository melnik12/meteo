"use strict"

const AirTemperature = require('./AirTemperature.js');

module.exports = class AirTemperatureC extends AirTemperature {
    constructor() {
        super();
        this._unit = "C";
        this._minimum = -52.0;
        this._maximum = 60.0;
    }
}