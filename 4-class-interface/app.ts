// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: "Max",
//   age: 32,
//   greet(phrase) {
//     console.log(phrase + " " + this.name);
//   },
// };

// user1.greet("Hi there ");

interface Greetable extends Named {
  greet(phrase: string): void;
}

interface Named {
  //   readonly name: string;
  readonly name?: string;
}

class Person implements Greetable {
  //   name: string;
  name?: string;
  age = 30;

  constructor(n?: string) {
    // this.name = n;
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;
user1 = new Person();
user1.greet("Hi there, I'm");
console.log(user1);
