"use strict"

const Parameter = require('./Parameter.js');

module.exports = class RelativeHumidity extends Parameter {
    constructor() {
        super();
        this._symbol = "Ua";
        this._description = "Relative humidity";
        this._unit = "P";
        this._negative = false;
        this._minimum = 0;
        this._maximum = 100;
        this._resolution = 0.1;
        this._precision = 1;
    }
}