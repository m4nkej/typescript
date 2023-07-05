// const person: {
//   name: string;
//   age: number;
// } = {
const person = {
  name: "Test",
  age: 30,
  hobbies: ["sports", "cooking"],
};
console.log(person.name);

let favoritesActivities: string[];
favoritesActivities = ["Sports"];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
