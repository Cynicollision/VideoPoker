/**
 * DisplayManager handles interaction with the HTML/CSS for 
 * showing the cards and their states.
 */
function DisplayManager() {
}

// show the given card at the given position.
DisplayManager.prototype.setCard = function (position, card) {
    var handCardDisplay = '#handCardDisplay' + position;
    $(handCardDisplay).text('suit: ' + card.suit + ', rank: ' + card.rank);

    // TODO: get image name, set corresponding div's background image css.
    // http://wellstyled.com/css-nopreload-rollovers.html


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