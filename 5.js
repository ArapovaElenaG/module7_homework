// Задание 5. Переписать консольное приложение из предыдущего юнита на классы.
// Общие требования:
// Имена классов, свойств и методов должны быть информативными;
// Соблюдать best practices;
// Использовать синтаксис ES6.



// Класс категрии приборы
class Appliance {
    constructor(name, power, turn) {
      this.name = name,
      this.power = power,
      this.turn = turn,
      this.powerSupply = 'электрическая сеть'
    }
    turnOff (sumPower) {               
      if (sumPower > 3000) {this.turn = false;}
    }
  }
  
  // Класс подкатегории приборы кухни
  class KitchenAppliance extends Appliance {
    constructor (name, power, turn) {
      super (name);
      this.power = power,
      this.turn = turn,
      this.location = 'кухня'
    }
    turnOffKitchen (sumPowerKitchen) {
      if (sumPowerKitchen > 2000) {
        this.turn = false;
        console.log(`Прибор ${this.name} отключен из-за превышения мощности в кухне!`);
      }
    }
  } 
  
  // Класс подкатегории приборы сан/узла
  class LaundryAppliance extends Appliance {
    constructor (name, power, turn) {
      super (name);
      this.power = power,
      this.turn = turn,
      this.location = 'сан/узел'
    }
    turnOffBathroom (sumPoweBathroom) {
      this.turn = false;
      console.log(`Прибор ${this.name} отключен из-за превышения мощности в сан/узле!`);
    }
  }
  
  
  //Создание объектов по классам подкатегорий
  // кухонные приборы
  const refrigerator = new KitchenAppliance('холодильник', 300, true);
  const stove = new KitchenAppliance('плита', 700, true);
  const microwave  = new KitchenAppliance('микроволновая печь', 900, true);
  const dishwasher = new KitchenAppliance('посудомоечная машина', 700, true);
  // приборы сан/узла
  const washingMachine = new LaundryAppliance('стиральная машина', 600, true);
  const dryer = new LaundryAppliance('сушилка', 400, true);
  const waterHeater = new LaundryAppliance('водонагреватель', 800, true);
  
  // вызов методов подкатегорий
  let sumPowerKitchen = 0;
  let arrKitchenAppliance = [dishwasher, microwave, stove, refrigerator];
  function getSumPowerKitchen () {
    for(let i = 0; i < arrKitchenAppliance.length; i++) {
      arrKitchenAppliance.reduce(function(sum, current) {
        if (current.turn === true) {sumPowerKitchen = sumPowerKitchen + current.power}
        }, 0);
      if (sumPowerKitchen > 2000) {
        console.log(`ВНИМАНИЕ!!! Суммарная мощность включенных приборов КУХНИ ${sumPowerKitchen} Вт при допустимой мощности кухни 2000 Вт`);
        arrKitchenAppliance[i].turnOffKitchen(sumPowerKitchen);
        sumPowerKitchen = 0;
      } else {
        console.log(`ПОРЯДОК! Суммарная мощность включенных приборов КУХНИ ${sumPowerKitchen} Вт при допустимой мощности кухни 2000 Вт`);
        break;}
    }
  }
  getSumPowerKitchen ();
  
   
  let sumPowerBathroom = 0;
  let arrBathroomAppliance = [dryer, waterHeater, washingMachine];
  function getSumPowerBathroom () {
    for(let i = 0; i < arrBathroomAppliance.length; i++) {
      arrBathroomAppliance.reduce(function(sum, current) {
        if (current.turn === true) {sumPowerBathroom = sumPowerBathroom + current.power}
        }, 0);
      if (sumPowerBathroom > 1500) {
        console.log(`ВНИМАНИЕ!!! Суммарная мощность включенных приборов САН/УЗЛА ${sumPowerBathroom} Вт при допустимой мощности сан/узла 1500 Вт`);
        arrBathroomAppliance[i].turnOffBathroom(sumPowerBathroom);
        sumPowerBathroom = 0;
      } else {
        console.log(`ПОРЯДОК! Суммарная мощность включенных приборов САН/УЗЛА ${sumPowerBathroom} Вт при допустимой мощности кухни 1500 Вт`);
        break;}
    }
  }
  getSumPowerBathroom ();
  
  // вызов метода категрии
  let sumPower = 0;
  let arrAppliance = arrKitchenAppliance.concat(arrBathroomAppliance);
  function getSumPower () {
    sumPower = sumPowerBathroom + sumPowerKitchen;
    
    if (sumPower > 3000) {
      console.log(`ВНИМАНИЕ!!! Суммарная мощность всех включенных приборов ВСЕГО ДОМА ${sumPower} Вт при допустимой мощности в доме 3000 Вт`);
      arrAppliance.forEach(function(item) {item.turnOff(sumPower)})
      console.log('Все приборы в доме отключены из-за превышения мощности!');
    }  
  }
  getSumPower ();
  
  // проверка
  console.log(arrAppliance);