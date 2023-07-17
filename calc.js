let a = ""; // перше число
let b = ""; // друге число
let sign = ""; // операція
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/", "%"];

// екран
const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = "0";
}
document.querySelector(".ac").onclick = clearAll;

document.querySelectorAll(".btn").forEach((button) => {
  button.onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains("btn")) return;
    // нажата clearAll / ac
    if (event.target.classList.contains("ac")) {
      clearAll();
      return;
    }

    out.textContent = "";
    // отримуємо нажату кнопку
    const key = event.target.textContent;

    // якщо нажата 0-9 або "."
    if (digit.includes(key)) {
      if (b === "" && sign === "") {
        if (a.length < 8) {
          a += key;
          out.textContent = a;
        }
      } else if (a !== "" && b !== "" && finish) {
        b = key;
        finish = false;
        out.textContent = b;
      } else {
        if (b.length < 8) {
          b += key;
          out.textContent = b;
        }
      }
      return;
    }

    // якщо нажата + - * /
    if (action.includes(key)) {
      sign = key;
      out.textContent = sign;
      return;
    }

    // якщо нажата "="
    if (key === "=") {
      if (b === "") b = a;
      switch (sign) {
        case "+":
          a = String(parseFloat(a) + parseFloat(b));
          break;
        case "-":
          a = String(parseFloat(a) - parseFloat(b));
          break;
        case "/":
          if (b === "0") {
            out.textContent = "Error";
            return;
          }
          a = String(parseFloat(a) / parseFloat(b));
          break;
        case "x":
          a = String(parseFloat(a) * parseFloat(b));
          break;
        case "%":
          a = String((parseFloat(a) / 100) * parseFloat(b));
          break;
      }
      finish = true;
      out.textContent = a;
      if (a.length > 7) {
        out.style.fontSize = "24px";
      }
    }
  };
});
