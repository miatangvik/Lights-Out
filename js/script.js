var startScreen = document.querySelector('#start-screen');

var gameOverlay = document.querySelector('#game-overlay');
var itemBagButton = document.querySelector('#item-bag');

var clues = document.querySelectorAll('.clue');
var clueContent = document.querySelectorAll('.clue-content');

var lastClue = 0;

// Remove start screen when user presses enter
document.addEventListener('keydown', function (event) {
    if (event.which == 13) {
        startScreen.classList.add('remove');
    }
});

// Show bag when user presses B key and hide bag when user presses ESC key
document.addEventListener('keydown', function (event) {
    if (event.which == 66) {
        gameOverlay.classList.add('active');
        clues[0].focus();
    } else if (event.which == 27) {
        gameOverlay.classList.remove('active');
    }
});

for (var i = 0; i < clues.length; i++) {
    clues[i].addEventListener('keydown', showClue.bind(null, i));
}

function showClue(index) {
    if (event.which == 39 && index < 4) {
        clues[index + 1].focus();
    } else if (event.which == 37 && index > 0) {
        clues[index - 1].focus();
    }
}
