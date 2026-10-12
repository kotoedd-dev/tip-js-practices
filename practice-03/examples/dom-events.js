const counterElement = document.querySelector("#counter");
const incrementButton = document.querySelector("#increment");
const resetButton = document.querySelector("#reset");
const messageElement = document.querySelector("#message");

let count = 0;

function renderCounter() {
  counterElement.textContent = `Количество нажатий: ${count}`;
  messageElement.textContent =
    count === 0 ? "Нажмите кнопку, чтобы начать." : `Нажатий: ${count}`;
}

incrementButton.addEventListener("click", () => {
  count += 1;
  renderCounter();
});

resetButton.addEventListener("click", () => {
  count = 0;
  renderCounter();
});

renderCounter();