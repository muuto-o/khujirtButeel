import { elements, strings, points } from "./base";
import { Questions } from "../model/questions";
//
// ###############################
//
// ДЭЛГЭЦЭНД ХАРАГДАХ ХЭСГИЙН КОД
//
// ###############################
//

export const startDontGetMade = () => {
  elements.mainMenuDiv.classList.add("hide-div");
  elements.donGetMadDiv.classList.remove("hide-div");
  elements.startBox.classList.add(strings.player1);
  elements.startBox.classList.add(strings.player2);
};

// шоог хаяж буй код
export const rollDice = (playerState) => {
  document
    .querySelector(`.${strings.player}-${playerState + 1}__dice-img`)
    .classList.add("shake");
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 6) + 1;

      document
        .querySelector(`.${strings.player}-${playerState + 1}__dice-img`)
        .classList.remove("shake");
      changeDiceNumber(number, playerState);
      resolve(number);
    }, 1500);
  });
  return promise;
};

// тоглогчдын хөдөлгөөнийг харуулах код
export const renderPlayerMovement = (i, position, playerState) => {
  let playerClass = playerState === 0 ? strings.player1 : strings.player2;

  document
    .querySelector(`.${strings.boxwNumber}-${position}`)
    .classList.remove(playerClass);
  document
    .querySelector(`.${strings.boxwNumber}-${position + 1}`)
    .classList.add(playerClass);
};

// тоглогчын дүрийг арилгах код
export const removePlayerIcon = (position, playerState) => {
  let playerClass = playerState === 0 ? strings.player1 : strings.player2;
  document
    .querySelector(`.${strings.boxwNumber}-${position}`)
    .classList.remove(playerClass);
};

// тоглогчын шоо орхих товчыг идэвхгүй болгох код
export const disableButton = (playerState) => {
  if (playerState === 0) {
    elements.player1DiceDiv.classList.add("disabled");
    elements.player2DiceDiv.classList.remove("disabled");
    elements.player1DiceBtn.disabled = true;
    elements.player2DiceBtn.disabled = false;
  } else {
    elements.player1DiceDiv.classList.remove("disabled");
    elements.player2DiceDiv.classList.add("disabled");
    elements.player1DiceBtn.disabled = false;
    elements.player2DiceBtn.disabled = true;
  }
};

// асуултыг харуулах код
export const renderQuestion = (number) => {
  const html = `
    <div class="question-div ">${Questions[number].question}</div>
    <div class="answer-div">
        <div class="answer-box ans-a">A. ${Questions[number].answers[0]}</div>
        <div class="answer-box ans-b">B. ${Questions[number].answers[1]}</div>
        <div class="answer-box ans-c">C. ${Questions[number].answers[2]}</div>
        <div class="answer-box ans-d">D. ${Questions[number].answers[3]}</div>
    </div>
    `;
  elements.questionContainer.innerHTML = html;
  elements.donGetMadDiv.classList.add(strings.filterDiv);
  elements.questionContainer.classList.remove(strings.hideDiv);

  disableBothButtons();
};

// асуултыг алга болгох код
export const hideQuestion = (playerState) => {
  elements.questionContainer.innerHTML = "";
  elements.donGetMadDiv.classList.remove(strings.filterDiv);
  elements.questionContainer.classList.add(strings.hideDiv);
  disableButton(playerState);
};

// ялагчыг харах код
export const winnerWindow = (playerState) => {
  let playerClass = playerState === 0 ? strings.player1 : strings.player2;
  const html = `
    <div class="winner-div">
      <h1>Баяр xүргэе!</h1>
      <div class="winner-icon ${playerClass}"></div>
      <a href="" class="retry-button">Дахин тоглох</a>
    </div>
    `;

  elements.winnerContainer.innerHTML = html;
  elements.donGetMadDiv.classList.add(strings.filterDiv);
  elements.winnerContainer.classList.remove(strings.hideDiv);

  disableBothButtons();
};

//
//  private functions
//

// үоог орхиход буусан тоог дэлгэцэнд харуулах код
const changeDiceNumber = (number, playerState) => {
  if (playerState === 0) {
    elements.player1DiceImg.src = `${strings.diceImgSrc}-${number}.${strings.diceImgExtension}`;
  } else {
    elements.player2DiceImg.src = `${strings.diceImgSrc}-${number}.${strings.diceImgExtension}`;
  }
};

// тоглогчийн шоог орхих 2 товчийг 2ууланг идэвхгүй болгох код
const disableBothButtons = () => {
  elements.player1DiceDiv.classList.add("disabled");
  elements.player2DiceDiv.classList.add("disabled");
  elements.player1DiceBtn.disabled = true;
  elements.player2DiceBtn.disabled = true;
};

// асуулттай нүднүүдэд очисон эсэхийг шалгах код
const findElementFromArray = (position) =>
  points.questionBoxes.nums.findIndex((el) => el === position);
