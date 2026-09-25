const correctAnswers = {
  A: "Living room",
  B: "Kitchen",
  CD: "Children rooms",
  E: "Parents suite",
  FGI: "Bathrooms",
  H: "Home office"
};

const answerIds = Object.keys(correctAnswers);


// ===============================
// UPDATE AVAILABLE OPTIONS
// ===============================

function updateOptions() {

  // Get all currently selected answers
  const selectedAnswers = {};

  answerIds.forEach(id => {
    const select = document.getElementById(`answer-${id}`);

    if (select.value !== "") {
      selectedAnswers[id] = select.value;
    }
  });


  // Update every dropdown
  answerIds.forEach(id => {

    const select = document.getElementById(`answer-${id}`);
    const currentValue = select.value;

    Array.from(select.options).forEach(option => {

      // Always keep the placeholder
      if (option.value === "") {
        return;
      }

      // Check if another question is already using this answer
      let alreadyUsed = false;

      Object.entries(selectedAnswers).forEach(([otherId, answer]) => {

        if (otherId !== id && answer === option.value) {
          alreadyUsed = true;
        }

      });

      option.hidden = alreadyUsed;
    });

    // Make sure the current selection stays visible
    select.value = currentValue;
  });
}


// ===============================
// WHEN AN ANSWER IS SELECTED
// ===============================

answerIds.forEach(id => {

  const select = document.getElementById(`answer-${id}`);

  select.addEventListener("change", function() {

    updateOptions();

    // Hide previous result if the student changes an answer
    document.getElementById("result").hidden = true;

  });

});


// ===============================
// SUBMIT
// ===============================

document.getElementById("answerForm").addEventListener("submit", function(event) {

  event.preventDefault();

  let score = 0;

  answerIds.forEach(id => {

    const select = document.getElementById(`answer-${id}`);

    if (select.value === correctAnswers[id]) {
      score++;
    }

  });


  const total = answerIds.length;
  const result = document.getElementById("result");

  result.hidden = false;

  result.innerHTML = `
    <strong>You got ${score} out of ${total} correct!</strong>
    <br>
    ${
      score === total
        ? "Excellent! 🎉"
        : "Check your answers and try again."
    }
  `;

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});


// ===============================
// RESET
// ===============================

document.getElementById("resetBtn").addEventListener("click", function() {

  answerIds.forEach(id => {

    const select = document.getElementById(`answer-${id}`);

    // Reset dropdown
    select.value = "";

    // Show every option again
    Array.from(select.options).forEach(option => {
      option.hidden = false;
    });

  });


  // Hide result
  const result = document.getElementById("result");

  result.hidden = true;
  result.innerHTML = "";

});


// Run once when page loads
updateOptions();
