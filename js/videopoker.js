// "enumeration" of suits.
var SUIT = { CLUB: 'CLUB', DIAMOND: 'DIAMOND', HEART: 'HEART', SPADE: 'SPADE' };

// when set to true, the hand has been evaluated and a fresh hand will be dealt.
var handOver = false;

// available money to wager.
var money = 100;

// the deck and the hand. 
var deck = new Deck();
var hand = [];

// for interacting with the display.
var display = new DisplayManager();

// start the game after the document has finished loading.
$(document).ready(function () {
    startGame();
});


// start the game: main entry point of the program.
function startGame() {
    var display = new DisplayManager();
    display.setMoneyDisplay(money);
    display.setWagerDisplay(10);

    // shuffle the deck.
    deck.shuffle(8);

    // draw and display the cards.
    var card;
    for (var i = 0; i < 5; i++) {
        card = deck.drawCard();
        card.handPosition = i;
        hand.push(card);
        display.setCard(i, card);
    }
    
}


// hold/un-hold the card at the given display position.
function holdCardToggle(pos) {
    if (pos >= 0 && pos < hand.length) {
        var card = hand[pos];
        card.isHeld = !card.isHeld;

        // show that the card is held or not by setting the border color
        display.setCardHeld(pos, card.isHeld);
    }
}


// the "Deal" button was clicked.
function onClickDeal() {
    var money = display.getMoneyAmount();
    money -= display.getWagerAmount();
    display.setMoneyDisplay(money);

    if (!handOver) {
        // re-dealing for unheld cards.
        for (var i = 0; i < hand.length; i++) {
            if (!hand[i].isHeld) {
                hand[i] = deck.drawCard();
                display.setCard(i, hand[i]);
            }
        }
    }
}


// the wager-up button was clicked.
function onClickWagerUp() {
    var wager = display.getWagerAmount();
    var money = display.getMoneyAmount();

    // increase by 100's if the player has >= $1000, $10 otherwise.
    if (money >= 1000) {
        wager += 100;
    } else {
        wager += 10;
    }

    if (wager <= money) {
        display.setWagerDisplay(wager);
    }
}


// the wager-down button was clicked.
function onClickWagerDown() {
    var wager = display.getWagerAmount();
    var money = display.getMoneyAmount();

    // decrease by 100's if the player has >= $1000, $10 otherwise.
    if (money >= 1000) {
        wager -= 100;
    } else {
        wager -= 10
    }

    if (wager > 0) {
        display.setWagerDisplay(wager);
    }
}


