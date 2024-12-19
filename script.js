/*
STAGE key:
stage 1 : 2 doors
stage 2 : 3 doors
stage 3 : 6 doors
stage 4 : 12 doors
stage 5 : 18 doors
stage 6 : 32 doors
stage 7 : 48 doors
*/

//variables
let stage = 1;
let past = 1;
let x, v, rows;
let a, b, c, d, e, f, g;
let timerInterval;
const diffText = document.getElementById("difficultyText");
const levelOneBox = document.getElementById("lvlONE");
const levelTwoBox = document.getElementById("lvlTWO");
const levelThreeBox = document.getElementById("lvlTHREE");
const levelFourBox = document.getElementById("lvlFOUR");
const levelFiveBox = document.getElementById("lvlFIVE");
const levelSixBox = document.getElementById("lvlSIX");
const levelSevenBox = document.getElementById("lvlSEVEN");
const videoPlayer = document.getElementById("introVideoPlayer");
const skipButton = document.getElementById("skipButton");
const startButton = document.getElementById("startButton");
const noteBody = document.getElementById("noteModalBody");
const note = document.getElementById("noteModal");
const gameOverModal = document.getElementById("gameOverModal");
const exitModal = document.getElementById("exitModal");
const deathVideo = document.getElementById("deathVideoPlayer");
const parent = document.getElementById("gameZone");
const parent2 = document.getElementById("gameZone2");
const parent3 = document.getElementById("gameZone3");
const parent4 = document.getElementById("gameZone4");
const videoCover = document.getElementById("vidCover");
const timerText = document.getElementById("timeText");
const videos = ["images/introCard.mp4", "images/introScene.mp4"];
let eleven = document.getElementById("elevenDisc");
let currentVideoIndex = 0;

randomNumbers = [];
st1 = [1, 2];
st2 = [3, 4, 5];
st3 = [];
st4 = [];
st5 = [];
st6 = [];
st7 = [];

//create values for the numbers and determines the correct div id for the stages
function numberGenerate() {
  if (stage == 0) {
    console.log(a);
    diffText.textContent = "Difficulty: Easy";
  } else if (stage == 1) {
    a = Math.floor(Math.random() * st1.length);
    diffText.textContent = "Difficulty: Easy";
  } else if (stage == 2) {
    a = Math.floor(Math.random() * st2.length);
    diffText.textContent = "Difficulty: Easy";
  } else if (stage == 3) {
    a = Math.floor(Math.random() * st3.length);
    diffText.textContent = "Difficulty: Easy";
  } else if (stage == 4) {
    a = Math.floor(Math.random() * st4.length);
    diffText.textContent = "Difficulty: Medium";
  } else if (stage == 5) {
    a = Math.floor(Math.random() * st5.length);
    diffText.textContent = "Difficulty: Medium";
  } else if (stage == 6) {
    a = Math.floor(Math.random() * st6.length);
    diffText.textContent = "Difficulty: Hard";
  } else if (stage == 7) {
    a = Math.floor(Math.random() * st7.length);
    diffText.textContent = "Difficulty: I'm Sorry";
  } else {
    console.log("stage");
    diffText.textContent = "Difficulty: ???";
  }
  numberCall();
  //console.log("place in array" + a);
}

//changes the modal text based on the level
function numberCall() {
  if (stage == 1) {
    noteBody.innerHTML = st1[a];
    //console.log("display number" + st1[a]);
  } else if (stage == 2) {
    noteBody.innerHTML = st2[a];
    console.log(st3);
    //console.log("display number" + st2[a]);
  } else if (stage == 3) {
    noteBody.innerHTML = st3[a];
    console.log(st3);
    //console.log("display number" + st3[a]);
  } else if (stage == 4) {
    noteBody.innerHTML = st4[a];
    //console.log("display number" + st4[a]);
  } else if (stage == 5) {
    noteBody.innerHTML = st5[a];
    //console.log("display number" + st5[a]);
  } else if (stage == 6) {
    noteBody.innerHTML = st6[a];
    //console.log("display number" + st6[a]);
  } else if (stage == 7) {
    noteBody.innerHTML = st7[a];
    //console.log("display number" + st7[a]);
  } else {
    noteBody.innerHTML = "ERROR, level not found";
  }
}

