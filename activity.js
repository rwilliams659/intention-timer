class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.totalTime = this.minutes*60 + this.seconds;
    this.id = Date.now();
  }

  startTimer() {
    setInterval(function updateTimer() {
      var timer = document.querySelector('.timer');
      console.log(timer)
      var minutes = Math.floor(this.totalTime/60);
      if (minutes < 10) {
        minutes = '0' + minutes
      };
      console.log(minutes)
      var seconds = this.totalTime%60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      };
      console.log(seconds)
      timer.innerText = `${minutes}:${seconds}`
      this.totalTime --;
      if (this.totalTime === 0) {
        clearInterval();
      }
    }, 1000);
  }


  markComplete() {

  }

  saveToStorage() {

  }
}
