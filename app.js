var person = {
    //const person = {
    name: "Test",
    age: 30,
    hobbies: ["sports", "cooking"],
    role: [2, "author"],
};
person.role.push("admin");
person.role[1] = 10;
console.log(person.name);
var favoritesActivities;
favoritesActivities = ["Sports"];
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
