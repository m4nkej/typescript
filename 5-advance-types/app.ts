type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }
// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: "Mat",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  //type guard
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString();
  return a + b;
}

type UnknowEmployee = Employee | Admin;

function printEmplInfo(empl: UnknowEmployee) {
  console.log("Name: " + empl.name);

  //type guard *2
  if ("privileges" in empl) {
    console.log("Priv: " + empl.privileges);
  }
  if ("startDate" in empl) {
    console.log("Date: " + empl.startDate);
  }
}

printEmplInfo(e1);

///////////////////////
class Car {
  drive() {
    console.log("Driving car...");
  }
}

class Truck {
  drive() {
    console.log("Driving Truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo ... " + amount);
  }
}

type Vechicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVechicle(vechicle: Vechicle) {
  vechicle.drive();

  //typeguard *3
  if (vechicle instanceof Truck) {
    vechicle.loadCargo(1000);
  }
}

useVechicle(v1);
useVechicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}
type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// === type casting
const paragraph = document.getElementById("message");

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")
// );

// const userInputElement = document.getElementById(
//   "user-input"
// ) as HTMLInputElement;

// userInputElement.value = "Hi";

const userInputElement = document.getElementById("user-input");
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi";
}

// === index properties
interface ErrorContainer {
  // {email: "Not a valid email", username: "Invalid username"}
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  user: "Invalid username",
};

// === function overloads
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: string, b: number): string;
function add2(a: number, b: string): string;
function add2(a: Combinable, b: Combinable) {
  //type guard
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString();
  return a + b;
}

const result = add2(1, 5);
const result2 = add2("MAX", " Verstapne");
result2.split(" ");

// === Optional Chaining
const fetcheUserData = {
  id: "u1",
  name: "Seb",
  // job: { title: "F1 Driver", description: "Driver of a fast car" },
  job: { title: "F1 Driver", description: "Driver of a fast car" },
};

console.log(fetcheUserData?.job?.title);

// === Nullish Coalescing
const userInput = undefined;
const storedData = userInput ?? "Default"; // ?? - null or undefined (only this two)

console.log(storedData);
