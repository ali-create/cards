let allCards = document.querySelectorAll(".card");
let cardNames = document.querySelectorAll(".cardName");
let holdVar;
let deleteCount = 0;
let curClass = [];
const cardHolder = document.querySelector(".cardHolder");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupInner = document.querySelector(".popup--inner");
const newPerson = document.querySelector(".new--person");
const nameInput = document.querySelector(".name--input");
const refreshCards = () => {
  allCards = document.querySelectorAll(".card");
  cardNames = document.querySelectorAll(".cardName");
  document.querySelector(".stats").innerHTML = ` ${Math.round(
    (sortColors()[0] / allCards.length) * 100
  )}% green <br> ${Math.round(
    (sortColors()[1] / allCards.length) * 100
  )}% yellow <br> ${Math.round(
    (sortColors()[2] / allCards.length) * 100
  )}% red`;

  allCards.forEach(function (cur, i) {
    cur.setAttribute("cardNum", i);
  });
};

/*

rgb(50, 205, 50) === green
rgb(255, 255, 0) === yellow
rgb(255, 0, 0) === red

*/

const sortColors = function () {
  const colors = [];
  const colorsHuman = [];
  const numHuman = [];
  let greenNum = 0;
  let redNum = 0;
  let yellowNum = 0;
  allCards.forEach(function (element) {
    colors.push(getComputedStyle(element.children[0]).backgroundColor);
  });
  colors.forEach(function (cur, i) {
    if (colors[i] == "rgb(255, 0, 0)") {
      colorsHuman.push("red");
      redNum++;
    } else if (colors[i] == "rgb(50, 205, 50)") {
      colorsHuman.push("green");
      greenNum++;
    } else if (colors[i] == "rgb(255, 255, 0)") {
      colorsHuman.push("yellow");
      yellowNum++;
    }
  });
  numHuman.push(greenNum);
  numHuman.push(yellowNum);
  numHuman.push(redNum);
  return numHuman;
};
const removeCard = function (element) {
  refreshCards();
  element.parentNode.remove();
  deleteCount++;

  refreshCards();
};
const closePopupChangeName = function () {
  holdVar.textContent = document.querySelector(".new--name").value;
  toggleOverlay();
};
const changeName = function (element) {
  holdVar = element;
  popupInner.innerHTML = 'Change Name <br>to:<br> <input class="new--name">';
  document.querySelector(".new--name").value = element.textContent;
  toggleOverlay();
};
const toggleOverlay = function () {
  overlay.classList.toggle("hidden");
  popup.classList.toggle("hidden");
};
const buttonEventListener = function (element, currentBtn) {
  setCardColor(element.getAttribute("cardNum"), element, currentBtn);
};

const createNewCard = function (name) {
  refreshCards();
  const html = ` <div class="card" cardNum="${allCards.length}">
  <div class="card--color"></div>
  <br />
  <span class='cardName' onclick='changeName(this)'>${name}</span>
  <br />
  <div class="color--holder">
    <button
      class="change--color red"
      onclick="buttonEventListener(this.parentElement.parentElement, this)"
    ></button>
    <button
      class="change--color yellow"
      onclick="buttonEventListener(this.parentElement.parentElement, this)"
    ></button>
    <button
      class="change--color limegreen"
      onclick="buttonEventListener(this.parentElement.parentElement, this)"
    ></button>

  </div>
  <br>
  <button class='removePerson' onclick='removeCard(this)'>Remove</button>`;
  cardHolder.insertAdjacentHTML("beforeend", html);
  refreshCards();
};

const setCardColor = function (cardNum, element, btn) {
  refreshCards();

  allCards[element.getAttribute("cardNum")].children[0].style.backgroundColor =
    btn.classList[1].toString();

  document.querySelector(".stats").innerHTML = ` ${Math.round(
    (sortColors()[0] / allCards.length) * 100
  )}% green <br> ${Math.round(
    (sortColors()[1] / allCards.length) * 100
  )}% yellow <br> ${Math.round(
    (sortColors()[2] / allCards.length) * 100
  )}% red`;
};

newPerson.addEventListener("click", function () {
  if (nameInput.value.trim()) {
    createNewCard(nameInput.value);
    document.querySelector(".stats").innerHTML = ` ${Math.round(
      (sortColors()[0] / allCards.length) * 100
    )}% green <br> ${Math.round(
      (sortColors()[1] / allCards.length) * 100
    )}% yellow <br> ${Math.round(
      (sortColors()[2] / allCards.length) * 100
    )}% red`;
  }
});

const saveClass = function () {
  curClass = [];
  allCards.forEach(function (_, i) {
    curClass.push(allCards[i].children[2].textContent);
  });
  return curClass.toString();
};

const loadClass = function (currClass) {
  const mainArr = currClass.split(",");
  mainArr.forEach(function (cur) {
    createNewCard(cur);
    refreshCards();
    document.querySelector(".stats").innerHTML = ` ${Math.round(
      (sortColors()[0] / allCards.length) * 100
    )}% green <br> ${Math.round(
      (sortColors()[1] / allCards.length) * 100
    )}% yellow <br> ${Math.round(
      (sortColors()[2] / allCards.length) * 100
    )}% red`;
  });
};

document.addEventListener("keydown", function (e) {
  if (!e.key == "e") return;

  loadClass(prompt("Enter Class:"));
});
