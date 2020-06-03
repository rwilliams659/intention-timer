class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  startTimer() {
    var _this = this;
    var totalTime = (this.minutes * 60) + this.seconds;
    var intervalId = setInterval(function() {
      var timer = document.querySelector('.timer-display');
      totalTime --;
      var min = Math.floor(totalTime/60);
      if (min < 10) {
        min = '0' + min
      };
      var sec = totalTime%60;
      if (sec < 10) {
        sec = '0' + sec;
      };
      timer.innerText = `${min}:${sec}`
      if (totalTime === 0) {
        clearInterval(intervalId);
        _this.markComplete();
      };
    }, 1000);
  }

  markComplete() {
    var finishMessages = ['COMPLETE!', 'YOU DID IT!', 'NICE JOB!'];
    var randomMessage = finishMessages[Math.floor(Math.random() * finishMessages.length)];
    startTimerBtn.innerText = `${randomMessage}`;
    logBtn.classList.remove('hidden')
    this.completed = true;
  }

  saveToStorage() {

  }
}
