
var newActivitySection = document.querySelector('.new-activities-section');
var timeInput = document.querySelector('.time');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var accomplishmentInput = document.getElementById('accomplishment');
var startTimerBtn = document.querySelector('.timer-button');
var timer = document.querySelector('.timer');
var newActivityHeading = document.querySelector('.new-activity');
var activityForm = document.querySelector('.form');
var currentActivityHeading = document.querySelector('.current-activity');
var createNewActivBtn = document.querySelector('.create-new-activity');
var logBtn = document.querySelector('.log-btn');
var activityData = [];
var currentActivity = activityData[activityData.length - 1];
var category = '';

//NEW ITER5
window.onload = retrieveFromStorage();
//
timeInput.addEventListener('keydown', formNumberValidation);
newActivitySection.addEventListener('click', clickHandler);

function keydownHandler(event) {
  if (event.target.classList.contains('minutes') || event.target.classList.contains('seconds')) {
    formNumberValidation(event);
  };
}

function clickHandler(event) {
  if (event.target.classList.contains('form-button')) {
    changeBtnColor(event);
  };
  if (event.target.classList.contains('start-btn')) {
    validateForm();
  };
  if (event.target.classList.contains('timer-button')) {
    //BELOW MOVED TO GLOBAL
    // var currentActivity = activityData[activityData.length - 1];
    currentActivity.startTimer();
  };
  if (event.target.classList.contains('log-btn')) {
    logActivity();
    //MAY NEED TO CALL ADDTL FUNCTION HERE ITER 5
    showCreateNewActivityButton();
  };
  if (event.target.classList.contains('create-new-activity')) {
    formAndTimerReset();
  };
}

//NEW ITER 5
function retrieveFromStorage() {
  activityData = JSON.parse(localStorage.getItem('ActivitiesStored')) || [];
  for (var i = 0; i < activityData.length; i++) {
    activityData[i] = new Activity(activityData[i].category, activityData[i].description, activityData[i].minutes, activityData[i].seconds);
  };
  logActivity();
}
//

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
  };
  if (minutesToDisplay < 10) {
    minutesToDisplay = '0' + minutesToDisplay;
  };
  timerDisplay.innerText = `${minutesToDisplay}:${secondsToDisplay}`;
  descriptionDisplay.innerText = activity.description;
}

function changeOutlineColor() {
  if (category === 'Study') {
    startTimerBtn.classList.add('start-study-outline');
  };
  if (category === 'Meditate') {
    startTimerBtn.classList.add('start-meditate-outline');
  };
  if (category === 'Exercise') {
    startTimerBtn.classList.add('start-exercise-outline');
  };
}

function validateForm() {
  event.preventDefault();
  var categoryError = document.querySelector('.category-error');
  var accomplishmentError = document.querySelector('.accomplishment-error');
  var minutesError = document.querySelector('.minutes-error');
  var secondsError = document.querySelector('.seconds-error');
  categoryError.innerHTML = '';
  accomplishmentError.innerHTML = '';
  minutesError.innerHTML = '';
  secondsError.innerHTML = '';
  if (category !== '' && accomplishmentInput.value !== '' && minutesInput.value !== '' && secondsInput.value !== '' && secondsInput.value < 60) {
    createActivityInstance();
  } else {
    if (category === '') {
      categoryError.innerHTML = `
          <p><img src="assets/warning.svg" class="warning-image"/> A category is required.</p>
      `;
    };
    if (accomplishmentInput.value === '') {
      accomplishmentError.innerHTML = `
          <p><img src="assets/warning.svg" class="warning-image"/> A description is required.</p>
      `;
    };
    if (minutesInput.value === '') {
      minutesError.innerHTML = `
        <p><img src="assets/warning.svg" class="warning-image"/> A valid time is required.</p>
      `;
    };
    if (secondsInput.value === '' || secondsInput.value >= 60) {
      secondsError.innerHTML = `
        <p><img src="assets/warning.svg" class="warning-image"/> A valid time is required.</p>
      `;
    };
  };
}

function changeBtnColor(event) {
  categoryArray = ['study', 'meditate', 'exercise'];
  for (var i = 0; i < categoryArray.length; i++) {
    var currentButton = document.querySelector(`.${categoryArray[i]}-btn`);
    var currentIcon = document.querySelector(`.${categoryArray[i]}-passive`);
    currentButton.classList.remove(`${categoryArray[i]}-btn-active`);
    currentIcon.src = `assets/${categoryArray[i]}.svg`;
    if (event.target.classList.contains(`${categoryArray[i]}-btn`)) {
      event.target.classList.add(`${categoryArray[i]}-btn-active`);
      currentIcon.src = `assets/${categoryArray[i]}-active.svg`;
    };
    category = event.target.value;
  };
}

function createActivityInstance(event) {
  var userDescription = document.getElementById('accomplishment').value;
  var userMinutes = parseInt(document.getElementById('minutes').value);
  var userSeconds = parseInt(document.getElementById('seconds').value);
  //ALTER BELOW TO USE GLOBAL VAR CURRENTACTIVITY
  currentActivity = new Activity(category, userDescription, userMinutes, userSeconds);
  activityData.push(currentActivity);
  //NEW LINE BELOW ITER5
  currentActivity.saveToStorage();
  activityForm.reset();
  displayTimerInput(currentActivity);
}

function logActivity() {
  var defaultWords = document.querySelector('.default-words');
  var loggedActivitiesSection = document.querySelector('.logged-activities');
  loggedActivitiesSection.innerHTML = '';
  defaultWords.classList.add('hidden');
  for (var i = 0; i < activityData.length; i++) {
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
    loggedActivitiesSection.insertAdjacentHTML('afterbegin', newLoggedActivity);
    //Moved to separate function just below: ITER 5
    // timer.classList.add('hidden');
    // createNewActivBtn.classList.remove('hidden');
  };
}

function showCreateNewActivityButton() {
  timer.classList.add('hidden');
  createNewActivBtn.classList.remove('hidden');
}

function formAndTimerReset() {
  returnToForm();
  resetTimer();
}

function resetTimer() {
  startTimerBtn.innerText = 'START ACTIVITY';
  startTimerBtn.disabled = false;
  logBtn.classList.add('hidden');
  startTimerBtn.classList.remove('start-study-outline');
  startTimerBtn.classList.remove('start-meditate-outline');
  startTimerBtn.classList.remove('start-exercise-outline');
}

function returnToForm() {
  newActivityHeading.classList.remove('hidden');
  activityForm.classList.remove('hidden');
  currentActivityHeading.classList.add('hidden');
  timer.classList.add('hidden');
  createNewActivBtn.classList.add('hidden');
}

function formNumberValidation(event) {
  var charactersToExclude = ['e', 'E', '+', '.', '-'];
  if (charactersToExclude.includes(event.key)) {
    event.preventDefault();
  };
}
