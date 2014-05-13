// "enumeration" of suits. makes my strongly-typed mind happy.
var SUIT = { CLUB: 'CLUB', DIAMOND: 'DIAMOND', HEART: 'HEART', SPADE: 'SPADE' };

// the deck
var deck = new Deck();

$(document).ready(function () {
    startGame();
});





function startGame() {
    var display = new DisplayManager();

    // shuffle the deck.
    deck.shuffle(8);


    // display the cards
    var card;
    for (var i = 1; i <= 5; i++) {
        card = deck.drawCard();
        display.setCard(i, card);
    }
    
}

function holdCard(displayPosition) {

}

// inclusive random int generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

