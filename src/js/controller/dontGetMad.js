import { elements, strings, points } from "../view/base";
import Player from "../model/dontGetMad";
import * as dontGetMadView from "../view/dontGetMadView";
import { Questions } from "../model/questions";

const state = {
  players: [],
};

const DEFAULT_END_BOX = 100;

const findElementFromArray = (position) =>
  points.questionBoxes.nums.findIndex((el) => el === position);

const getBoardEndBox = () => {
  const boardBoxes = [...document.querySelectorAll(".box_container .box")]
    .map((box) => {
      const boxClass = [...box.classList].find((className) =>
        className.startsWith("box-")
      );

      return boxClass ? Number(boxClass.split("-")[1]) : NaN;
    })
    .filter((boxNumber) => Number.isFinite(boxNumber));

  return boardBoxes.length ? Math.max(...boardBoxes) : DEFAULT_END_BOX;
};

const reconcileQuestionCheckpoints = (endBox) => {
  const boardCheckpoints = [...document.querySelectorAll(".checkpoint-box")]
    .map((checkpoint) => {
      const checkpointClass = [...checkpoint.classList].find((className) =>
        className.startsWith("box-")
      );

      return checkpointClass ? Number(checkpointClass.split("-")[1]) : NaN;
    })
    .filter((checkpointNumber) => Number.isFinite(checkpointNumber))
    .filter((checkpointNumber) => checkpointNumber <= endBox)
    .sort((a, b) => a - b);

  points.questionBoxes.nums = boardCheckpoints;
  points.questionBoxes.isPassed = boardCheckpoints.map(() => false);
};

const startDontGetMad = () => {
  dontGetMadView.startDontGetMade();

  state.playerState = 0;
  state.bonusMoves = 11;
  state.endBox = getBoardEndBox();

  reconcileQuestionCheckpoints(state.endBox);

  state.players = [new Player(), new Player()];
  state.questionIndex = -1;
  state.questionNumber = -1;
};

const movePlayer = async (e) => {
  if (state.playerState !== 0 && state.playerState !== 1) startDontGetMad();

  if (e.target.classList.contains(strings.player1RollDiceBtn)) {
    state.playerState = 0;
  } else if (e.target.classList.contains(strings.player2RollDiceBtn)) {
    state.playerState = 1;
  }

  state.questionIndex = state.players[state.playerState].getQuestionIndex();

  const number = await dontGetMadView.rollDice(state.playerState);

  for (let i = 0; i < number; i++) {
    const position = state.players[state.playerState].getPosition();
    const result = findElementFromArray(position + 1);

    setTimeout(() => {
      dontGetMadView.renderPlayerMovement(position, state.playerState);
    }, (i + 1) * 200);

    if (result === -1) {
      state.players[state.playerState].increasePosition();

      if (position + 1 === state.endBox) {
        setTimeout(() => {
          dontGetMadView.winnerWindow(state.playerState);
        }, 200 * (i + 2));
        i = number;
        return;
      }
    } else {
      state.players[state.playerState].setQuestionIndex(result);

      if (!state.players[state.playerState].getPassedQuestions(result)) {
        state.questionNumber = Math.floor(Math.random() * Questions.length);

        setTimeout(() => {
          dontGetMadView.renderQuestion(state.questionNumber);
        }, (i + 1) * 220);

        i = number;
      }
    }
  }

  const curPosition = state.players[state.playerState].getPosition();

  if (points.greyBoxes.nums.includes(curPosition)) {
    dontGetMadView.renderBonusMovement(
      curPosition,
      state.bonusMoves,
      state.playerState
    );

    for (let i = 0; i < state.bonusMoves; i++) {
      state.players[state.playerState].increasePosition();
    }
  }

  dontGetMadView.disableButton(state.playerState);
};

const checkAnswer = (answer) => {
  if (answer === Questions[state.questionNumber].key) {
    state.players[state.playerState].modifyPassedQuestions(state.questionIndex);
    document.querySelector(`.${answer}`).style.borderColor = "green";
    document.querySelector(`.${answer}`).style.borderWidth = "5px";
    document.querySelector(`.${answer}`).style.color = "green";

    setTimeout(() => {
      const currentPosition = state.players[state.playerState].getPosition();
      dontGetMadView.hideQuestion(state.playerState);
      dontGetMadView.renderPlayerMovement(currentPosition, state.playerState);
      state.players[state.playerState].increasePosition();
    }, 2000);
  } else {
    document.querySelector(`.${answer}`).style.borderColor = "red";
    document.querySelector(`.${answer}`).style.borderWidth = "5px";
    document.querySelector(`.${answer}`).style.color = "red";

    setTimeout(() => {
      dontGetMadView.hideQuestion(state.playerState);
    }, 2000);
  }
};

export const initDontGetMadController = () => {
  elements.donGetMadBtn.addEventListener("click", startDontGetMad);
  elements.player1DiceBtn.addEventListener("click", movePlayer);
  elements.player2DiceBtn.addEventListener("click", movePlayer);

  elements.questionContainer.addEventListener("click", (e) => {
    const targetBoxClassList = e.target.classList;

    if (targetBoxClassList.contains(strings.answerBox)) {
      checkAnswer(targetBoxClassList[1]);
    }
  });
};
