var startScreen = document.querySelector('#start-screen');

var gameOverlay = document.querySelector('#game-overlay');
var itemBagButton = document.querySelector('#item-bag');

var clues = document.querySelectorAll('.clue');
var clueContent = document.querySelectorAll('.clue-content');

var lastClue = 0;

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

function showClue(hei) {
    return function () {        
        if (event.which == 39) {
            hei++;
            
            /*clues[lastClue].tabIndex = -1;
            clues[hei].tabIndex = 0;*/
            
            clues[lastClue].blur();
            clues[hei].focus();
            
            lastClue = hei;
        } else if (event.which == 37) {
            hei--;
            
            /*clues[lastClue].tabIndex = -1;
            clues[hei].tabIndex = 0;*/
            
            clues[lastClue].blur();
            clues[hei].focus();
            
            lastClue = hei;
        }
        
        
        
        /*if (lastClue != undefined) {
            //clueContent[lastClue].style.zIndex = '0';
            clues[lastClue].tabIndex = -1;
        }
        
        if (event.which == 39) {
            hei +=1;
            console.log("new index " + hei);
            clues[hei].focus();
            clues[hei].tabIndex = 0;
            console.log("lastClue: " + lastClue);
            lastClue = hei;
        } else if (event.which == 37) {
            hei -= 1;
            console.log("new index " + hei);
            clues[hei].focus();
            clues[hei].tabIndex = 0;
            console.log("lastClue: " + lastClue);
            lastClue = hei;
        }*/
                
        
        
        
        
        //clueContent[index].style.zIndex += '1';
        
    };
}
