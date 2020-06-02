
var newActivitySection = document.querySelector('.new-activities-section');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var accomplishmentInput = document.getElementById('accomplishment');
var startTimerBtn = document.querySelector(".timer-button");
var timer = document.querySelector('.timer');
var newActivityHeading = document.querySelector('.new-activity');
var activityForm = document.querySelector('.form');
var currentActivityHeading = document.querySelector('.current-activity');
var createNewActivBtn = document.querySelector(".create-new-activity");
var activityData = [];
var category = '';

//Consider refactoring the below into 1 event listener by adding a common class to the minutes & seconds input fields
minutesInput.addEventListener('keydown', formNumberValidation);
secondsInput.addEventListener('keydown', formNumberValidation);
newActivitySection.addEventListener('click', clickHandler);

function clickHandler(event) {
  if (event.target.classList.contains('form-button')) {
    changeBtnColor(event);
  }
  if (event.target.classList.contains('start-btn')) {
    // createActivityInstance(event);
    validateForm();
  }
  if (event.target.classList.contains("timer-button")) {
    var currentActivity = activityData[activityData.length - 1];
    currentActivity.startTimer();
  }
  if (event.target.classList.contains("log-btn")) {
    logActivity();
  }
  if (event.target.classList.contains("create-new-activity")) {
    returnToForm();
  }
}

//should make seconds default equal to 0
function displayTimerInput(activity) {
  displayTimer();
  replaceTimerDisplay(activity);
  changeOutlineColor();
  var category = '';
}

function displayTimer() {
  newActivityHeading.classList.add('hidden');
  activityForm.classList.add('hidden');
  currentActivityHeading.classList.remove('hidden');
  timer.classList.remove('hidden');
}

function replaceTimerDisplay(activity) {
  var descriptionDisplay = document.querySelector('.description-display');
  var timerDisplay = document.querySelector('.timer-display');
  var secondsToDisplay = activity.seconds;
  var minutesToDisplay = activity.minutes;
  if (secondsToDisplay < 10) {
    secondsToDisplay = '0' + secondsToDisplay;
  }
  if (minutesToDisplay < 10) {
    minutesToDisplay = '0' + minutesToDisplay;
  }
  timerDisplay.innerText = `${minutesToDisplay}:${secondsToDisplay}`;
  descriptionDisplay.innerText = activity.description;
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
// fix the category warning message
function validateForm() {
  event.preventDefault();
  if (category !== '' && accomplishmentInput.value !== "" && minutesInput.value !== "" && secondsInput.value !== "" && secondsInput.value < 60) {
    createActivityInstance();
  } else {
      if (category === '') {
        var buttonSection = document.querySelector(".buttons");
        buttonSection.insertAdjacentHTML("afterend",`
          <div class="error">
            <p><img src="assets/warning.svg" class="warning-image"/> A category is required.</p>
          </div>
        `);
      }
      if (accomplishmentInput.value === "" &&) {
        accomplishmentInput.insertAdjacentHTML("afterend",`
          <div class="error">
            <p><img src="assets/warning.svg" class="warning-image"/> A description is required.</p>
          </div>
        `);
      }
      if (secondsInput.value === "" || secondsInput.value >= 60) {
        secondsInput.insertAdjacentHTML("afterend",`
          <div class="error">
            <p><img src="assets/warning.svg" class="warning-image"/> A valid time is required.</p>
          </div>
        `);
      }
      if (minutesInput.value === "") {
        minutesInput.insertAdjacentHTML("afterend",`
          <div class="error">
            <p><img src="assets/warning.svg" class="warning-image"/> A time is required.</p>
          </div>
        `);
      }
    }
  }

function changeBtnColor(event) {
  categoryArray = ["study", "meditate", "exercise"];
  for (var i = 0; i < categoryArray.length; i++) {
    var currentButton = document.querySelector(`.${categoryArray[i]}-btn`);
    console.log(currentButton);
    var currentIcon = document.querySelector(`.${categoryArray[i]}-passive`);
    currentButton.classList.remove(`${categoryArray[i]}-btn-active`)
    currentIcon.src = `assets/${categoryArray[i]}.svg`
    if (event.target.classList.contains(`${categoryArray[i]}-btn`)) {
      event.target.classList.add(`${categoryArray[i]}-btn-active`);
      currentIcon.src = `assets/${categoryArray[i]}-active.svg`;
    }
    category = event.target.value;
  }
}

function createActivityInstance(event) {
  var userDescription = document.getElementById("accomplishment").value;
  var userMinutes = parseInt(document.getElementById("minutes").value);
  var userSeconds = parseInt(document.getElementById("seconds").value);

  var activity = new Activity(category, userDescription, userMinutes, userSeconds);
  activityData.push(activity);
  displayTimerInput(activity);
  //call function to display the new view for timer
}

//For refactoring, have seconds only be able to go to 59 if have time
function formNumberValidation(event) {
  if (event.key === "e" || event.key === "+" || event.key === "." || event.key === "-") {
    event.preventDefault();
  };
}

function logActivity() {
  var defaultWords = document.querySelector(".default-words");
  var loggedActivitiesSection = document.querySelector(".logged-activities");
  defaultWords.classList.add("hidden");
  for (var i = 0; i < activityData.length; i++) {
    if (activityData[i].category === "study") {}
  var newLoggedActivity = `
  <section class="card-type">
      <section class="card">
        <section class="selected-type">${activityData[i].category}</section>
        <section class="selected-time">${activityData[i].minutes} MINUTES ${activityData[i].seconds} SECONDS</section>
        <section class="selected-activity">${activityData[i].description}</section>
      </section>
      <p class="border-line-${activityData[i].category}"></p>
    </section>
  `;
  loggedActivitiesSection.insertAdjacentHTML("afterbegin", newLoggedActivity);
  timer.classList.add("hidden");
  createNewActivBtn.classList.remove("hidden");
  }
}

function returnToForm() {
  newActivityHeading.classList.remove('hidden');
  activityForm.classList.remove('hidden');
  currentActivityHeading.classList.add('hidden');
  timer.classList.add('hidden');
  createNewActivBtn.classList.add("hidden");
}

function formNumberValidation(event) {
  var charactersToExclude = ['e', 'E', '+', '.', '-']
  if (charactersToExclude.includes(event.key)) {
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
