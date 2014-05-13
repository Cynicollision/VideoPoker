function DisplayManager() {

}

DisplayManager.prototype.setCard = function (position, card) {
    var handCardDisplay = '#handCardDisplay' + position;
    $(handCardDisplay).text('suit: ' + card.suit + ', rank: ' + card.rank);

    // TODO: get image name, set corresponding div's background image css.
}