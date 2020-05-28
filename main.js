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
    event.target.classList.remove('study-btn');
    event.target.classList.add('study-btn-active');
    console.log(event.target.classList);
    var studyIcon = document.querySelector('.study-passive');
    console.log(studyIcon);
    studyIcon.src = 'assets/study-active.svg';
  }
}
