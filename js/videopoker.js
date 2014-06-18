// "enumeration" of suits.
var SUIT = { CLUB: 'CLUB', DIAMOND: 'DIAMOND', HEART: 'HEART', SPADE: 'SPADE' };

// when set to true, the hand has been evaluated and a fresh hand will be dealt.
// this is when the player and adjust their wager.
var handOver = true;

// flag for when the player has lost.
var gameOver = false;

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
    display.hideCards();
    display.setStatusDisplayText('Place your wager, then click Deal');

    // initial money and wager values
    setMoney(100);
    setWager(10);

    // shuffle the deck
    deck.shuffle(8);
}


// hold/un-hold the card at the given display position.
function holdCardToggle(pos) {
    if (pos >= 0 && pos < hand.length && !handOver && !gameOver) {
        var card = hand[pos];
        card.isHeld = !card.isHeld;

        // show that the card is held or not by setting the border color
        display.setCardHeld(pos, card.isHeld);
    }
}


// the "Deal" button was clicked.
function onClickDeal() {
    if (!gameOver) {
        var money = getMoney();
        var wager = getWager();

        if (!handOver) {
            // cards held, re-deal.

            var order = 1; // for the delays
            for (var i = 0; i < hand.length; i++) {
                if (!hand[i].isHeld) {
                    hand[i] = deck.drawCard();
                    display.setCard(i, hand[i], order);
                    order++;
                }
            }

            // wait a bit, then evaluate the hand
            setTimeout(function () {
                // set the value of the hand.
                var finishedHand = new Hand(hand);
                var score = finishedHand.getScore();
                var winnings = score[0] * wager;
                setMoney(money + winnings);

                if (getMoney() == 0) {
                    // game over!
                    gameOver = true;
                    display.setStatusDisplayText('Game over... survived ' + handsPlayed + ' hands.');
                    display.setDealButtonText('Run to ATM!');
                } else {
                    // play another hand
                    display.setStatusDisplayText(score[1] + '! Earned $' + winnings);
                    handOver = true;
                    deck = new Deck(); // shuffle the deck. need a new Deck since we pop cards off when we deal.
                    deck.shuffle();

                    setTimeout(function () {
                        // if still showing the "Earned" message, prompt the user.
                        if (display.getStatusDisplayText().indexOf('Earned') > 0) {
                            display.hideCards();
                            display.setStatusDisplayText('Place your wager, then click Deal');
                        }
                        
                    }, 2000);
                }
            }, order * 250);
        } else if (money - wager >= 0) {
            // reset to new hand.
            dealNewHand();

            var money = getMoney();
            money -= getWager();
            setMoney(money);

            handOver = false;
            display.setStatusDisplayText('Select cards to hold');
        }
    } else {
        startGame();
    }
}

// deals a new hand
function dealNewHand() {
    // increment the counter
    handsPlayed++;

    var card;
    hand = [];

    for (var i = 0; i < 5; i++) {
        card = deck.drawCard();
        hand.push(card);
        display.setCard(i, card, i + 1);
        display.setCardHeld(i, false);
    }
}




// the wager-up button was clicked.
function onClickWagerUp() {
    if (handOver) {
        var wager = display.getWagerAmount();
        var money = display.getMoneyAmount();

        // increase by 100's if the player has >= $1000, $10 otherwise.
        if (money >= 1000) {
            wager += 100;
        } else {
            wager += 10;
        }

        if (wager <= money) {
            setWager(wager);
        }
    }
}


// the wager-down button was clicked.
function onClickWagerDown() {
    if (handOver) {
        var wager = getWager();
        var money = getMoney();

        // decrease by 100's if the player has >= $1000, $10 otherwise.
        if (money >= 1000) {
            wager -= 100;
        } else {
            wager -= 10
        }

        if (wager > 0) {
            setWager(wager);
        }
    }
}


// get the amount of money available.
function getMoney() {
    return display.getMoneyAmount();
}

// set the amount of money available.
function setMoney(amt) {
    display.setMoneyDisplay(amt);
}

// get the wager for the current hand.
function getWager() {
    return display.getWagerAmount();
}

// set the wager for the current hand.
function setWager(amt) {
    display.setWagerDisplay(amt);
}