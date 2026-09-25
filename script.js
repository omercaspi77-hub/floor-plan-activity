
const correctAnswers = {
  A: "Living room",
  B: "Kitchen",
  CD: "Children rooms",
  E: "Parents suite",
  FGI: "Bathrooms",
  H: "Home office"
};

document.getElementById("answerForm").addEventListener("submit", event => {
  event.preventDefault();

  let score = 0;
  const total = Object.keys(correctAnswers).length;

  Object.entries(correctAnswers).forEach(([id, answer]) => {
    const value = document.getElementById(`answer-${id}`).value;

    if (value === answer) {
      score++;
    }
  });

  const result = document.getElementById("result");

  result.hidden = false;

  result.innerHTML = `
    <strong>Your score: ${score}/${total}</strong><br>
    ${
      score === total
        ? "Excellent! You identified all the areas correctly."
        : "Check your answers and try again."
    }
  `;

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {

  Object.keys(correctAnswers).forEach(id => {
    document.getElementById(`answer-${id}`).selectedIndex = 0;
  });

  document.getElementById("result").hidden = true;
});
```
