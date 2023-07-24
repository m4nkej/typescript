// === Generics
const names: Array<string> = []; // === string[]
//names[0].split(" ");

const promise: Promise<string> = new Promise((res, rej) => {
  setTimeout(() => {
    res("Done");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});

// === merge

function merge<T extends Object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: "Mat" }, { age: 30 }));
const mergedObj = merge({ name: "Mat" }, { age: 30 });
console.log(mergedObj.name);

// === constraints

function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj2 = merge2({ name: "Mat", hobbyies: ["F1"] }, { age: 30 });
console.log(mergedObj2);

// === generic funct continue

interface Lengthy {
  length: number;
}
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length > 0) {
    description = `Got ` + element.length + " elements";
  }
  return [element, description];
}

console.log(countAndPrint("Hi there"));
console.log(countAndPrint(["Hi there", "cooking"]));
console.log(countAndPrint([]));
console.log(countAndPrint([1]));

// === keyof

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

//extractAndConvert({}, "name");
extractAndConvert({ name: "Max" }, "name");
//extractAndConvert({ name: "Max" }, "age");

// === classes generic

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("F1");
//textStorage.addItem(1)
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Mat" });
// objStorage.removeItem({ name: "Max" });
// console.log(objStorage.getItems());

// === Utility Types
interface CourseGoal {
  title: string;
  description: string;
  completeUntill: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let CourseGoal: Partial<CourseGoal> = {};
  CourseGoal.title = title;
  CourseGoal.description = description;
  CourseGoal.completeUntill = date;
  return CourseGoal as CourseGoal;
}

const names2: Readonly<string[]> = ["Max", "Man"];
// names2.push("Ann");
