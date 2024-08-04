class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  printStack() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}

function evaluateInfix(equation) {
  const operands = new Stack();
  const operators = new Stack();
  const solution = new Stack();
  let num = "";

  function isDigit(symbol) {
    if (symbol == "x" || symbol == "/" || symbol == "+" || symbol == "-") {
      return false;
    }
    return true;
  }

  function checkPriority(sign1, sign2) {
    if ((sign1 == "+" || sign1 == "-") && (sign2 == "x" || sign2 == "/")) {
      return true;
    }
    return false;
  }

  // console.log(checkPriority("+", "/"));

  function solve(num1, num2, sign) {
    if (sign == "+") {
      return num1 + num2;
    } else if (sign == "-") {
      return num1 - num2;
    } else if (sign == "x") {
      return num1 * num2;
    } else if (sign == "/") {
      return num1 / num2;
    }
  }

  // console.log(solve(10, 5, "/"));

  for (let i = 0; i < equation.length; i++) {
    if (isDigit(equation.charAt(i))) {
      num += equation.charAt(i);
    } else {
      const n = parseInt(num);
      num = "";
      operands.push(n);
      // console.log("pushing into stack : " + n);

      if (operators.isEmpty()) {
        operators.push(equation.charAt(i));
        // console.log("pushing into operator stack : " + equation.charAt(i));
      } else {
        // console.log();
        // console.log(
        //   "Comparing : " + equation.charAt(i) + " " + operators.peek()
        // );
        console.log();
        if (checkPriority(operators.peek(), equation.charAt(i))) {
          operators.push(equation.charAt(i));
          // console.log("pushing into operator stack : " + equation.charAt(i));
        } else {
          let num1 = operands.peek();
          operands.pop();
          let num2 = operands.peek();
          operands.pop();

          const ans = solve(num2, num1, operators.peek());
          operators.pop();
          operands.push(ans);
          // console.log("pushing into stack : " + ans);

          operators.push(equation.charAt(i));
          // console.log("pushing into operator stack : " + equation.charAt(i));
        }
      }
    }
  }
  operands.push(num);

  // console.log("Operands Stack is : " + operands.printStack());
  // console.log("Operator Stack is : " + operators.printStack());

  // console.log();
  // console.log();
  // console.log();

  while (!operators.isEmpty()) {
    let num1 = parseInt(operands.peek());
    operands.pop();
    let num2 = parseInt(operands.peek());
    operands.pop();

    let sign = operators.peek();
    operators.pop();

    let result = solve(num2, num1, sign);

    operands.push(result);
  }

  // console.log(operands.printStack());
  return operands.printStack();
}
const user_equation = document.getElementById("uin");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const result = document.getElementById("result");
let equation = "";
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  user_equation.innerText = text.toLowerCase();

  equation = user_equation.innerText;
  result.innerText = "Result is : " + evaluateInfix(equation);
});

start.addEventListener("click", () => {
  recognition.start();
});

stop.addEventListener("click", () => {
  recognition.stop();
});
