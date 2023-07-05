let userInput: unknown;
let userName5: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
  userName5 = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError("An error", 500);

console.log(result);
