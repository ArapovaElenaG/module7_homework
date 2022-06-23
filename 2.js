// Задание 2. Написать функцию, которая принимает в качестве аргументов строку и объект, а затем проверяет есть ли у переданного объекта свойство с данным именем. Функция должна возвращать true или false.

let figure = {
    color: "red",
    size: "big",
    heigth: "short"
}

function checkProperty (str, obj) {
    return str in obj; 
}
console.log(checkProperty("color", figure));
console.log(checkProperty("width", figure));