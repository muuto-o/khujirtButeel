import { elements, strings, points } from "./view/base";
import Player from "./model/dontGetMad";
import * as dontGetMadView from "./view/dontGetMadView";
import { Questions } from "./model/questions";

const state = {
  players: [],
};

const findElementFromArray = (position) =>
  points.questionBoxes.nums.findIndex((el) => el === position);

const startDontGetMad = () => {
  dontGetMadView.startDontGetMade();

  state.playerState = 0;
  state.players.push(new Player());
  state.players.push(new Player());
  state.questionIndex = -1;
};

elements.donGetMadBtn.addEventListener("click", startDontGetMad);

const movePlayer = async (e) => {
  if (state.playerState !== 0 && state.playerState !== 1) startDontGetMad();

  if (e.target.classList.contains(strings.player1RollDiceBtn)) {
    state.playerState = 0;
  } else if (e.target.classList.contains(strings.player2RollDiceBtn)) {
    state.playerState = 1;
  }

  state.questionIndex = state.players[state.playerState].getQuestionIndex();
  let number = await dontGetMadView.rollDice(state.playerState);
  number = 7;
  if (state.players[state.playerState].getPosBeforeBonus() !== 0) {
    dontGetMadView.removePlayerIcon(
      state.players[state.playerState].getPosBeforeBonus(),
      state.playerState
    );
  }
  for (let i = 0; i < number; i++) {
    let position = state.players[state.playerState].getPosition();
    if (position === 6) {
      dontGetMadView.winnerWindow(state.playerState);
      return;
    }
    let result = findElementFromArray(position + 1);
    setTimeout(() => {
      dontGetMadView.renderPlayerMovement(i, position, state.playerState);
    }, (i + 1) * 200);

    if (result !== -1) {
      state.players[state.playerState].setQuestionIndex(result);

      if (!state.players[state.playerState].getPassedQuestions(result)) {
        state.questionNumber = Math.floor(Math.random() * Questions.length);
        console.log(state.questionNumber);
        setTimeout(() => {
          dontGetMadView.renderQuestion(state.questionNumber);
        }, (i + 1) * 220);
        i = number;
      }
    } else {
      state.players[state.playerState].increasePosition();
    }
  }

  let curPosition = state.players[state.playerState].getPosition();
  if (points.greyBoxes.nums.includes(curPosition)) {
    state.players[state.playerState].setPosBeforeBonus(curPosition);
    for (let i = 0; i < 11; i++)
      state.players[state.playerState].increasePosition();
  } else {
    state.players[state.playerState].setPosBeforeBonus(0);
  }
  dontGetMadView.disableButton(state.playerState);
};
elements.player1DiceBtn.addEventListener("click", movePlayer);

elements.player2DiceBtn.addEventListener("click", movePlayer);

const checkAnswer = (answer) => {
  if (answer === Questions[state.questionNumber].key) {
    state.players[state.playerState].modifyPassedQuestions(state.questionIndex);
    console.log(
      "getPassedQuestion: " +
        state.players[state.playerState].getPassedQuestions(state.questionIndex)
    );
    dontGetMadView.hideQuestion(state.playerState);
    state.players[state.playerState].increasePosition();
  } else {
    dontGetMadView.hideQuestion(state.playerState);
  }
};

elements.questionContainer.addEventListener("click", (e) => {
  const targetBoxClassList = e.target.classList;

  if (targetBoxClassList.contains(strings.answerBox)) {
    checkAnswer(targetBoxClassList[1]);
  }
});
// window.addEventListener('load', );
