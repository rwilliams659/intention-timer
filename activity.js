class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  //Class should maintain as class variable time remaining
  //startTimer (setInterval) should only update the amount of time remaining
  //Then it should call function to update display


  startTimer() {
    var totalTime = (this.minutes * 60) + this.seconds;
    setInterval(function() {
      var timer = document.querySelector('.user-input-time');
      totalTime --;
      var min = Math.floor(totalTime/60);
      if (min < 10) {
        min = '0' + min
      };
      var sec = totalTime%60;
      if (sec < 10) {
        sec = '0' + sec;
      };
      console.log(totalTime);
      timer.innerText = `${min}:${sec}`
      if (totalTime === 0) {
        alert('Time\'s up! Your activity is complete.')
        //clearInterval();
      }
    }, 1000);
  }


  markComplete() {

  }

  saveToStorage() {

  }
}
