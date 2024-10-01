
function updatecoinDisplay()
{
  if(localStorage.getItem("coinRecord") !== null)
    {
      showCoin.textContent = `${localStorage.getItem("coinRecord")}`;
    } 
    else 
    {
      localStorage.setItem("coinRecord", String(coin));
      showCoin.textContent = `${localStorage.getItem("coinRecord")}`;
    }
  }

let fullscreenBtn=document.getElementById("btnfull");
let dofullscreen=function togglefullscreen() {
    if (document.fullscreenEnabled) {
    if (document.fullscreenElement === null) 
      {
      document.documentElement.requestFullscreen()
        .then(() => {
          console.log("screen  in fullscreen", document.fullscreenElement);
        })
        .catch((err) => {
          console.log("error occured");
        });
    } 
    else if (document.fullscreenElement !== null) {
      document.exitFullscreen()
        .then(() => {
          console.log("not in fullscreen", document.fullscreenElement);
        })
        .catch((err) => {
          console.log("error occured while existing from fullscreen");
        });
    }
  } 
  else {
    alert("browser doesn,t supported or disabled");
  }
};
fullscreenBtn.addEventListener("click", dofullscreen);

// -------------------------------------------------------
let audio = document.querySelector("#mainaudio");
let whistleSong = document.querySelector("#whistle");
let popsong = document.querySelector("#popsong");
// ------------------------------------------------------

let allvolbtn = document.getElementsByClassName("volbtn");
let volbtnhome = allvolbtn[0];
let volbtnpause = allvolbtn[1];
let volonpause = volbtnpause.firstElementChild;
let voloffpause = volbtnpause.lastElementChild;
let volonbtnhome = volbtnhome.firstElementChild;
let voloffbtnhome = volbtnhome.lastElementChild;

let play = function audioon() {
  let clickedBtn = this;
  let volumeon = clickedBtn.firstElementChild;
  let volumeoff = clickedBtn.lastElementChild;
  if (volbtnhome === clickedBtn) {
    volumeon.style = "display:block";
    volumeoff.style = "display:none";
    volonpause.style = "display:block";
    voloffpause.style = "display:none";
    audio.muted = false;
    audio.play();
  } else if (volbtnpause === clickedBtn) {
    volumeon.style = "display:block";
    volumeoff.style = "display:none";
    volonbtnhome.style = "display:block";
    voloffbtnhome.style = "display:none";

    audio.muted = false;
    audio.play();
  }
  console.log("audio playing");
};
let mutedaudio = function mute() {
  let clickedBtn = this;
  let volumeon = clickedBtn.firstElementChild;
  let volumeoff = clickedBtn.lastElementChild;
  if (volbtnhome === clickedBtn) {
    volumeon.style = "display:none";
    volumeoff.style = "display:block";
    volonpause.style = "display:none";
    voloffpause.style = "display:block";
    audio.muted = true;
    console.log("audio gone mute");
  } else if (volbtnpause === clickedBtn) {
    volumeon.style = "display:none";
    volumeoff.style = "display:block";
    volonbtnhome.style = "display:none";
    voloffbtnhome.style = "display:block";
    audio.muted = true;
    console.log("audio gone mute");
  }
};
let toggleaudio = function audiotoggler() {
  if (audio.muted === true) {
    play.call(this);
  } else if (audio.currentTime > 0) {
    mutedaudio.call(this);
  }
};
volbtnhome.addEventListener("click", toggleaudio);
volbtnpause.addEventListener("click", toggleaudio);

// from home menu to game menu
let playHomebtn = document.querySelector("#playBtn");
let homeMenu = document.querySelector("#homeMenu");
let gameMenu = document.querySelector("#gameMenu");
let opengamemenu = function opennewMenu() {
  homeMenu.style = "display:none";
  gameMenu.style = "display:grid";
  updatecoinDisplay();
};
playHomebtn.addEventListener("click", opengamemenu);

//from game menu to home menu!
let pauseBtn = document.getElementById("pausebtn");
let pauseMenu = document.getElementById("pauseMenu");
let homebtnpauseMenu = document.getElementById("homebtn");

//open pause menu
let displayPausemenu = function openPauseMenu() {
  startGameCount = 0;
  pauseRestartCount = 0;
  restartbtn.addEventListener("click", gameRestart, false);
  console.log("show pause restartcount", pauseRestartCount);
  pauseMenu.style = "display:flex;justify-content:center;align-items:center";
};

//goto home menu
let gohomemenu = function showhomemenu() {
  homeMenu.style = "display:grid";
  gameMenu.style = "display:none";
};
homebtnpauseMenu.addEventListener("click", gohomemenu, false);

