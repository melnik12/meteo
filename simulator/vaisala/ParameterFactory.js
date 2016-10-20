"use strict"

const AirTemperatureC = require('./AirTemperatureC.js');
const BarometricPressureH = require('./BarometricPressureH.js');
const RelativeHumidity = require('./RelativeHumidity.js');

module.exports = class ParameterFactory {
    static create(options) {
        options = options || {};
        switch (options['type']) {
            case 'airTemperature':
                if (options['unit'] === 'C') return new AirTemperatureC();
                break;
            case 'barometricPressure':
                if (options['unit'] === 'H') return new BarometricPressureH();
                break 
            case 'relativeHumidity':
                //if (options['unit'] === 'H') 
                return new RelativeHumidity();
            default:
                break;
        }
        return new Parameter();
    }
}
