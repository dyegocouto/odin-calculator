import { add, subtract, multiply, divide } from "./math.js";

const keypad = document.querySelector(".keypad");

function handleClick(event) {
  const btn = event.target.closest("button");
  if (!btn) return;

  const value = btn.dataset.value;
  const type = btn.dataset.type;
}

keypad.addEventListener("click", handleClick);
