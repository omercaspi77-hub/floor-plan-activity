const correctAnswers = {
  A: "Living room",
  B: "Kitchen",
  CD: "Children rooms",
  E: "Parents suite",
  FGI: "Bathrooms",
  H: "Home office"
};

document.getElementById("answerForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let score = 0;
  const total = Object.keys(correctAnswers).length;

  Object.entries(correctAnswers).forEach(([id, correctAnswer]) => {
    const selectedAnswer = document.getElementById(`answer-${id}`).value;

    if (selectedAnswer === correctAnswer) {
      score++;
    }
  });

  const result = document.getElementById("result");

  result.hidden = false;

  if (score === total) {
    result.innerHTML = `
      <strong>Your score: ${score}/${total}</strong><br>
      Excellent! You identified all the areas correctly.
    `;
  } else {
    result.innerHTML = `
      <strong>Your score: ${score}/${total}</strong><br>
      Check your answers and try again.
    `;
  }

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});


document.getElementById("resetBtn").addEventListener("click", function() {

  Object.keys(correctAnswers).forEach(id => {
    document.getElementById(`answer-${id}`).selectedIndex = 0;
  });

  document.getElementById("result").hidden = true;
});
