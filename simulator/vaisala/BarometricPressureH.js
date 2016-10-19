"use strict"

const BarometricPressure = require('./BarometricPressure.js');

module.exports = class BarometricPressureH extends BarometricPressure {
    constructor() {
        super();
        this._unit = "H";
        this._minimum = 600;
        this._maximum = 1100;
        this._resolution = 0.1;
        this._precision = 1;
    }
}