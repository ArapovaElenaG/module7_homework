
// Задание 1. Написать, функцию, которая принимает в качестве аргумента объект и выводит в консоль все ключи и значения только собственных свойств. Данная функция не должна возвращать значение.


const figure = { orientation: "flat" } // создание объекта 
  
const triangle = Object.create(figure); // создание объекта с прототипом
triangle.color = "red";    // добавление свойств в объект triangle
triangle.size = "smoll";
  
delete triangle.size;            // удаление свойства из объекта triangle
  
for (let key in triangle) {   // получение собственных свойств путем перебора
  if (triangle.hasOwnProperty(key)) {console.log(key)}
}