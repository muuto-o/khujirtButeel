export default class Player {
  // байгуулагч функц
  constructor() {
    // тоглогчийн байрлалыг хадгалах хувьсагч
    this.position = 1;
    // тоглогч асуултад хариулсан эсэхийг халгалах массив
    this.passedQuestions = [false, false, false, false];
    // тоглогчийн аль асуулттай нүдэнд байгааг хадгалах код
    this.questionIndex = -1;
    // аль саарал нүдэнд байгааг хадгалах хувьсагч
    this.posBeforeBonus = 0;
  }

  // тоглогчын байрлалыг тохируулах функц
  setPosition(position) {
    this.position = position;
  }

  // тоглогчын байрлалыг нэгээр нэмэгдүүлэх функц
  increasePosition() {
    this.position = this.position + 1;
  }

  // тоглогчын байрлалыг буцаах функц
  getPosition() {
    return this.position;
  }

  // тоглогчын асуултанд хариулсан нүдийг тохируулах функц
  setQuestionIndex(questionIndex) {
    this.questionIndex = questionIndex;
  }

  // тоглогчийн аль асуулттай нүдэнд байгааг буцаах код
  getQuestionIndex() {
    return this.questionIndex;
  }

  // тоглогчийн асуултанд хариулсанг тохируулах код
  modifyPassedQuestions(index) {
    this.passedQuestions[index] = true;
  }

  // аль саарал нүдэнд байгааг хадгалах хувьсагчийн утгыг буцаах код
  getQuestions() {
    return this.passedQuestions;
  }

  // тоглогчийн асуултанд хариулсан эсэхийг шалгах код
  getPassedQuestions(index) {
    if (index === -1) {
      return false;
    } else return this.passedQuestions[index];
  }

  // тоглогчийг аль саарал нүдэнд байсныг тохируулах функц
  setPosBeforeBonus(position) {
    this.posBeforeBonus = position;
  }
  // тоглогчийг аль саарал нүдэнд байсныг тохируулах функц
  getPosBeforeBonus() {
    return this.posBeforeBonus;
  }
}
