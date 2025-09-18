//OBJECT DESTRUCTURING

const { defineParameterType } = require("@badeball/cypress-cucumber-preprocessor");

const nums = {
    num1 : 10,
    num2 : 20,
    num3 : 30,
    num4 : 40
}

const {num1 : newName = 50, ...numbers} = nums; //same name as object
console.log(newName) //
console.log(JSON.stringify(numbers)) //all other than num1


const student = {
         firstName: "Kunal",
         lastName: "Karma",
         grades: {
            English: 75,
            Maths: 87,
            SocialScience: 90,
            Science: 80,
         }
      };

const { firstName : fName, lastName : lName, grades: {Maths, ...allGrades} } = student;



//ARRAY DESTRUCTURING

arr = [1,2,3,4]

const [anum1, ,anum2, , anum4] = arr //same name as array


//OPTIONAL CHAINING
animal?.info?.legs?.first; //object with poperties

//NULL COALESCING
const color = animal?.spec?.color ?? "Red"; //color is assigned value "red" if null


//MIXINS = extend functionality of parent obj in child obj / class
Object.assign(child, parent); // Mixins
      child.printMessage(); //Executing the method of parent object using child object
      child.showName(); //method in child

      //one or more parent objects proepty extended in child class using child.prototype
const animal = {
         eats: true,
         run() {
            output.innerHTML += "Animals run. <br>";
         }
      }

      class cat {
         constructor() {
            this.name = "Cat";
         }
      }

Object.assign(cat.prototype,animal)

const catObj = new cat();
catObj.eats;; //extend object property
catObj.run(); //extend object method




