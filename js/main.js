//Letters And Variables Define
const LettersArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const Words = {
  Programming: [
    "PHP",
    "Javascript",
    "Python",
    "Java",
    "Kotlin",
    "TypeScript",
    "Swift",
    "Ruby",
    "SQL",
    "HTML",
    "CSS",
    "Perl",
  ],
  Movies: [
    "Babylon",
    "Inception",
    "Interstellar",
    "Parasite",
    "Coco",
    "Creed",
    "Joker",
  ],
  People: [
    "Einstein",
    "Hitler",
    "Newton",
    "Lincoln",
    "Gandhi",
    "Aristotle",
    "Messi",
    "Ronaldo",
  ],
  Countries: [
    "USA",
    "Russia",
    "Egypt",
    "Syria",
    "Tunisia",
    "Canada",
    "Sudan",
    "Palestine",
    "Qatar",
    "Brazil",
    "Portugal",
  ],
};
let WrongAttemps = 0;
let SuccessLetters = 0;

//Get Elements of Document
const LettersContainer = document.getElementById("letters");
const WordElement = document.getElementById("word-from");
const LetterGuessContainer = document.getElementById("letter-guess-container");
const HangDiv = document.getElementById("hang");
const ManHeadDiv = document.getElementById("man-head");
const ManHandDiv = document.getElementById("man-hand");
const ManLegDiv = document.getElementById("man-leg");
const ManMainBodyDiv = document.getElementById("man-main-body");
const WordIsSpan = document.getElementById("word-is");
const FailedModelBTN = document.getElementById("failed-modal-open-btn");
const SuccessModelBTN = document.getElementById("success-modal-open-btn");
const SuccessSound = new Audio("../sounds/success.mp3");
const FailSound = new Audio("../sounds/fail.mp3");

//Get Random Category And Random Word
let WordsCategories = Array.from(Object.keys(Words));
let RandomCategory = WordsCategories[Math.floor(Math.random() * 4)];
let RandomCategoryWords = Words[RandomCategory];
let RandomWord =
  RandomCategoryWords[Math.floor(Math.random() * RandomCategoryWords.length)];
let RandomWordCharsArr = Array.from(RandomWord);

//Show Letters Function
function ShowLetters() {
  let LettersHTML = "";
  for (let Letter of LettersArr) {
    LettersHTML += `<div class="letter-box d-flex justify-content-center align-items-center fw-semibold text-light bg-success mx-2">${Letter}</div>`;
  }
  LettersContainer.innerHTML = LettersHTML;
}

//Show Random Category Function
function ShowCategoryName() {
  WordElement.innerHTML = RandomCategory;
}

//Show The Word After Game Over
function GameOverWordShow() {
  WordIsSpan.innerHTML = RandomWord;
}

//Show Guess Word Divs Based On No. Of Its Chars
function ShowGuessWordDivs() {
  let WordLettersDivs = "";
  RandomWordCharsArr.forEach((char, index) => {
    WordLettersDivs += ` <div class="word-char"></div>`;
  });
  LetterGuessContainer.innerHTML = WordLettersDivs;
}

//Open Success Modal and Success Sound If Word Completed Successfully
function OpenSuccessModal(GuessLettersArray) {
  if (SuccessLetters == GuessLettersArray.length) {
    SuccessSound.play();
    SuccessModelBTN.click();
  }
}

//Open Fail Modal and Fail Sound If Word Not Completed
function OpenFailModal() {
  FailSound.play();
  FailedModelBTN.click();
}

//Page Reload Function
function PageReload() {
  location.reload();
}

//Show Hand And Man Based On Number Of Wrong Attemps
function WrongAttempsCheck(WrongAttempsNumber) {
  switch (WrongAttempsNumber) {
    case 1:
      HangDiv.style.display = "Block";
      break;
    case 2:
      HangDiv.classList.add("hang-after");
      break;
    case 3:
      HangDiv.classList.add("hang-before");
      break;
    case 4:
      ManHeadDiv.style.display = "flex";
      ManMainBodyDiv.style.display = "block";
      break;
    case 5:
      ManHandDiv.style.display = "block";
      break;
    case 6:
      ManLegDiv.style.display = "block";
      OpenFailModal();
      break;
    default:
      break;
  }
}

//Check If Selected Letter Is Found In Word Or Not To Increase Wrong Attemps Number of Success Attemps Number
function IsLetterFoundCheck(IsFound, NumberofRepetition) {
  if (!IsFound) {
    WrongAttemps++;
  } else {
    SuccessLetters += NumberofRepetition;
    console.log(SuccessLetters);
  }
}

//Listening On Click On Page
document.addEventListener("click", (e) => {
  let IsFound = false;
  let NumberOfRepeationInWord = 0;
  const ClickSound = new Audio("../sounds/click.mp3");
  //Check If the Click was On Letter Or not
  if (e.target.classList.contains("letter-box")) {
    ClickSound.play();
    let ClickedLetter = e.target.innerHTML;
    const GuessLettersArr = Array.from(LetterGuessContainer.children);
    e.target.classList.add("clicked");
    //Making Selected Letter Appear If True
    RandomWordCharsArr.forEach((WordChar, index) => {
      if (ClickedLetter.toLowerCase() == WordChar.toLowerCase()) {
        GuessLettersArr[index].innerHTML = ClickedLetter;
        IsFound = true;
        NumberOfRepeationInWord++;
      }
    });
    IsLetterFoundCheck(IsFound, NumberOfRepeationInWord);
    WrongAttempsCheck(WrongAttemps);
    OpenSuccessModal(GuessLettersArr);
  }
});

//Self Calling Function To Call Main Function
(function CallingFunctions() {
  ShowLetters();
  ShowCategoryName();
  GameOverWordShow();
  ShowGuessWordDivs();
})();
