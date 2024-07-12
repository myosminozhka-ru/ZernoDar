import "./import/modules";

const inputs = document.querySelectorAll(".code-input");

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1) {
      if (index !== inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      if (input.value.length === 0 && index !== 0) {
        inputs[index - 1].focus();
        inputs[index - 1].value = "";
      } else {
        input.value = "";
      }
    } else if (event.key.length === 1 && /\d/.test(event.key)) {
      input.value = "";
    }
  });
});

inputs[inputs.length - 1].addEventListener("input", () => {
  if (inputs[inputs.length - 1].value.length === 1) {
    inputs[inputs.length - 1].blur();
  }
});
