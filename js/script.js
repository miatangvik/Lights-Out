var gameOverlay = document.querySelector('#game-overlay');
var itemBagButton = document.querySelector('#item-bag');

itemBagButton.addEventListener('mousedown', function () {
    gameOverlay.classList.toggle('active');
});

document.addEventListener('keydown', function (event) {
    if (event.which == 66) {
        gameOverlay.classList.toggle('active');
    }
});