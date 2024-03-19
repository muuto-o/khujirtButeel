export default class Player {
  constructor() {
    this.position = 1;
    this.passedQuestions = [false, false, false, false];
    this.questionIndex = -1;
    this.posBeforeBonus = 0;
  }

  setPosition(position) {
    this.position = position;
  }

  increasePosition() {
    this.position = this.position + 1;
  }

  getPosition() {
    return this.position;
  }

  setQuestionIndex(questionIndex) {
    this.questionIndex = questionIndex;
  }

  getQuestionIndex() {
    return this.questionIndex;
  }

  modifyPassedQuestions(index) {
    this.passedQuestions[index] = true;
  }

  getQuestions() {
    return this.passedQuestions;
  }

  getPassedQuestions(index) {
    if (index === -1) {
      return false;
    } else return this.passedQuestions[index];
  }

  setPosBeforeBonus(position) {
    this.posBeforeBonus = position;
  }
  getPosBeforeBonus(position) {
    return this.posBeforeBonus;
  }
}
