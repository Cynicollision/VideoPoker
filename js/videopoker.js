// "enumeration" of suits.
var SUIT = { CLUB: 'CLUB', DIAMOND: 'DIAMOND', HEART: 'HEART', SPADE: 'SPADE' };

// when set to true, the hand has been evaluated and a fresh hand will be dealt.
var handOver = false;

// available money to wager.
var money = 100;

// number of hands played.
var handsPlayed = 0;

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
    display.setStatusDisplayText('Select cards to hold');

    // shuffle the deck.
    deck.shuffle(8);

    // draw and display the cards.
    var card;
    for (var i = 0; i < 5; i++) {
        card = deck.drawCard();
        card.handPosition = i;
        hand.push(card);
        display.setCard(i, card, i + 1);
    }
    
}


// hold/un-hold the card at the given display position.
function holdCardToggle(pos) {
    if (pos >= 0 && pos < hand.length && !handOver) {
        var card = hand[pos];
        card.isHeld = !card.isHeld;

        // show that the card is held or not by setting the border color
        display.setCardHeld(pos, card.isHeld);
    }
}


// the "Deal" button was clicked.
function onClickDeal() {
    if (!handOver) {
        // cards held, re-deal.
        var order = 1; // for the delays
        var money = display.getMoneyAmount();
        var wager = display.getWagerAmount();

        if (money - wager >= 0) {
            money -= display.getWagerAmount();
            display.setMoneyDisplay(money);

            for (var i = 0; i < hand.length; i++) {
                if (!hand[i].isHeld) {
                    hand[i] = deck.drawCard();
                    display.setCard(i, hand[i], order);
                    order++;
                }
            }

            // TODO: evaluate hand here
            setTimeout(function () {
                var finishedHand = new Hand(hand);

                display.setStatusDisplayText('You got a TBD');
                handOver = true;
                deck = new Deck(); // shuffle the deck. need a new Deck since we pop cards off when we deal.
                deck.shuffle();
            }, order * 250);
            

            if (money == 0) {
                // TODO: prompt to "run to ATM"
                display.setStatusDisplayText('Game over... survived ' + handsPlayed + ' hands.');
            }
        }
    } else {
        // reset to new hand.
        for (var i = 0; i < hand.length; i++) {
            hand[i] = deck.drawCard();
            display.setCard(i, hand[i], i + 1);
            display.setCardHeld(i, false);
            order++;
        }
        
        handOver = false;
        display.setStatusDisplayText('Select cards to hold');
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


