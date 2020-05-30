
var newActivitySection = document.querySelector('.new-activities-section');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var accomplishmentInput = document.getElementById('accomplishment');


var activityData = [];
var category;

//Consider refactoring the below into 1 event listener by adding a common class to the minutes & seconds input fields
minutesInput.addEventListener('keydown', formNumberValidation)
secondsInput.addEventListener('keydown', formNumberValidation)
newActivitySection.addEventListener('click', clickHandler);

function clickHandler(event) {
  if (event.target.classList.contains('form-button')) {
    changeBtnColor(event);
  }
  if (event.target.classList.contains('start-btn')) {
    // createActivityInstance(event);
    validateForm();
  }
}

//should make seconds default equal to 0
function displayTimerInput() {
  displayTimer();
  replaceTimerInput();
  changeOutlineColor();
}

function displayTimer() {
  var newActivityHeading = document.querySelector('.new-activity');
  var activityForm = document.querySelector('.form');
  var currentActivityHeading = document.querySelector('.current-activity');
  var timer = document.querySelector('.timer');
  newActivityHeading.classList.add('hidden');
  activityForm.classList.add('hidden');
  currentActivityHeading.classList.remove('hidden');
  timer.classList.remove('hidden');
}
function replaceTimerInput() {
  var userInputActivity = document.querySelector('.user-input-activity');
  var userInputTime = document.querySelector('.user-input-time');
  if (secondsInput.value < 10) {
    secondsInput.value = '0' + secondsInput.value
  }
  if (minutesInput.value < 10) {
    minutesInput.value = '0' + minutesInput.value
  }
  userInputTime.innerText = `${minutesInput.value}:${secondsInput.value}`;
  userInputActivity.innerText = accomplishmentInput.value;
}

function changeOutlineColor() {
  var timerBtn = document.querySelector('.timer-button');
  if (category === "study") {
    timerBtn.classList.add('start-study-outline')
  }
  if (category === "meditate") {
    timerBtn.classList.add('start-meditate-outline')
  }
  if (category === "exercise") {
    timerBtn.classList.add('start-exercise-outline')
  }
}

function validateForm() {
  event.preventDefault();
    if (category === undefined) {
      var buttonSection = document.querySelector(".buttons");
      buttonSection.insertAdjacentHTML("afterend",`
        <div class="error">
          <p><img src="assets/warning.svg" class="warning-image"/> A category is required.</p>
        </div>
      `);
    }
    if (accomplishmentInput.value === "") {
      accomplishmentInput.insertAdjacentHTML("afterend",`
        <div class="error">
          <p><img src="assets/warning.svg" class="warning-image"/> A description is required.</p>
        </div>
      `);
    } else if (secondsInput.value === "") {
      secondsInput.insertAdjacentHTML("afterend",`
        <div class="error">
          <p><img src="assets/warning.svg" class="warning-image"/> A time is required.</p>
        </div>
      `);
    } else if (minutesInput.value === "") {
      minutesInput.insertAdjacentHTML("afterend",`
        <div class="error">
          <p><img src="assets/warning.svg" class="warning-image"/> A time is required.</p>
        </div>
      `);
    } else {
      createActivityInstance();
    }
  }


function changeBtnColor(event) {
  if (event.target.classList.contains('study-btn')) {
    event.target.classList.add('study-btn-active');
    var studyIcon = document.querySelector('.study-passive');
    studyIcon.src = 'assets/study-active.svg';
  }
  if (event.target.classList.contains('meditate-btn')) {
    event.target.classList.add('meditate-btn-active');
    var meditateIcon = document.querySelector('.meditate-passive');
    meditateIcon.src = 'assets/meditate-active.svg';
  }
  if (event.target.classList.contains('exercise-btn')) {
    event.target.classList.add('exercise-btn-active');
    var exerciseIcon = document.querySelector('.exercise-passive');
    exerciseIcon.src = 'assets/exercise-active.svg';
  }
  category = event.target.value;
}

function createActivityInstance(event) {
  var userDescription = document.getElementById("accomplishment").value;
  var userMinutes = document.getElementById("minutes").value;
  var userSeconds = document.getElementById("seconds").value;

  var activity = new Activity(category, userDescription, userMinutes, userSeconds);
  activityData.push(activity);
  displayTimerInput();
  //call function to display the new view for timer
}


//For refactoring, have seconds only be able to go to 59 if have time
function formNumberValidation(event) {
  if (event.key === "e" || event.key === "+" || event.key === "." || event.key === "-") {
    event.preventDefault();
  };
}

// work on making only one button accessable at a time
// var meditateIcon = document.querySelector('.meditate-passive');
// var exerciseIcon = document.querySelector('.exercise-passive');
// document.querySelector('.exercise-btn').classList.remove('meditate-btn-active');
// meditateIcon.src = "assets/meditate.svg";
// document.querySelector('.meditate-btn').classList.remove('exercise-btn-active');
// exerciseIcon.src = "assets/exercise.svg";
