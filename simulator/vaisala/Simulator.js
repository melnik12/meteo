"use strict"

const R2 = require('./R2Generator.js')

const gR2 = new R2(2, 0); 

console.log(gR2.generate());

setInterval(() => {
    console.log(gR2.generate());
}, 5000);

//const airTemperature = ParameterFactory.create({type: 'airTemperature', unit: 'C'});
//const barometricPressure = ParameterFactory.create({type: 'barometricPressure', unit: 'H'});
//const relativeHumidity = ParameterFactory.create({type: 'relativeHumidity'});

//console.log(airTemperatureC);
//console.log(barometricPressureH);
//console.log(relativeHumidity);

/*
let AirTemperatureC = require('./AirTemperatureC.js');
let PressureH = require('./BarometricPressureH.js');

let atc = new AirTemperatureC();
let bph = new PressureH();

//console.log(atc.random());

bph.setRandomValue();
console.log(bph);
console.log(bph.toString());

/*
class DataMessageGenerator {
    constructor() {

    }
}*/