//--------------------------------------------------Game main play section
let mainmolecontainer = document.querySelector(".allmoles");
let first3moles = mainmolecontainer.firstElementChild;
let second3moles = first3moles.nextElementSibling;

let allholeshtmlcollection = first3moles.children;
let allholeshtmlcollection2 = second3moles.children;

let allholesarray = Array.of(
  ...allholeshtmlcollection,
  ...allholeshtmlcollection2
);
console.log(allholesarray);

// game skins url
let simpleMoleurl="assets/simpleMole-removebg-preview.png";
let hardMoleurl="assets/1-removebg-preview.png";
let veryHardMoleurl="assets/2.png";
let bombUrl="assets/bomb.png";
// all mole skins url
let moleskins=Array.of(simpleMoleurl,hardMoleurl,veryHardMoleurl)


//game Elements all moles
let simplemole = document.createElement("div");
simplemole.id = "easyMole";
let moleimage = document.createElement("img");
simplemole.classList.add("mole");

//hard mole
let hardmole = document.createElement("div");
hardmole.id = "hardMole";
let hardmoleimage = document.createElement("img");
hardmole.classList.add("mole");

//very hardmole
let veryhardmole = document.createElement("div");
veryhardmole.id = "veryHardMole";
let veryhardmoleimage = document.createElement("img");
veryhardmole.classList.add("mole");

//bomb
let bomb = document.createElement("div");
let bombImage = document.createElement("img");
bombImage.setAttribute("width", `70px`);
bomb.classList.add("mole");



//fuctnion to saving by default skins || it gone update as user buy product
function setDefaultskinlocalstoarage()
{
  localStorage.setItem("skins",JSON.stringify(moleskins))
}
setDefaultskinlocalstoarage()



//function to get saved skin
function getSavedSkin()
{  
 let savedSkin=JSON.parse(localStorage.getItem("skins"))
 return savedSkin
}

//fucntion which setAttributes of image 
function UpdateMoleSkin()
{ 
  let currentSkins=getSavedSkin()
  console.log(currentSkins);
  moleimage.setAttribute("src", `${currentSkins[0]}`)
  hardmoleimage.setAttribute("src", `${currentSkins[1]}`)
  veryhardmoleimage.setAttribute("src", `${currentSkins[2]}`)
  bombImage.setAttribute("src", `${bombUrl}`)
  addSkin()
}
UpdateMoleSkin()


//function to add image element
function addSkin()
{
  simplemole.append(moleimage)
  hardmole.append(hardmoleimage)
  veryhardmole.append(veryhardmoleimage)
  bomb.append(bombImage)
}

let allmolesarray = Array.of(simplemole, hardmole, veryhardmole, bomb);

let trackstartgamefuntion = 0;
let trackrestartgame = 0;
let timecounter = 25;
let timeIndicator = document.getElementById("timeIndicator");
let gameOvermenu = document.getElementById("gameOvermenu");

let myinterval;
let newId;

let score = 0;
let highscore = 0;
let showScore = document.getElementById("showScore");
let gameOverscore = document.getElementById("scoreEle");
let highScoreindicator = document.getElementById("highScore");
let showCoin = document.getElementById("coinindicator");
let coin = 0;
let startGameCount = 0;
let pauseRestartCount = 0;
let overRestartCount = 0;

let start=() => 
  {
  allmolesarray.forEach((eachMole) => {
    eachMole.addEventListener("click", molewhacked, false);
  });
  pauseBtn.addEventListener("click", stopgame, false);
  pauseBtn.addEventListener("click", displayPausemenu, false);
  timecounter--;
  if (timecounter === 0)
    {
    timeIndicator.textContent = timecounter;
    showScore.textContent = "time,s up";
    showgameoverMenu();
    gameOverscore.textContent = `${score}`;
    highScoreindicator.textContent = `${localStorage.getItem("recordScore")}`;
    clearInterval(myinterval);
    clearInterval(newId);
    pauseBtn.removeEventListener("click", displayPausemenu);
    pauseBtn.removeEventListener("click", stopgame, false);
    allmolesarray.forEach((eachMole) => {
      eachMole.removeEventListener("click", molewhacked, false);
    });
  } 
  else if (timecounter > 0)
    {
    timeIndicator.textContent = timecounter;
    if (trackrestartgame > 0)
      {
      showScore.textContent = 0;
      whistleSong.play();
      trackrestartgame = 0;
      trackstartgamefuntion = 0;
      }
    pauseMenu.style.display = "none";
    gameOvermenu.style.display = "none";
    pauseBtn.style = "display:block";
    startmenu.style = "display:none";

    let randomhole = Math.floor(Math.random() * (allholesarray.length - 0));
    let randommole = Math.floor(Math.random() * (allmolesarray.length - 0));
    if(allholesarray[randomhole].firstElementChild === null) 
      {
      popsong.play();
      allholesarray[randomhole].append(allmolesarray[randommole]);
     } 
     else if (
      allholesarray[randomhole].firstElementChild.className ===
      allmolesarray[randommole].className
    ){
      allholesarray[randomhole].firstElementChild.remove();
    }
  }
};

