$(document).ready(function() {
  // lengths in minutes
  var sessionLength = 25;
  var breakLength = 5;
  
  // time in seconds
  var timeLeft = sessionLength*60;
  
  // dummy var for setInterval function
  var x;
  
  // status booleans
  var timerOn = false;
  var onSession = true;
  
  function showTime() {
    var min = Math.floor(timeLeft/60);
    var sec = timeLeft%60;
    if (sec<10) {
      sec="0"+sec;
    }
    $("#time").text(min+":"+sec);
    
    // Status message changes
    if (onSession) {
      if (!timerOn) {
        if (timeLeft===sessionLength*60) {
          $("#message").text("Start Work");
        } else if (timeLeft>0) {
          $("#message").text("Continue Work");
        } else {
          $("#message").text("Start Break");
        }
      }
      else {
        $("#message").text("Work!");
      }
    }
    else {
      if (!timerOn) {
        if (timeLeft>0) {
          $("#message").text("Continue Break");
        } else {
          $("#message").text("Start Work");
        }
      }
      else {
        $("#message").text("On Break");
      }
    }
  }
  
  function countDown() {
    timerOn = true;
    showTime();
    
    x = setInterval(function() {
      // countdown
      timeLeft--;
      
      // display time
      showTime();
      
      // stop when time's up
      if (timeLeft===0) {
        pause();
      }
    }, 1000);
  }
  
  function pause() {
    clearInterval(x);
    timerOn = false;
    showTime();
  }
  
  function reset() {
    if (timerOn) {
      pause();
    }
    timeLeft = sessionLength*60;
    onSession = true;
    showTime();
  }
  
  function resetBreak() {
    if (timerOn) {
      pause();
    }
    timeLeft = breakLength*60;
    onSession = false;
    showTime();
  }
  
  function sessionSwitch() {
    if (onSession) {
      timeLeft = breakLength*60;
      onSession = false;
    }
    else {
      timeLeft = sessionLength*60;
      onSession = true;
    }
    countDown();
  }
  
  $(".timer").click(function() {
    if (timerOn) {
      pause();
    } else if(timeLeft===0) {
      sessionSwitch();
    }
    else {
      countDown();
    }
  });
  
  $(".restart").click(function() {
    reset();
  });
  
  $("#time-down").click(function() {
    if (sessionLength>1) {
      sessionLength--;
    }
    $("#session-length").text(" "+sessionLength+" ");
    if (onSession) {
      reset();
    }
  });
  
  $("#time-up").click(function() {
    sessionLength++;
    $("#session-length").text(" "+sessionLength+" ");
    if (onSession) {
      reset();
    }
  });
  
  $("#break-down").click(function() {
    if (breakLength>1) {
      breakLength--;
    }
    $("#break-length").text(" "+breakLength+" ");
    if (!onSession) {
      resetBreak();
    }
  });
  
  $("#break-up").click(function() {
    breakLength++;
    $("#break-length").text(" "+breakLength+" ");
    if (!onSession) {
      resetBreak();
    }
  });
  
});