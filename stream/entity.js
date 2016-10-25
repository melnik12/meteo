"use strict"

class entity {
    constructor(name, val) {
        parameter = name;
        value = val;        
    }

    get parameter() {
        return this.parameter;
    }

    set parameter(name) {
        this.parameter = name; 
    }

    get value() {
        return this.value;
    }

    set value(val) {
        this.value = val; 
    }

    get unit() {
        return this.unit;
    }

    set unit(name) {
        this.unit = name; 
    }
}