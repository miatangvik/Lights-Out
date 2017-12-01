var gameOverlay = document.querySelector('#game-overlay');
var itemBagButton = document.querySelector('#item-bag');

/*var clues = document.querySelectorAll(".clue");
var clueContent = document.querySelectorAll(".clue-content");*/

var clues = document.getElementsByClassName("clue");
var clueContent = document.getElementsByClassName("clue-content");

itemBagButton.addEventListener('mousedown', function () {
    gameOverlay.classList.toggle('active');
});

document.addEventListener('keydown', function (event) {
    if (event.which == 66) {
        gameOverlay.classList.toggle('active');
    }
});

for (var i = 0; i < clues.length; i++) {
    clues[i].addEventListener('mousedown', function (i) {
        console.log("hei");
        console.log(clueContent.length);
        clueContent[i].style.background = "black";
    }, false);
}
