import { elements, strings, points } from "./view/base";
import Player from "./model/dontGetMad";
import * as dontGetMadView from "./view/dontGetMadView";
import { Questions } from "./model/questions";

// хувьсагчуудыг хадгалах state объект.
const state = {
  players: [],
};

// Тоглогчийн байрлалыг аргументээр аваад questionBoxes объектын nums тассиваас хайж индексийг буцаах функц
const findElementFromArray = (position) =>
  points.questionBoxes.nums.findIndex((el) => el === position);

//  state объектын players массив дотор 2 тоглогчийн объектийг үүсгэнэ.
const startDontGetMad = () => {
  dontGetMadView.startDontGetMade();

  // тоглогчийн ээлжийг хадгалах хувьсагч
  // 0 бол эхний тоглогч, 1 бол хоёр дахь тоглогч
  state.playerState = 0;

  state.players.push(new Player());
  state.players.push(new Player());
  // тоглогчийг хэд дэх асуулт дээр явааг хадгалах хувьсагч
  // -1 бол асуулттай нүдэнд очоогүй, бусад үед асуулттай нүдэнд очно.
  state.questionIndex = -1;
};

//
elements.donGetMadBtn.addEventListener("click", startDontGetMad);

const movePlayer = async (e) => {
  if (state.playerState !== 0 && state.playerState !== 1) startDontGetMad();

  // DOM дээр аль товч дарагдаж байгааг харгалзан тоглогчийн ээлжийг олох код
  if (e.target.classList.contains(strings.player1RollDiceBtn)) {
    state.playerState = 0;
  } else if (e.target.classList.contains(strings.player2RollDiceBtn)) {
    state.playerState = 1;
  }

  state.questionIndex = state.players[state.playerState].getQuestionIndex();

  // шооны буусан нүдыг хадгалах number хувьсагч
  let number = await dontGetMadView.rollDice(state.playerState);
  // тоглогчийг бонус нүдэнд очсон бол тоглогчын дүрсийг шилжсэн нүднээс аригах код
  if (state.players[state.playerState].getPosBeforeBonus() !== 0) {
    dontGetMadView.removePlayerIcon(
      state.players[state.playerState].getPosBeforeBonus(),
      state.playerState
    );
  }

  // тоглогчын шооны нүдний дагуу урагшлуулах кодын хэсэг
  for (let i = 0; i < number; i++) {
    // тоглогчийн модел Class-аас тоглогчын байрлалыг авах
    let position = state.players[state.playerState].getPosition();
    // Хэрвээ тоглогчын байрлал 100 тэнцүү бол тоглоомыг дуусгах хэсэг
    if (position === 10) {
      //
      setTimeout(() => {
        // явагчын цонхыг гаргаж ирэх
        dontGetMadView.winnerWindow(state.playerState);
      }, 200 * (i + 1));
      return;
    }
    // Тоглогчийн байрлалын дараагийн нүд асуулттай нүд эсэхийг шалгана.
    let result = findElementFromArray(position + 1);
    // тоглогчийг дэлгэцэн дээр хөдөлж байгааг нь харуулна.
    setTimeout(() => {
      dontGetMadView.renderPlayerMovement(i, position, state.playerState);
    }, (i + 1) * 200);
    // хэрвээ тоглогчын байрлаж буй нүд асуулттай нүд бол ажиллах код
    if (result !== -1) {
      state.players[state.playerState].setQuestionIndex(result);

      // хэрвээ тоглогч тухайн нүдний асуултад анх удаа таарж буй эсвэл хариулж чадаагүй бол ажиллах код
      if (!state.players[state.playerState].getPassedQuestions(result)) {
        state.questionNumber = Math.floor(Math.random() * Questions.length);
        console.log(state.questionNumber);

        setTimeout(() => {
          // асуултын цонхыг дэлгэцэнд харуулж буй код
          dontGetMadView.renderQuestion(state.questionNumber);
        }, (i + 1) * 220);
        // тоглогч асуулттай нүдийг хэтэрч явахгүйн тулд for давталтыг зогсоож буй хэсэг
        i = number;
      }
      // тоглогчийн байрлаж буй нүд асуулттай биш бол ажиллах код
    } else {
      // тоглогчийн байрлалыг нэгээр нэмэгдүүлнэ.
      state.players[state.playerState].increasePosition();
    }
  }

  // тоглогчийн нүүж дууссаны дараах байрлалыг curPosition хувьсагчид хадгална.
  let curPosition = state.players[state.playerState].getPosition();
  // хэрвээ одоогийн байрлал нь саарал нод байвал 11 нүд алгасна.
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

// асуултыг хариултыг шалгах функц
const checkAnswer = (answer) => {
  console.log("answer" + answer);
  if (answer === Questions[state.questionNumber].key) {
    state.players[state.playerState].modifyPassedQuestions(state.questionIndex);
    document.querySelector("." + answer).style.borderColor = "green";
    document.querySelector("." + answer).style.borderWidth = "5px";
    document.querySelector("." + answer).style.color = "green";
    setTimeout(() => {
      dontGetMadView.hideQuestion(state.playerState);
      state.players[state.playerState].increasePosition();
    }, 2000);
  } else {
    document.querySelector("." + answer).style.borderColor = "red";
    document.querySelector("." + answer).style.borderWidth = "5px";
    document.querySelector("." + answer).style.color = "red";
    setTimeout(() => {
      dontGetMadView.hideQuestion(state.playerState);
    }, 2000);
  }
};

elements.questionContainer.addEventListener("click", (e) => {
  const targetBoxClassList = e.target.classList;
  // асуултын аль хариултыг дарж буйг авах код
  if (targetBoxClassList.contains(strings.answerBox)) {
    checkAnswer(targetBoxClassList[1]);
  }
});
// window.addEventListener('load', );
