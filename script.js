```javascript
const rooms = [
  "Living room",
  "Kitchen",
  "Children rooms",
  "Parents suite",
  "Bathrooms",
  "Home office"
];

const correctAnswers = {
  A: "Living room",
  B: "Kitchen",
  C: "Children rooms",
  D: "Children rooms",
  E: "Parents suite",
  F: "Bathrooms",
  G: "Bathrooms",
  H: "Home office",
  I: "Bathrooms"
};

const answers = document.getElementById("answers");

Object.keys(correctAnswers).forEach(letter => {

  const row = document.createElement("div");
  row.className = "answer-row";

  const label = document.createElement("label");
  label.setAttribute("for", `answer-${letter}`);
  label.textContent = `${letter}:`;

  const select = document.createElement("select");
  select.id = `answer-${letter}`;
  select.name = letter;
  select.required = true;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choose an area...";
  placeholder.disabled = true;
  placeholder.selected = true;

  select.appendChild(placeholder);

  rooms.forEach(room => {

    const option = document.createElement("option");

    option.value = room;
    option.textContent = room;

    select.appendChild(option);

  });

  row.appendChild(label);
  row.appendChild(select);

  answers.appendChild(row);
});


document.getElementById("answerForm").addEventListener("submit", event => {

  event.preventDefault();

  let score = 0;

  const total = Object.keys(correctAnswers).length;

  Object.entries(correctAnswers).forEach(([letter, answer]) => {

    const value =
      document.getElementById(`answer-${letter}`).value;

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

  Object.keys(correctAnswers).forEach(letter => {

    document.getElementById(`answer-${letter}`).selectedIndex = 0;

  });

  document.getElementById("result").hidden = true;

});
```
