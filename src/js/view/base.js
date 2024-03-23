export const elements = {
  mainMenuDiv: document.querySelector(".main-menu"),

  donGetMadDiv: document.querySelector(".dont-get-mad__div"),
  donGetMadBtn: document.querySelector(".dont-get-mad__btn"),
  questionContainer: document.querySelector(".question-container"),
  winnerContainer: document.querySelector(".winner-container"),
  answerBox: document.querySelector(".answer-box"),
  startBox: document.querySelector(".start-box"),

  //  Dice strings
  player1DiceBtn: document.querySelector(".player-1__roll-dice-btn"),
  player1DiceImg: document.querySelector(".player-1__dice-img"),
  player1DiceDiv: document.querySelector(".dice-div__player1"),
  player2DiceBtn: document.querySelector(".player-2__roll-dice-btn"),
  player2DiceImg: document.querySelector(".player-2__dice-img"),
  player2DiceDiv: document.querySelector(".dice-div__player2"),
  diceBtn: document.querySelector(".dice-btn"),
  diceImg: document.querySelector(".dice-img"),
};

export const strings = {
  filterDiv: "filter-div",
  hideDiv: "hide-div",
  answerBox: "answer-box",
  player: "player",
  player1: "player-1",
  player1RollDiceBtn: "player-1__roll-dice-btn",
  player2: "player-2",
  player2RollDiceBtn: "player-2__roll-dice-btn",
  boxwNumber: "box",
  diceImgSrc: "./img/dice",
  diceImgExtension: "png",
};

export const points = {
  questionBoxes: {
    nums: [7, 32, 57, 82],
    isPassed: [false, false, false, false],
  },
  greyBoxes: {
    nums: [14, 39, 64],
    isPassed: [false, false, false, false],
  },
};
