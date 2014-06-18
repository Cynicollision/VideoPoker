/**
 * A hand of 5 cards. This class provides the logic for evaluating what you have in your hand (e.g. straight, full house, etc.)
 */

function Hand(handCards) {
    this.cards = handCards;
    this.sortHand();
    this.determination = "Nothing";
    this.determinationScore = 0;
}


Hand.prototype.sortHand = function () {
    quickSort(this.cards, 0, this.cards.length - 1);
}

Hand.prototype.getScore = function () {
    if (this.hasRoyalFlush()) {
        return [250, "Royal Flush"];
    } else if (this.hasStraightFlush()) {
        return [50, "Straight Flush"];
    } else if (this.hasFourOfAKind()) {
        return [25, "Four of a Kind"];
    } else if (this.hasFullHouse()) {
        return [9, "Full House"];
    } else if (this.hasFlush()) {
        return [6, "Flush"];
    } else if (this.hasStraight()) {
        return [4, "Straight"];
    } else if (this.hasThreeOfAKind()) {
        return [3, "Three of a Kind"];
    } else if (this.hasTwoPair()) {
        return [2, "Two Pair"];
    } else if (this.hasJacksOrBetter()) {
        return [1, "Jacks or better"];
    } else {
        return [0, "Nothing"];
    }  
}


// true if hand contains two pairs of cards with the same rank.
Hand.prototype.hasTwoPair = function () {
    if (this.cards[0].rank == this.cards[1].rank && this.cards[2].rank == this.cards[3].rank) {
        return true;
    } else if (this.cards[0].rank == this.cards[1].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else if (this.cards[1].rank == this.cards[2].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else {
        return false;
    }
}


// true if hand contains three cards with the same rank.
Hand.prototype.hasThreeOfAKind = function () {
    if (this.cards[0].rank == this.cards[1].rank && this.cards[1].rank == this.cards[2].rank) {
        return true;
    } else if (this.cards[1].rank == this.cards[2].rank && this.cards[2].rank == this.cards[3].rank) {
        return true;
    } else if (this.cards[2].rank == this.cards[3].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else {
        return false;
    }
}


// true if hand contains one pair of cards with the same rank and three cards of another rank.
Hand.prototype.hasFullHouse = function () {
    if (this.cards[0].rank == this.cards[1].rank && this.cards[2].rank == this.cards[3].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else if (this.cards[0].rank == this.cards[1].rank && this.cards[1].rank == this.cards[2].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else {
        return false;
    }
}

// true if hand contains all four cards with the same rank.
Hand.prototype.hasFourOfAKind = function () {
    if (this.cards[0].rank == this.cards[1].rank && this.cards[1].rank == this.cards[2].rank && this.cards[2].rank == this.cards[3].rank) {
        return true;
    } else if (this.cards[1].rank == this.cards[2].rank && this.cards[2].rank == this.cards[3].rank && this.cards[3].rank == this.cards[4].rank) {
        return true;
    } else {
        return false;
    }
}

// true if a pair of cards are jacks or better
Hand.prototype.hasJacksOrBetter = function () {
    if (this.cards[0].rank == this.cards[1].rank && isJacksOrBetter(this.cards[0])) {
        return true;
    } else if (this.cards[1].rank == this.cards[2].rank && isJacksOrBetter(this.cards[1])) {
        return true;
    } else if (this.cards[2].rank == this.cards[3].rank && isJacksOrBetter(this.cards[2])) {
        return true;
    } else if (this.cards[3].rank == this.cards[4].rank && isJacksOrBetter(this.cards[3])) {
        return true;
    } else {
        return false;
    }
}

function isJacksOrBetter(card) {
    return (card.rank == 1) || (card.rank > 10);
}

// true if all cards in the hand are incremental.
Hand.prototype.hasStraight = function () {
    if (this.cards[0].rank == this.cards[1].rank - 1 && this.cards[1].rank == this.cards[2].rank - 1 && this.cards[2].rank == this.cards[3].rank - 1 && this.cards[3].rank == this.cards[4].rank - 1) {
        return true;
    } else if (this.cards[1].rank == 10 && this.cards[2].rank == 11 && this.cards[3].rank == 12 && this.cards[4].rank == 13 && this.cards[0].rank == 1) {
        return true;
    } else {
        return false;
    }
}

// true if all suits match
Hand.prototype.hasFlush = function () {
    if (this.cards[0].suit == this.cards[1].suit && this.cards[1].suit == this.cards[2].suit && this.cards[2].suit == this.cards[3].suit && this.cards[3].suit == this.cards[4].suit) {
        return true;
    } else {
        return false;
    }
}

// true if the hand is a straight and all suits match.
Hand.prototype.hasStraightFlush = function () {
    return (this.hasStraight() && this.hasFlush());
}

// true if all suits match and rank 10 and up.
Hand.prototype.hasRoyalFlush = function () {
    return (this.hasStraight() && this.hasFlush() && h[0].rank == 1 && h[1].rank == 10 && h[2].rank == 11 && h[3].rank == 12 && h[4].rank == 13);
}




// quickSort credit: http://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
function quickSort(items, left, right) {
    var index;

    if (items.length > 1) {
        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }
    }

    return items;
}

function swap(items, pos1, pos2) {
    var temp = items[pos1];
    items[pos1] = items[pos2];
    items[pos2] = temp;
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)];
    var i = left;
    var j = right;

    while (i <= j) {
        while (items[i].rank < pivot.rank) {
            i++;
        }

        while (items[j].rank > pivot.rank) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}