function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult1(num: number): void {
  console.log("Result " + num);
}

printResult1(add(2, 5));

function addAndHandle(a: number, b: number, cb: (c: number) => void) {
  const result = a + b;
  cb(result);
}

let combineValues: (a: number, b: number) => number;
combineValues = add;
//combineValues = printResult1;

console.log(combineValues(50, 4));

addAndHandle(10, 20, (result) => {
  console.log(result);
});
