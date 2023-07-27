// === Decorators

// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    console.log("Render template");

    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("Logging - Person")
@WithTemplate("<h1>person</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Crating person obj....");
  }
}

const person = new Person();
console.log(person);

// ===
function Log(target: any, propertyName: string) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, decsriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target, name, decsriptor);
}
function Log3(target: any, name: string, decsriptor: PropertyDescriptor) {
  console.log("Method decorator");
  console.log(target, name, decsriptor);
}

function Log4(target: any, name: string, position: number) {
  console.log("Parameter decorator");
  console.log(target, name, position);
}
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Price sohuld be greather than 0");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPricewithTax(@Log4 tax: number) {
    return this._price * tax;
  }
}

//===

function AutoBind(_: any, _2: string, decsriptor: PropertyDescriptor) {
  const originalMethod = decsriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
class Printer {
  message = " Message text";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

//=== validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ["required",'positive']
  };
}
const registredValidators: ValidatorConfig = {};
function Require(target: any, propertyName: string) {
  const validators =
    registredValidators[target.constructor.name]?.[propertyName] ?? [];

  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [propertyName]: [...validators, "required"],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  const validators =
    registredValidators[target.constructor.name]?.[propertyName] ?? [];
  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [propertyName]: [...validators, "positive"],
  };
}

function vaidate(obj: any) {
  const objValidatorCfg = registredValidators[obj.constructor.name];

  if (!objValidatorCfg) {
    return true;
  }
  let isValid = true;
  console.log("objValidatorCfg", objValidatorCfg);
  for (const prop in objValidatorCfg) {
    for (const validator of objValidatorCfg[prop]) {
      console.log(validator, obj[prop]);
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Require
  title: string;
  @Require
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;

    this.price = p;
    console.log("req validators: ", registredValidators);
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createCourse = new Course(title, price);
  if (!vaidate(createCourse)) {
    alert("Not Valid");
  }
  console.log(courseForm);
});

/// typestack/class-validator
