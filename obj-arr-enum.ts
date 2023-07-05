// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   //const person = {
//   name: "Test",
//   age: 30,
//   hobbies: ["sports", "cooking"],
//   role: [2, "author"],
// };

enum Role {
  ADMIN = 5,
  READ_ONLY = 7,
  AUTHOR,
}

const person = {
  name: "Test",
  age: 30,
  hobbies: ["sports", "cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin");
// person.role[1] = 10;

// person.role = [0,"admin","user"]

console.log(person.name);

let favoritesActivities: string[];
favoritesActivities = ["Sports"];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log("is admin");
}
