/**
 * DisplayManager handles interaction with the HTML/CSS for 
 * showing the cards and their states.
 */
function DisplayManager() {    
}

// show the given card at the given position.
DisplayManager.prototype.setCard = function (position, card, order) {
    //var suitChar;
    //var isRed = false;
    var bgImage;
    switch (card.suit) {
        case SUIT.SPADE:
            //suitChar = '&spades;';
            bgImage = 'img/spade.png';
            break;
        case SUIT.DIAMOND:
            //suitChar = '&diams;';
            //isRed = true;
            bgImage = 'img/diamond.png';
            break;
        case SUIT.CLUB:
            //suitChar = '&clubs;';
            bgImage = 'img/club.png';
            break;
        case SUIT.HEART:
            //suitChar = '&hearts;';
            //isRed = true;
            bgImage = 'img/heart.png';
            break;
    }
   

    // show the suit
    var handCardDisplay = '#handCardDisplay' + position;
    $(handCardDisplay).css('visibility', 'hidden');
    $(handCardDisplay).css('background-image', 'url(' + bgImage + ')');
    setTimeout(function () { $(handCardDisplay).css('visibility', 'visible'); }, order * 250);

    // show the rank
    var rankChar;
    switch (card.rank) {
        case 11:
            rankChar = 'J';
            break;
        case 12:
            rankChar = 'Q';
            break;
        case 13:
            rankChar = 'K';
            break;
        case 1:
            rankChar = 'A';
            break;
        default:
            rankChar = card.rank;
            break;
    }
    var handCardDisplay = '#handCardDisplay' + position;
    $(handCardDisplay).html(rankChar);
}

// set whether the card at the given position is held.
DisplayManager.prototype.setCardHeld = function (pos, isHeld) {
    var handCardDisplay = '#handCardDisplay' + pos;
    if (isHeld) {
        $(handCardDisplay).css('border-color', '#c33');
    } else {
        $(handCardDisplay).css('border-color', '#fff');
    }
}

DisplayManager.prototype.setWagerDisplay = function (amount) {
    $('#wagerDisplay').html('$' + amount + ' wager');
}

DisplayManager.prototype.getWagerAmount = function () {
    return parseInt($('#wagerDisplay').text().replace(/\D/g, ''));
}

DisplayManager.prototype.setMoneyDisplay = function (amount) {
    $('#moneyDisplay').text('Funds: $' + amount);
}

DisplayManager.prototype.getMoneyAmount = function () {
    return parseInt($('#moneyDisplay').text().replace(/\D/g, ''));
}

DisplayManager.prototype.setStatusDisplayText = function (newText) {
    $('#statusDisplay').text(newText);
}

DisplayManager.prototype.getStatusDisplayText = function () {
    return $('#statusDisplay').text();
}

DisplayManager.prototype.setDealButtonText = function (newText) {
    $('#dealButton').text(newText);
}

DisplayManager.prototype.hideCards = function () {
    var handCardDisplay;
    
    for (var i = 0; i < 5; i++) {
        handCardDisplay = '#handCardDisplay' + i;
        $(handCardDisplay).css('visibility', 'hidden');
    }
}

DisplayManager.prototype.setWagerButtonsVisible = function (isVisible) {
    var visibility;

    if (isVisible) {
        visibility = 'visible';
    } else {
        visibility = 'hidden';
    }

    $('#wagerButtonDown').css('visibility', visibility);
    $('#wagerButtonUp').css('visibility', visibility);
}

DisplayManager.prototype.flashButton = function (buttonId, color) {
    var originalColor = buttonId.css('background-color');
    buttonId.animate({
        backgroundColor: color
    }, 100);
    setTimeout( buttonId.animate({
        backgroundColor: originalColor
    }, 100), 100);
}