function hidepausemenu() {
  pauseMenu.style.display = "none";
}
function showgameoverMenu() {
  overRestartCount = 0;
  gameOvermenu.style = "display:block";
  restartOfgameOvermenu.addEventListener("click", gameRestart, false);
}
function startgame() {
  startGameCount++;
  removeStartGameEvent(startGameCount);
  whistleSong.play();
  trackstartgamefuntion++;
  hidepausemenu();
  if (newId === undefined)
    {
    myinterval = setInterval(start, 1000);
    console.log("original interval called");
    } 
    else if (newId)
    {
    newId = setInterval(start, 1000);
    console.log("new interval started which was resumed");
     }
}
function stopgame()
{
  if (newId)
    {
    clearInterval(newId);
    console.log("duplicate interval stopped");
            } 
  else if (newId === undefined) 
    {
    clearInterval(myinterval);
    console.log("original interval stopped");
  }
}

function gameRestart() {
  pauseRestartCount++;
  console.log("pauseRestart", pauseRestartCount);

  removerestartEvent(pauseRestartCount);
  if (this === restartOfgameOvermenu) {
    overRestartCount++;
    removegameOverRestart(overRestartCount);
  }
  trackrestartgame++;
  if (myinterval) {
    myinterval = null;
    score = 0;
    timecounter = 25;
    newId = setInterval(start, 1000);
    console.log("duplicate interval called when user clicks on restart button");
  } else if (newId) {
    newId = undefined;
    score = 0;
    timecounter = 25;
    myinterval = setInterval(start, 1000);
    console.log("original interval called when duplicate was running");
  }
}

let startbtn = document.querySelector("#playgame");
let startmenu = document.querySelector("#startmenu");
let pauseplay = document.querySelector("#pauseplay");
let restartbtn = document.querySelector("#restart");
let restartOfgameOvermenu = document.querySelector("#refresh");
startbtn.addEventListener("click", startgame, false);
pauseplay.addEventListener("click", startgame, false);

function molewhacked(e)
{
  let clickeMole = e.target.parentElement.id;
  if (clickeMole === "easyMole") {
    coin = parseInt(localStorage.getItem("coinRecord"));
    coin += 20;
    localStorage.setItem("coinRecord", String(coin));
    score += 10;
    timecounter += 2;
  }
  else if (clickeMole === "hardMole") {
    coin = parseInt(localStorage.getItem("coinRecord"));
    coin += 40;
    localStorage.setItem("coinRecord", String(coin));
    score += 20;
    timecounter += 4;
  } 
  else if (clickeMole === "veryHardMole") {
    coin = parseInt(localStorage.getItem("coinRecord"));
    coin += 60;
    localStorage.setItem("coinRecord", String(coin));
    score += 30;
    timecounter += 6;
  } else {
    coin = parseInt(localStorage.getItem("coinRecord"));
    coin += 1;
    localStorage.setItem("coinRecord", String(coin));
    timecounter = timecounter - 3;
  }
  showScore.textContent = score;
  showCoin.textContent = `${localStorage.getItem("coinRecord")}`
  function saveTolocal()
  {
    if (score >= highscore){
      highscore = score
      if(Storage)
        {
        try {
          localStorage.setItem("recordScore", String(highscore));
        } 
        catch (error) {
          alert("storage was fill or inaccessible");
        }
      }
    }
  }
  saveTolocal();
}

function removeStartGameEvent(clickCount) {
  if (clickCount) {
    startbtn.removeEventListener("click", startgame, false);
    console.log("show pause restart", pauseRestartCount);
  }
}
function removerestartEvent(clickCount) {
  if (clickCount) {
    restartbtn.removeEventListener("click", gameRestart, false);
  }
}
function removegameOverRestart(clickCount) {
  if (clickCount) {
    restartOfgameOvermenu.removeEventListener("click", gameRestart, false);
  }
}




//coder,s never quit.
//i try to add those features in this repository soon! 
//All feedback are welcome