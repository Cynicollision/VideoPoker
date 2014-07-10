// "enumeration" of suits.
var SUIT = { CLUB: 'CLUB', DIAMOND: 'DIAMOND', HEART: 'HEART', SPADE: 'SPADE' };

// "constants"
var CONST_LOCALSTORAGE_MONEY = 'stnVpMoney';
var CONST_LOCALSTORAGE_WAGER = 'stnVpWager';
var CONST_LOCALSTORAGE_HANDSPLAYED = 'stnVpHandsPlayed';
var CONST_INITIAL_MONEY = 980;
var CONST_INITIAL_WAGER = 10;

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
    var width = $(document).width();

    // adjust font size to fill up as much of the screen as possible.
    if (width > 500) {
        var pct = (width / 900) * 100
        $("#game").css('font-size', pct + '%');
    }

    // set up click handlers
    $('#dealButton').click(onClickDeal);
    $('#wagerButtonDown').click(onClickWagerDown);
    $('#wagerButtonUp').click(onClickWagerUp);
    $('#handCardDisplay0').click({ pos: 0 }, holdCardToggle);
    $('#handCardDisplay1').click({ pos: 1 }, holdCardToggle);
    $('#handCardDisplay2').click({ pos: 2 }, holdCardToggle);
    $('#handCardDisplay3').click({ pos: 3 }, holdCardToggle);
    $('#handCardDisplay4').click({ pos: 4 }, holdCardToggle);

    //pre-load images.
    preloadImages([
    'img/spade.png',
    'img/club.png',
    'img/heart.png',
    'img/diamond.png'
    ]);
});


function preloadImages(imgs) {
    $(imgs).each(function () {
        $('<img/>')[0].src = this;
    });
}

// start the game: main entry point of the program.
function startGame() {
    display.hideCards();
    display.setStatusDisplayText('Place your wager, then click Deal');
    display.setDealButtonText('Deal');
    display.setWagerButtonsVisible(true);

    // reset number of hands played
    setHandsPlayed(0);

    // initial money, wager, and hands played values. load from localStorage if possible.
    loadOrSetInitialValues();

    var wut = localStorage;

    // shuffle the deck
    deck.shuffle(8);
    gameOver = false;
    handOver = true;
}


// hold/un-hold the card at the given display position.
function holdCardToggle(event) {
    // determine which card was clicked based on the event arguments.
    var pos = event.data.pos;

    // flash the card
    display.flashButton($("#handCardDisplay" + pos), "#eee");

    if (pos >= 0 && pos < hand.length && !handOver && !gameOver) {
        var card = hand[pos];
        card.isHeld = !card.isHeld;

        // show that the card is held or not by setting the border color
        display.setCardHeld(pos, card.isHeld);
    }
}


// the "Deal" button was clicked.
function onClickDeal() {
    // flash the button
    display.flashButton($("#dealButton"), "#f66");

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
                // get the value of the hand and award any winnings.
                var finishedHand = new Hand(hand);
                var score = finishedHand.getScore();
                var winnings = score[0] * wager;
                var originalMoney = money;
                var newMoney = money + winnings;
                setMoney(newMoney);

                // if the wager amount is greater than the new amount of money, match them.
                if (getWager() > newMoney) {
                    setWager(newMoney);
                }

                // if crossing thing $1000 threshold, set the wager amount to $100.
                // after having $1000 bets will now be incremented by $100 instead of $10.
                if ((originalMoney < 1000) && newMoney >= 1000) {
                    setWager(100);
                }

                

                if (getMoney() == 0) {
                    // game over!
                    showGameOver();
                    
                } else {
                    // save progress.
                    saveToLocalStorage();

                    // play another hand
                    display.setStatusDisplayText(score[1] + '! Earned $' + winnings);
                    handOver = true;
                    deck = new Deck(); // shuffle the deck. need a new Deck since we pop cards off when we deal.
                    deck.shuffle();

                    // show the wager buttons
                    display.setWagerButtonsVisible(true);

                    setTimeout(function () {
                        // if still showing the "Earned" message, prompt the user.
                        if (display.getStatusDisplayText().indexOf('Earned') > 0) {
                            display.hideCards();
                            display.setStatusDisplayText('Place your wager, then click Deal');
                        }
                        
                    }, 3000);
                }

                

            }, order * 250);
        } else if (money - wager >= 0) {
            // reset to new hand.
            handOver = false;
            dealNewHand();

            var money = getMoney();
            money -= getWager();
            setMoney(money);

            // hide the wager buttons and show a message.
            display.setWagerButtonsVisible(false);
            display.setStatusDisplayText('Select cards to hold');
        }
    } else {
        startGame();
    }
}

