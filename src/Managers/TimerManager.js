"use strict";

class TimerManager {
   constructor(timeInMilliseconds, started) {
      this.started = started;
      this.finished = false;
      this.fullTime = timeInMilliseconds;
      this.currentTime = null;
      this.currentTimeInSeconds = null;
   }
}