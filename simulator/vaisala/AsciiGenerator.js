"use strict"

//const factory = require('./ParameterFactory.js');
const parameter = require('./Parameter.js');

module.exports = class AsciiGenerator {
    constructor(type, addr) {
        this.params = new Set();
        this.type = type;
        this.addr = addr;

        this.format = (param) => {
            //if (param instanceof parameter) 
            return param.value.toFixed(param.precision());  
        }

        this.random = (param) => {
            return this.randomRange(param.minimum(), param.maximum(), param.resolution());
        }

        this.randomRange = (minimum, maximum, resolution) => {
            return (Math.floor((1 / resolution) * ((Math.random() * (maximum - minimum + 1)) + minimum))) * resolution;
            //return result;  //this.format(result);  
        }

        this.paramToString = (param) => {
            //return param.symbol() + "=" + param.valueToString() + param.unit();
            return param.symbol() + "=" + this.format(param) + param.unit();
        }
    }
    
    add(param) {
        this.params.add(param);
    }
    
    clear() {
        this.params.clear();
    }

    generate() {
        let str = this.addr + 'R' + this.type;
        for (let param of this.params) {
            param.value = this.random(param);
            str += ',' + this.paramToString(param);
        }
        str += "\r\n";
        return str;
    }
}; 