// deals a new hand
function dealNewHand() {
    // increment the counter
    incHandsPlayed();

    var card;
    hand = [];

    for (var i = 0; i < 5; i++) {
        card = deck.drawCard();
        hand.push(card);
        display.setCard(i, card, i + 1);
        display.setCardHeld(i, false);
    }
}

// shows a "game over" message and prompts the user to play again.
function showGameOver() {
    // clear any saved values.
    resetLocalStorage();
    gameOver = true;


    // show the message.
    var message;
    var handsPlayed = getHandsPlayed();
    if (handsPlayed == 1) {
        message = 'Game over... survived ' + handsPlayed + ' hand.';
    } else {
        message = 'Game over... survived ' + handsPlayed + ' hands.';
    }
   
    display.setStatusDisplayText('Game over... survived ' + handsPlayed + ' hands.');
    display.setDealButtonText('Run to ATM!');
}


// the wager-up button was clicked.
function onClickWagerUp() {
    // flash the button
    display.flashButton($("#wagerButtonUp"), "#3bf");

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
    // flash the button
    display.flashButton($("#wagerButtonDown"), "#3bf");

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

// return number of hands played since game over.
function getHandsPlayed() {
    return handsPlayed;
}

// set number of hands played. 
function setHandsPlayed(num) {
    handsPlayed = num;
}

// increment number of hands played.
function incHandsPlayed() {
    handsPlayed++;
}

// save persistent values to localStorage
function saveToLocalStorage() {
    localStorage.setItem(CONST_LOCALSTORAGE_MONEY, getMoney());
    localStorage.setItem(CONST_LOCALSTORAGE_WAGER, getWager());
    localStorage.setItem(CONST_LOCALSTORAGE_HANDSPLAYED, getHandsPlayed());
}

// reset localStorage values to their defaults.
function resetLocalStorage() {
    localStorage.setItem(CONST_LOCALSTORAGE_MONEY, null);
    localStorage.setItem(CONST_LOCALSTORAGE_WAGER, CONST_INITIAL_WAGER);
    localStorage.setItem(CONST_LOCALSTORAGE_HANDSPLAYED, 0);
}

// load values from localStorage or set their initial values.
function loadOrSetInitialValues() {
    // load or set initial money value.
    var storedMoney = localStorage.getItem(CONST_LOCALSTORAGE_MONEY);
    if (storedMoney !== null && storedMoney > 0) {
        setMoney(storedMoney);
    } else {
        setMoney(CONST_INITIAL_MONEY);
    }

    // load or set initial wager value.
    var storedWager = localStorage.getItem(CONST_LOCALSTORAGE_WAGER);
    if (storedWager !== null && storedWager > 0) {
        setWager(storedWager);
    } else {
        setWager(CONST_INITIAL_WAGER);
    }

    // load number of hands played.
    var storedHandsPlayed = localStorage.getItem(CONST_LOCALSTORAGE_HANDSPLAYED);
    if (storedHandsPlayed !== null) {
        setHandsPlayed(storedHandsPlayed);
    } else {
        setHandsPlayed(0);
    }
}