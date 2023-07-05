function add(n1, n2) {
    return n1 + n2;
}
function printResult1(num) {
    console.log("Result " + num);
}
printResult1(add(2, 5));
function addAndHandle(a, b, cb) {
    var result = a + b;
    cb(result);
}
var combineValues;
combineValues = add;
//combineValues = printResult1;
console.log(combineValues(50, 4));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
