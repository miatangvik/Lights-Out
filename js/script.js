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
        clueContent[lastClue].classList.add('active');
        clues[lastClue].focus();
    } else if (event.which == 27) {
        gameOverlay.classList.remove('active');
    }
});

for (var i = 0; i < clues.length; i++) {
    clues[i].addEventListener('keydown', showClue.bind(null, i));
}

function showClue(index) {
    if (event.which == 39 && index < clues.length - 1) {
        index++;
    } else if (event.which == 37 && index > 0) {
        index--;
    }
    
    clues[index].focus();
    clueContent[lastClue].classList.remove('active');
    clueContent[index].classList.add('active');
        
    lastClue = index;
}
