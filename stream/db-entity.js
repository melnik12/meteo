"use strict"

module.exports = class entity {
    constructor(param, unit) {
        this.param = param;
        this.dt = new Date();
        this._value = 0;
        this.unit = unit;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    static create() {
        return new entity('Ta', 'C');
    }
}