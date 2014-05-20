/**
 * DisplayManager handles interaction with the HTML/CSS for 
 * showing the cards and their states.
 */
function DisplayManager() {
}

// show the given card at the given position.
DisplayManager.prototype.setCard = function (position, card) {
    var suitChar;
    var isRed = false;
    switch (card.suit) {
        case SUIT.SPADE:
            suitChar = '&spades;';
            break;
        case SUIT.DIAMOND:
            suitChar = '&diams;';
            isRed = true;
            break;
        case SUIT.CLUB:
            suitChar = '&clubs;';
            break;
        case SUIT.HEART:
            suitChar = '&hearts;';
            isRed = true;
            break;
    }

    // show the suit
    var handCardSuitDisplay = '#handCardSuitDisplay' + position;
    $(handCardSuitDisplay).html(suitChar);
    
    if (isRed) {
        $(handCardSuitDisplay).css('color', '#f00');
    }
    
    // TODO: show card rank in corners
    var handCardDisplay = '#handCardDisplay' + position;
    $(handCardDisplay).html(card.rank + $(handCardSuitDisplay)[0].outerHTML);
}

// set whether the card at the given position is held.
DisplayManager.prototype.setCardHeld = function (pos, isHeld) {
    var handCardDisplay = '#handCardDisplay' + pos;
    if (isHeld) {
        $(handCardDisplay).css('border-color', '#f00');
    } else {
        $(handCardDisplay).css('border-color', '#fff');
    }
}

DisplayManager.prototype.setWagerDisplay = function (amount) {
    $('#wagerDisplay').html('Wager:<br />$' + amount);
}

DisplayManager.prototype.getWagerAmount = function () {
    return parseInt($('#wagerDisplay').text().replace(/\D/g, ''));
}

DisplayManager.prototype.setMoneyDisplay = function (amount) {
    $('#moneyDisplay').text('$' + amount);
}

DisplayManager.prototype.getMoneyAmount = function () {
    return parseInt($('#moneyDisplay').text().replace(/\D/g, ''));
}