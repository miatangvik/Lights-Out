var gameOverlay = document.querySelector('#game-overlay');
var itemBag = document.querySelector('#item-bag');

itemBag.addEventListener('mousedown', function () {
    gameOverlay.classList.toggle('active');
});

document.addEventListener('keydown', function (event) {
    if (event.which == 66) {
        gameOverlay.classList.toggle('active');
    }
});