function Deck() {
    // add one card of each suit and rank to the deck
    for (var s in SUIT) {
        if (SUIT.hasOwnProperty(s)) {
            for (var r = 0; r < 13; r++) {
                this.cards.push(new Card(r, s));
            }
        }
    }
}

// all cards in the deck
Deck.prototype.cards = [];

// shuffle the deck the given number of times
Deck.prototype.shuffle = function (times) {
    if (times === undefined) {
        times = 1;
    }

    for (var i = 0; i < times; i++) {
        for (var j = 0; j < this.cards.length; j++) {
            var swap = getRandomInt(0, this.cards.length - 1);
            this.swapCards(j, swap);
        }
    }
}

// swaps card at pos1 with the card at pos2
Deck.prototype.swapCards = function (pos1, pos2) {
    var swap = this.cards[pos1];
    this.cards[pos1] = this.cards[pos2];
    this.cards[pos2] = swap;
}

// draw the next card from the top of the deck
Deck.prototype.drawCard = function () {
    return this.cards.pop();
}

// inclusive random integer generator.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}