// Задание 3. Написать функцию, которая создает пустой объект, но без прототипа.

function createObj () {
    let obj = {};
    return obj;
}
console.log(createObj());


// или через объект.криэйт()

// function createObj () {
//     let obj = Object.create(null);
//     return obj;
// }
// console.log(createObj());