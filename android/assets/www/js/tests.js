function runTests() {
    testHandHasRoyalFlush();
}

// returns a sorted deck.
function getSortedDeck() {
    var d = new Deck();
    d.shuffle();
    return d;
}

// make sure the sorted deck contains every card.
function testDeckHasAllCards() {
    var card;
    var deck = new Deck();
    deck.shuffle(5);

    for (var i = 0; i < 52; i++) {
        card = deck.drawCard();
        writeln(card.suit + '|' + card.rank);
    }
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
    writeln('has two pair? ' + hasTwoPair);
}

// test to see if the hand contains three of a kind
function testHandHasThreeOfAKind() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(4, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.CLUB, 0));
    hand.push(new Card(11, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(7, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasThreeOfAKind = sortedHand.hasThreeOfAKind();
    writeln('has three of a kind? ' + hasThreeOfAKind);
}

// test to see if the hand contains a full house
function testHandHasFullHouse() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(12, SUIT.HEART, 0));
    hand.push(new Card(12, SUIT.CLUB, 0));
    hand.push(new Card(7, SUIT.HEART, 0));
    hand.push(new Card(12, SUIT.SPADE, 0));
    hand.push(new Card(7, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasFullHouse = sortedHand.hasFullHouse();
    writeln('has full house? ' + hasFullHouse);
}

// test to see if the hand contains four of a kind
function testHandHasFourOfAKind() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(4, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.CLUB, 0));
    hand.push(new Card(11, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(4, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasFourOfAKind = sortedHand.hasFourOfAKind();
    writeln('has four of a kind? ' + hasFourOfAKind);
}

// test to see if the hand contains jacks or better
function testHandHasJacksOrBetter() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(11, SUIT.CLUB, 0));
    hand.push(new Card(4, SUIT.CLUB, 0));
    hand.push(new Card(11, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(4, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasJacksOrBetter = sortedHand.hasJacksOrBetter();
    writeln('has jacks or better? ' + hasJacksOrBetter);

    // AGAIN!

    hand = [];

    // set up a positive case.
    hand.push(new Card(1, SUIT.CLUB, 0));
    hand.push(new Card(7, SUIT.CLUB, 0));
    hand.push(new Card(1, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(9, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    hasJacksOrBetter = sortedHand.hasJacksOrBetter();
    writeln('has jacks or better? ' + hasJacksOrBetter);
}

// test to see if the hand contains a straight
function testHandHasStraight() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(8, SUIT.CLUB, 0));
    hand.push(new Card(7, SUIT.CLUB, 0));
    hand.push(new Card(5, SUIT.HEART, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(6, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasStraight = sortedHand.hasStraight();
    writeln('has straight? ' + hasStraight);

    // AGAIN!

    hand = [];

    // set up a positive case.
    hand.push(new Card(1, SUIT.CLUB, 0));
    hand.push(new Card(13, SUIT.CLUB, 0));
    hand.push(new Card(10, SUIT.HEART, 0));
    hand.push(new Card(12, SUIT.SPADE, 0));
    hand.push(new Card(11, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    hasStraight = sortedHand.hasStraight();
    writeln('has straight? ' + hasStraight);

    // AGAIN!

    hand = [];

    // set up a positive case.
    hand.push(new Card(1, SUIT.DIAMOND, 0));
    hand.push(new Card(3, SUIT.CLUB, 0));
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(5, SUIT.SPADE, 0));
    hand.push(new Card(2, SUIT.CLUB, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    hasStraight = sortedHand.hasStraight();
    writeln('has straight? ' + hasStraight);
}

// test to see if the hand contains a flush
function testHandHasFlush() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(4, SUIT.HEART, 0));
    hand.push(new Card(5, SUIT.HEART, 0));
    hand.push(new Card(11, SUIT.HEART, 0));
    hand.push(new Card(1, SUIT.HEART, 0));
    hand.push(new Card(7, SUIT.HEART, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasFlush = sortedHand.hasFlush();
    writeln('has flush? ' + hasFlush);
}

// test to see if the hand contains a straight flush
function testHandHasStraightFlush() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(4, SUIT.SPADE, 0));
    hand.push(new Card(5, SUIT.SPADE, 0));
    hand.push(new Card(6, SUIT.SPADE, 0));
    hand.push(new Card(7, SUIT.SPADE, 0));
    hand.push(new Card(8, SUIT.SPADE, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasFlush = sortedHand.hasFlush();
    writeln('has straight flush? ' + hasFlush);
}

// test to see if the hand contains a royal flush
function testHandHasRoyalFlush() {
    writeln('sorted hand:');
    var hand = [];

    // set up a positive case.
    hand.push(new Card(1, SUIT.DIAMOND, 0));
    hand.push(new Card(10, SUIT.DIAMOND, 0));
    hand.push(new Card(13, SUIT.DIAMOND, 0));
    hand.push(new Card(12, SUIT.DIAMOND, 0));
    hand.push(new Card(11, SUIT.DIAMOND, 0));

    var sortedHand = new Hand(hand);
    sortedHand.sortHand();

    for (var i = 0; i < 5; i++) {
        writeln(hand[i].suit + '|' + hand[i].rank);
    }

    var hasFlush = sortedHand.hasFlush();
    writeln('has royal flush? ' + hasFlush);
}

function writeln(text) {
    $('#testOutput').html($('#testOutput').html() + '<br />' + text);
}