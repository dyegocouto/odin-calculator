let currentInput = "";
let previousInput = "";
let operator = "";

const currentLine = document.querySelector(".current-line");
const previousLine = document.querySelector(".previous-line");
const keypad = document.querySelector(".keypad");

function operate() {
  const prev = Number(previousInput);
  const current = Number(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      currentInput = (prev + current).toString();
      break;
    case "-":
      currentInput = (prev - current).toString();
      break;
    case "*":
      currentInput = (prev * current).toString();
      break;
    case "/":
      currentInput = current !== 0 ? (prev / current).toString() : "Error";
      break;
  }

  operator = null;
  previousInput = "";
}

function updateDisplay() {
  currentLine.textContent = currentInput;
  previousLine.textContent = operator ? `${previousInput} ${operator}` : "";
}

function compute(value, type) {
  switch (type) {
    case "number":
      currentInput += value;
      updateDisplay();
      break;
    case "dot":
      if (currentInput.includes(".")) return;
      currentInput += value;
      updateDisplay();
      break;
    case "operator":
      if (currentInput === "") return;
      if (previousInput !== "") operate();
      operator = value;
      previousInput = currentInput;
      currentInput = "";
      updateDisplay();
      break;
    case "action":
      if (value === "clear") {
        currentInput = "";
        previousInput = "";
        operator = "";
      } else if (value === "backspace") {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
      break;
    case "equals":
      if (previousInput === "" || currentInput === "") return;
      operate();
      updateDisplay();
      break;
  }
}

function handleClick(event) {
  const btn = event.target.closest("button");
  if (!btn) return;

  const value = btn.dataset.value;
  const type = btn.dataset.type;

  compute(value, type);
}

function handleKeyPress(event) {
  const key = event.key.toLowerCase();

  if (key === "backspace") {
    compute("backspace", "action");
    event.preventDefault();
    return;
  } else if (key === "enter") {
    compute("=", "equals");
    event.preventDefault();
    return;
  } else if (key === "delete" || key === "c") {
    compute("clear", "action");
    event.preventDefault();
    return;
  }

  const btn = document.querySelector(`[data-value="${key}"]`);
  if (!btn) return;

  const value = btn.dataset.value;
  const type = btn.dataset.type;
  compute(value, type);
}

keypad.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeyPress);
