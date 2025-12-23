"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
exports.add = add;
exports.multiply = multiply;
function greet(name) {
    return `Hello, ${name}! Welcome to the test project.`;
}
function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}
function main() {
    const message = greet("World");
    console.log(message);
    const sum = add(5, 3);
    console.log(`5 + 3 = ${sum}`);
    const product = multiply(5, 3);
    console.log(`5 * 3 = ${product}`);
    console.log("Test project is running successfully!");
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=index.js.map