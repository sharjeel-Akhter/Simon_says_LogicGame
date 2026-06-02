// -----------Simon says---------------

let body = document.querySelector("body");
let box = document.querySelectorAll(".btn");
let h3 = document.querySelector("h3");
    
let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;

// FIXED: Changed "brown" to "gold" to match your HTML and CSS definitions
let btns = ["red", "aqua", "blue", "gold"];

body.addEventListener("keypress", function(event){
    // Ignore spacebar inputs so active button clicks don't accidentally restart the game
    if(event.key === " " || event.code === "Space") return;

    if(start == false){
        console.log("Game has been Started");
        start = true;
        levelUp();
    }
});
    
function gameFlash(btn){
    if(!btn) return;
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 650);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        // FIXED: Shows the accurate final score of fully completed rounds
        h3.innerHTML = `Game Over! <b>Your score is : ${level - 1}</b> <br> Press Any Key to Start`;
        gameOver();
        reset();
    }
}

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randcol = btns[randIdx];
    let randbtn = document.querySelector(`.${randcol}`);

    gameSeq.push(randcol);
    console.log(gameSeq);

    gameFlash(randbtn);
}

function pressBtn(){
    if(!start) return; // Ignore user clicks if game hasn't started

    userFlash(this);
    let btn = this;

    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);  
    checkAns(userSeq.length - 1);
}

for(bx of box){
    bx.addEventListener("click", pressBtn);
}

function gameOver(){
    body.classList.add("gameOver");
    setTimeout(function(){
        body.classList.remove("gameOver");
    }, 150);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}