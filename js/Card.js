/**
 * A single card in the hand/deck.
 */

function Card(rank, suit, pos) {
    this.suit = suit;
    this.rank = rank;
    this.isHeld = false;
}