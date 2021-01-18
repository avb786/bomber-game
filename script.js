const bomberDivWrap = document.querySelector("#bomber-div");
const bombArr = [];
const insertClickDivs = [];
let score = 0;
while (bombArr.length < 10) {
  var r = Math.floor(Math.random() * 81) + 1;
  if (bombArr.indexOf(r) === -1) bombArr.push(r);
}
let count = 0;
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    const bombsDivs = document.createElement("div");
    bombsDivs.setAttribute("id", `cell_${++count}`);
    bombsDivs.setAttribute("class", "bombs-div");
    bomberDivWrap.appendChild(bombsDivs);
  }
}

const bomberDivClick = (event) => {
  let insertData = event.toElement.id.replace(/_/gi, " ");
  if (!insertClickDivs.includes(Number(insertData.slice(5)))) {
    insertClickDivs.push(Number(insertData.slice(5)));
  }
  let bombFound = insertClickDivs.find((val) => bombArr.includes(val));
  if (bombFound) {
    displayAllBombsAndStopClick();
  } else {
    displayAllSuccessDivs();
  }
};

function displayAllSuccessDivs() {
  for (const pass of insertClickDivs) {
    const divShows = document.querySelector(`#cell_${pass}`);
    divShows.style.backgroundColor = `green`;
    divShows.removeEventListener("click", bomberDivClick);
  }
  const gameScore = document.querySelector(`#gameScore`);
  gameScore.innerHTML = ++score;

  if (score === 71) {
    const score = document.querySelector("#resultDisplay");
    score.innerHTML = "win";
    score.style.fontSize = `20px`;
    score.style.color = `green`;
  }
}
function displayAllBombsAndStopClick() {
  // Show all the bombs
  for (const bomb of bombArr) {
    const bombShows = document.querySelector(`#cell_${bomb}`);
    bombShows.style.background = `url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)`;
    bombShows.style.backgroundColor = `red`;
    bombShows.style.backgroundSize = `cover`;
  }
  //   Remove Event listener if bomb found
  const listnerDivs = document.querySelectorAll(".bombs-div");
  listnerDivs.forEach((ele) => {
    ele.removeEventListener("click", bomberDivClick);
  });
  const score = document.querySelector("#resultDisplay");
  score.innerHTML = "game over";
  score.style.fontSize = `20px`;
  score.style.color = `red`;
}
const listnerDivs = document.querySelectorAll(".bombs-div");
listnerDivs.forEach((ele) => {
  ele.addEventListener("click", bomberDivClick);
});

const resetbutton = document.querySelector("#resetButton");
resetbutton.addEventListener("click", () => {
  window.location.reload();
});