//creates the display numbers for stages 3-7 aka loaders
function loaderC() {
  for (var i = 0; i < 6; i++) {
    tempNum = Math.floor(Math.random() * 99);
    st3.push(tempNum);
  }
}
function loaderD() {
  for (var i = 0; i < 12; i++) {
    tempNum = Math.floor(Math.random() * 999);
    st4.push(tempNum);
  }
}
function loaderE() {
  for (var i = 0; i < 18; i++) {
    tempNum = Math.floor(Math.random() * 999);
    st5.push(tempNum);
  }
}
function loaderF() {
  for (var i = 0; i < 32; i++) {
    tempNum = Math.floor(Math.random() * 999);
    st6.push(tempNum);
  }
}
function loaderG() {
  for (var i = 0; i < 48; i++) {
    tempNum = Math.floor(Math.random() * 999);
    st7.push(tempNum);
  }
}

//deletes all divs made by create... does not delete the ID's in the arrays though
function removeAllChildDivs(gameZone) {
  if (parent) {
    // While there are divs, delete the first (first row)
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  if (parent2) {
    // While there are divs, delete the first (second row)
    while (parent2.firstChild) {
      parent2.removeChild(parent2.firstChild);
    }
  }
  if (parent3) {
    // While there are divs, delete the first (third row)
    while (parent3.firstChild) {
      parent3.removeChild(parent3.firstChild);
    }
  }
  if (parent4) {
    // While there are divs, delete the first (fourth row)
    while (parent4.firstChild) {
      parent4.removeChild(parent4.firstChild);
    }
  }
}

//clears all values in the arrays... does not clear the actual boxes
function clearArrays() {
  // stage 3
  st3.splice(0, st3.length);
  // stage 4
  st4.splice(0, st4.length);
  // stage 5
  st5.splice(0, st5.length);
  // stage 6
  st6.splice(0, st6.length);
  // stage 7
  st7.splice(0, st7.length);
}

// door creation
function create() {
  //stage settings: changes the amount of variables generated per row and the amount of rows there are
  if (stage == 1) {
    x = 2;
    rows = 1;
    setSize1();
  } else if (stage == 2) {
    x = 3;
    rows = 1;
    setSize1();
  } else if (stage == 3) {
    x = 3;
    rows = 2;
    setSize2();
  } else if (stage == 4) {
    x = 6;
    rows = 2;
  } else if (stage == 5) {
    x = 6;
    rows = 3;
    setSize3();
  } else if (stage == 6) {
    x = 8;
    rows = 4;
    setSize4();
  } else if (stage == 7) {
    x = 12;
    rows = 4;
  } else {
    //nothing
  }
  // this takes the value x aka the amount of doors per row and generates the doors based on that
  if (stage == 1) {
    a = removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st1[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
  } else if (stage == 2) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st2[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    // 2 rows
  } else if (stage == 3) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st3[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent2.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st3[i + 3];
      div.id = i + 3;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
  } else if (stage == 4) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st4[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent2.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "30px";
      div.textContent = st4[i + 6];
      div.id = i + 6;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    // 2 rows
  } else if (stage == 5) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "20px";
      div.textContent = st5[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent2.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "20px";
      div.textContent = st5[i + 6];
      div.id = i + 6;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent3.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "20px";
      div.textContent = st5[i + 12];
      div.id = i + 12;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
  } else if (stage == 6) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "15px";
      div.textContent = st6[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent2.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "15px";
      div.textContent = st6[i + 8];
      div.id = i + 8;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent3.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "15px";
      div.textContent = st6[i + 16];
      div.id = i + 16;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent4.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "15px";
      div.textContent = st6[i + 24];
      div.id = i + 24;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
  } else if (stage == 7) {
    removeAllChildDivs(gameZone);
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "10px";
      div.textContent = st7[i];
      div.id = i;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent2.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "10px";
      div.textContent = st7[i + 12];
      div.id = i + 12;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent3.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "10px";
      div.textContent = st7[i + 24];
      div.id = i + 24;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
    for (var i = 0; i < x; i++) {
      var div = document.createElement("div");
      div.style.height = "100%";
      div.style.width = "calc(100%/2)";
      parent4.appendChild(div);
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.color = "#b6a78a";
      div.style.fontSize = "10px";
      div.textContent = st7[i + 36];
      div.id = i + 36;
      div.setAttribute("onclick", "correctCheck(this)");
      div.style.backgroundImage = "url('images/door.png')";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
    }
  } else {
    console.log("error: stage not listed");
  }
}

function stageColors() {
  if (stage == 1) {
    resetColors();
  } else if (stage == 2) {
    levelOneBox.classList.remove("darkRed");
    levelOneBox.classList.remove("yellow");
    levelOneBox.classList.add("green");
    levelTwoBox.classList.remove("darkRed");
    levelTwoBox.classList.add("yellow");
  } else if (stage == 3) {
    levelTwoBox.classList.remove("yellow");
    levelTwoBox.classList.add("green");
    levelThreeBox.classList.remove("darkRed");
    levelThreeBox.classList.add("yellow");
  } else if (stage == 4) {
    levelThreeBox.classList.remove("yellow");
    levelThreeBox.classList.add("green");
    levelFourBox.classList.remove("darkRed");
    levelFourBox.classList.add("yellow");
  } else if (stage == 5) {
    levelFourBox.classList.remove("yellow");
    levelFourBox.classList.add("green");
    levelFiveBox.classList.remove("darkRed");
    levelFiveBox.classList.add("yellow");
  } else if (stage == 6) {
    levelFiveBox.classList.remove("yellow");
    levelFiveBox.classList.add("green");
    levelSixBox.classList.remove("darkRed");
    levelSixBox.classList.add("yellow");
  } else if (stage == 7) {
    levelSixBox.classList.remove("yellow");
    levelSixBox.classList.add("green");
    levelSevenBox.classList.remove("darkRed");
    levelSevenBox.classList.add("yellow");
  } else if (stage == 8) {
    levelSevenBox.classList.remove("yellow");
    levelSevenBox.classList.add("green");
    hideAnswerModal();
    showExit();
  }
}

//checks if the the ID of the div you clicked is the same as the number chosen by number generate
function correctCheck(thisElement) {
  console.log("------------------------");
  console.log("Stage at time of correct check: " + stage);
  console.log("Clicked div id: " + thisElement.id);
  console.log("Correct div id " + a);
  console.log("display number of correct id = " + st1[a]);
  console.log("------------------------");
  if (thisElement.id === a.toString()) {
    stage = stage + 1;
    timeAdd();
    sequenceStart();
  } else {
    //if ID's don't match, send player back to the begining
    console.log("wrong click!");
    stage = 1;
    lvl = 1;
    past = 1;
    removeAllChildDivs(gameZone);
    sequenceStart();
  }
}

//settings for when the level counter is set back to level one
function resetColors() {
  levelOneBox.classList.remove("green");
  levelTwoBox.classList.remove("green");
  levelThreeBox.classList.remove("green");
  levelFourBox.classList.remove("green");
  levelFiveBox.classList.remove("green");
  levelSixBox.classList.remove("green");
  levelSevenBox.classList.remove("green");

  levelTwoBox.classList.remove("yellow");
  levelThreeBox.classList.remove("yellow");
  levelFourBox.classList.remove("yellow");
  levelFiveBox.classList.remove("yellow");
  levelSixBox.classList.remove("yellow");
  levelSevenBox.classList.remove("yellow");

  levelTwoBox.classList.add("darkRed");
  levelThreeBox.classList.add("darkRed");
  levelFourBox.classList.add("darkRed");
  levelFiveBox.classList.add("darkRed");
  levelSixBox.classList.add("darkRed");
  levelSevenBox.classList.add("darkRed");

  levelOneBox.classList.add("yellow");
}

//size settings for one rows of doors
function setSize1() {
  parent.classList.add("game");
  parent2.classList.add("vanish");
  parent3.classList.add("vanish");
  parent4.classList.add("vanish");

  parent.classList.remove("gZ2");
  parent2.classList.remove("gZ2");

  parent.classList.remove("gZ3");
  parent2.classList.remove("gZ3");
  parent3.classList.remove("gZ3");

  parent.classList.remove("gZ4");
  parent2.classList.remove("gZ4");
  parent3.classList.remove("gZ4");
  parent4.classList.remove("gZ4");

  parent.classList.remove("vanish");
}
//size settings for two rows of doors
function setSize2() {
  parent.classList.add("gZ2");
  parent2.classList.add("gZ2");
  parent3.classList.add("vanish");
  parent4.classList.add("vanish");

  parent.classList.remove("game");

  parent.classList.remove("gZ3");
  parent2.classList.remove("gZ3");
  parent3.classList.remove("gZ3");

  parent.classList.remove("gZ4");
  parent2.classList.remove("gZ4");
  parent3.classList.remove("gZ4");
  parent4.classList.remove("gZ4");

  parent.classList.remove("vanish");
  parent2.classList.remove("vanish");
}
//size settings for three rows of doors
function setSize3() {
  parent.classList.add("gZ3");
  parent2.classList.add("gZ3");
  parent3.classList.add("gZ3");
  parent4.classList.add("vanish");

  parent.classList.remove("game");

  parent.classList.remove("gZ2");
  parent2.classList.remove("gZ2");

  parent.classList.remove("gZ4");
  parent2.classList.remove("gZ4");
  parent3.classList.remove("gZ4");
  parent4.classList.remove("gZ4");

  parent.classList.remove("vanish");
  parent2.classList.remove("vanish");
  parent3.classList.remove("vanish");
}
//size settings for four rows of doors
function setSize4() {
  parent.classList.add("gZ4");
  parent2.classList.add("gZ4");
  parent3.classList.add("gZ4");
  parent4.classList.add("gZ4");

  parent.classList.remove("game");

  parent.classList.remove("gZ2");
  parent2.classList.remove("gZ2");

  parent.classList.remove("gZ3");
  parent2.classList.remove("gZ3");
  parent3.classList.remove("gZ3");

  parent.classList.remove("vanish");
  parent2.classList.remove("vanish");
  parent3.classList.remove("vanish");
  parent4.classList.remove("vanish");
}

//show the modal that displays the display numbers needed for the level
function showAnswerModal() {
  note.style.display = "flex";
}
//hide the modal that displays the display numbers needed for the level
function hideAnswerModal() {
  note.style.display = "none";
}
function showGameOverModal() {
  gameOverModal.style.display = "flex";
  eleven.pause();
  deathVideo.play();
  setTimeout(function () {
    location.reload();
  }, 2500);
}
function hideGameOverModal() {
  gameOverModal.style.display = "none";
}

function showExit() {
  exitModal.style.display = "flex";
  eleven.pause();
}
function hideExit() {
  exitModal.style.display = "none";
}

// Countdown Timer
let timeLeft = 10;
function timer() {
  if (stage <= 7) {
    if (timeLeft > 0) {
      timeLeft--;
      timerText.innerHTML = timeLeft;
    } else if (timeLeft <= 0) {
      showGameOverModal();
    }
  } else {
    timeLeft--;
  }
}
// Function to complete a stage and add 5 seconds
function timeAdd() {
  if (stage <= 7) {
    timeLeft += 5; // Add 5 seconds whenever a stage is completed
  }
}

function startTimer() {
  timerInterval = setInterval(timer, 1000);
}

function sequenceStart() {
  createArrays();
  create();
  numberGenerate();
  showAnswerModal();
  stageColors();
}

function createArrays() {
  clearArrays();
  loaderC();
  loaderD();
  loaderE();
  loaderF();
  loaderG();
}

// starts the intro video because google won't allow it to play without "interaction" or whatever
function startGameVideos() {
  console.log("start worled");
  videoPlayer.play();
  startButton.classList.remove("vanish");
  skipButton.classList.remove("vanish");
  startButton.classList.add("vanish");
  //console.log("start worled");
}

// loads and plays the next video
function playNextVideo() {
  currentVideoIndex++;

  // Check if there are more videos to play
  if (currentVideoIndex < videos.length) {
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.play();
    videoPlayer.muted = false;
  } else {
    videoPlayer.style.display = "none";
    videoCover.classList.add("vanish");
    videoCover.classList.remove("cover");
    skipButton.classList.add("vanish");
    sequenceStart();
    startTimer();
    playMusic();
  }
}

function skipToNextVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  playNextVideo();
}

function playMusic() {
  eleven.volume = 0.4;
  eleven.currentTime = 0;
  eleven.play();
}

videoPlayer.addEventListener("ended", playNextVideo);

skipButton.addEventListener("click", skipToNextVideo);

startButton.addEventListener("click", startGameVideos);

eleven.addEventListener("ended", playMusic);

function leave() {
  window.location.href = "https://xtx5ln.csb.app/";
}
