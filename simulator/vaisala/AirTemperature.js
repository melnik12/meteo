"use strict"

const Parameter = require('./Parameter.js');

module.exports = class AirTemperature extends Parameter {
    constructor(unit) {
        super();
        this._symbol = "Ta";
        this._description = "Air temperature";
        this._resolution = 0.1;
        this._precision = 1;
    }
}
