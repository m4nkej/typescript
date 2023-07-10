console.log("functions. arrays, obj");
const add3 = (a: number, b: number) => a + b;

const printOut: (a: number | string) => void = (output) => console.log(output);

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

const hobbies = ["sports", "cooking"];

const activeHobbies = ["hiking"];

activeHobbies.push(...hobbies);

const person = {
  age: 10,
  userName: "Max",
};

const copiedPerson = { ...person };
console.log(copiedPerson);

const add4 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addedNumbers = add4(5, 10, 2, 8.8);
console.log(addedNumbers);

//Array & Object Destructuring
const [hobbie1, hobbie2] = hobbies;
console.log(hobbie1, hobbie2, hobbies);

const { age, userName: firstName } = person;
console.log(age, firstName);
