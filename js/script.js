import { add, subtract, multiply, divide } from "./math.js";

let currentInput = "";

const currentLine = document.querySelector(".current-line");
const keypad = document.querySelector(".keypad");

function updateDisplay() {
  currentLine.textContent = currentInput;
}

function compute(value, type) {
  switch (type) {
    case "number":
      currentInput += value;
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

keypad.addEventListener("click", handleClick);
