/**
 * A single card in the hand/deck.
 */

function Card(rank, suit, pos) {
    this.suit = suit;
    this.rank = rank;
    this.isHeld = false;
}

function compareTo(otherCard) {
    // TODO: implement (for sorting)
}

Card.prototype.suit = 0; // suit e.g. "CLUB", "DIAMOND"
Card.prototype.rank = ''; // rank, e.g. 9, 10, 11 (jack), 12 (queen)