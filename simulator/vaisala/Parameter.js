"use strict"

module.exports = class Parameter {
    constructor() {
        this._symbol = '__';
        this._description = 'Basic parameter';
        this._value = 0;
        this._unit = '_';
        this._resolution = 1;
        this._minimum = 0;
        this._maximum = 100;
        this._precision = 1;
        this._invalidUnit = '#';
        this._invalidValue = 0;
    }

    symbol() {
        return this._symbol;
    }

    description() {
        return this._description;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    invalidValue() {
        return this._invalidValue;
    }

    unit() {
        return this._unit;
    }

    invalidUnit() {
        return this._invalidUnit;
    }

    precision() {
        return this._precision;
    }

    resolution() {
        return this._resolution;
    }

    minimum() {
        return this._minimum;
    }

    maximum() {
        return this._maximum;
    }
}