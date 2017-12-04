var startScreen = document.querySelector('#start-screen');

var gameOverlay = document.querySelector('#game-overlay');
var itemBagButton = document.querySelector('#item-bag');

var clues = document.querySelectorAll('.clue');
var clueContent = document.querySelectorAll('.clue-content');

var lastClue;

document.addEventListener('keydown', function (event) {
    if (event.which == 13) {
        startScreen.classList.add('remove');
    }
});

document.addEventListener('keydown', function (event) {
    if (event.which == 66) {
        gameOverlay.classList.toggle('active');
    }
});

for (var i = 0; i < clues.length; i++) {
    clues[i].addEventListener('keydown', showClue(i));
}

function showClue(index) {
    return function () {
        if (lastClue != undefined) {
            clueContent[lastClue].style.zIndex = '0';
            clues[lastClue].tabIndex = '-1';
        }
        
        if (event.which == 39) {
            index += 1;
        } else if (event.which == 37) {
            index -= 1;
        }
                
        clues[index].focus();
        clues[index].tabIndex = '0';
        
        clueContent[index].style.zIndex += '1';
        
        lastClue = index;
    };
}
