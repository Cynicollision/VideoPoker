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
    // TODO: implement
}

// true if hand contains one pair of cards with the same rank and three cards of another rank.
Hand.prototype.hasFullHouse = function () {
    // TODO: implement
}

// true if hand contains all four cards with the same rank.
Hand.prototype.hasFourOfAKind = function () {
    // TODO: implement
}

// true if all cards in the hand are better than a 10 by rank.
Hand.prototype.hasJacksOrBetter = function () {
    // TODO: implement
}

// true if all cards in the hand are incremental.
Hand.prototype.hasStraight = function () {
    // TODO: implement
}

// true if all suits match
Hand.prototype.hasFlush = function () {
    // TODO: implement
}

// true if the hand is a straight and all suits match.
Hand.prototype.hasStraightFlush = function () {
    // TODO: implement
}

// true if all suits match and rank 10 and up.
Hand.prototype.hasRoyalFlush = function () {
    // TODO: implement
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