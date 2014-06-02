// returns a sorted deck.
function getSortedDeck() {
    var d = new Deck();
    d.shuffle();
    return d;
}

// make sure the sorted deck contains every card.
function testDeckHasAllCards() {
    var assert = false;

    var deck = new Deck();
    deck.shuffle(5);

    for (var i = 0; i < 13; i++) {
        // TODO: implement
    }

    return assert;
}

// draw 5 cards and sort them. examine output to make sure they are in ascending order by rank.
function testHandSort() {
    var deck = getSortedDeck();

    var hand = [];

    writeln('unsorted:');

    for (var i = 0; i < 5; i++) {
        hand.push(deck.drawCard());
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    writeln('----');
    writeln('sorted:');

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }
}

// test to see if the hand contains two pairs
function testHandHasTwoPair() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(4, SUIT.HEART, 0));
    hand.push(new Card(7, SUIT.HEART, 0));
    hand.push(new Card(11, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(7, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasTwoPair = sortedHand.hasTwoPair();
    writeln('has two pair?' + hasTwoPair);
}

function writeln(text) {
    $('#testOutput').html($('#testOutput').html() + '<br />' + text);
}