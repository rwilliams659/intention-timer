var activityForm = document.querySelector('.form-box');


activityForm.addEventListener('click', clickHandler);


function clickHandler(event) {
  console.log(event.target);
  if (event.target.classList.contains('form-button')) {
    changeBtnColor(event);
  }
}


function changeBtnColor(event) {
  console.log(event.target.className);
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
}
