"use strict"

const Parameter = require('./Parameter.js');

module.exports = class BarometricPressure extends Parameter {
    constructor() {
        super();
        this._symbol = "Pa";
        this._description = "Barometric pressure";
        this._negative = false;
        this._resolution = 0.1;
        this._precision = 1;
    }
}