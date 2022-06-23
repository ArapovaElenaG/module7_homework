// Задание 4. Реализуйте следующее консольное приложение подобно примеру, который разбирался в видео. Реализуйте его на прототипах. Определите иерархию электроприборов. Включите некоторые в розетку. Посчитайте потребляемую мощность (передайте аргумент). 
// Таких приборов должно быть как минимум два (например, настольная лампа и компьютер). Выбрав прибор, подумайте, какими свойствами он обладает.
// План: Определите родительскую функцию с методами, которые включают/выключают прибор из розетки.
// Создайте делегирующую связь [[Prototype]] для двух конкретных приборов.
// У каждого из приборов должны быть собственные свойства и, желательно, методы, отличные от родительских методов.
// Создайте экземпляры каждого прибора.
// Выведите в консоль и посмотрите на результаты работы, можете гордиться собой :)



// Я не очень поняла, что делать, даже после пояснений в Слаке. Сделала следующее:
// Функция-конструктор категрии создает эл/приборы. У нее есть вынесенный метод отключения приборов.
// 2 Функции-конструктора подкатегорий создают эл/приборы для кухни и сан/узла. У этих ФК тоже есть методы отключения приборов.
// Далее запускаются 2 функции, которые считают мощность приборов в кухне и в сан/узле и в случае превышения мощности в каком-либо помещении, поочередно вызывают методы подкатегорий, которые отключают приборы, пока мощность не будет в пределах нормы.
// После этого запускается функция, которая считает мощность приборов всего дома, и в случае превышения она обращается к методу категрии и отключает все приборы в доме. 
// свойство turn: true - означает, что прибор включен. Когда функция меняет turn: false - прибор выключен


// ФК категрии приборы
function Appliance(name, power, turn) {             
    this.name = name,
    this.power = power,
    this.turn = turn,
    this.powerSupply = 'электрическая сеть'
  }
  // Метод категории
  Appliance.prototype.turnOff = function(sumPower){               
    if (sumPower > 3000) {this.turn = false;}
  }
  
  // ФК подкатегории приборы кухни
  function KitchenAppliance(name, power, turn) {           
    this.name = name,
    this.power = power,
    this.turn = turn,
    this.location = 'кухня'
  }
  // Связь ФК категрии и подкатегории кухня
  KitchenAppliance.prototype = new Appliance();
  // метод объектов подкатегории кухонные приборы
  KitchenAppliance.prototype.turnOffKitchen = function(sumPowerKitchen){
    if (sumPowerKitchen > 2000) {
      this.turn = false;
      console.log(`Прибор ${this.name} отключен из-за превышения мощности в кухне!`);
    }
  }
  
  // ФК подкатегории приборы сан/узла
  function LaundryAppliance(name, power, turn) {
    this.name = name,
    this.power = power,
    this.turn = turn,
    this.location = 'сан/узел'
  }
  // Связь ФК категории и подкатегории сан/узел
  LaundryAppliance.prototype = new Appliance();
  // метод объектов подкатегории приборы сан/узла
  LaundryAppliance.prototype.turnOffBathroom = function(sumPoweBathroom) {
      this.turn = false;
      console.log(`Прибор ${this.name} отключен из-за превышения мощности в сан/узле!`);
  }
  //Создание объектов по ФК подкатегорий
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