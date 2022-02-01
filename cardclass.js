class Deck 
{
    constructor() 
    {
      this.deck = [];
      this.reset(); 
      this.shuffle(); 
    } 
  
      reset() 
      {
        this.deck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit in suits) 
          for (let value in values) 
            this.deck.push(values[value] + " of " + suits[suit]);
      } 
      
      shuffle() 
      {
        let numberOfCards = this.deck.length;  

        for (var i=0; i<numberOfCards; i++) 
        {
          let j = Math.floor(Math.random() * numberOfCards);
          let tmp = this.deck[i];
          this.deck[i] = this.deck[j];
          this.deck[j] = tmp;
        }
      } 
      
      deal() {return this.deck.pop();} 
      isEmpty() {return (this.deck.length==0);} 
      length() {return this.deck.length;} 
} 

class Card 
{
  constructor(card) 
  {
    this.card = card;
    const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, 
                        "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, 
                        "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, 
                        "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, 
                        "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, 
                        "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, 
                        "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, 
                        "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, 
                        "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, 
                        "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, 
                        "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, 
                        "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, 
                        "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(" of ")+4);
    this.placeHolder = null;
    this.flipped = false;
  
    var suits = {'Hearts':0, 'Diamonds':13, 'Clubs':26, 'Spades':39 }
    this.position = suits[this.suit] + this.value; 
  } 
  
    displayCard(placeHolder, flipped=true) 
    {
      this.placeHolder = document.getElementById(placeHolder);
      this.placeHolder.classList.add("card");
      this.flipped=flipped;

      if (flipped) 
        this.placeHolder.style.backgroundPosition = -150*this.position + "px";
      else 
        this.placeHolder.style.backgroundPosition = "0px";  
    } 
    
    flip() 
    {
      if (this.flipped) 
      {
        this.placeHolder.style.backgroundPosition = "0px";
        this.flipped=false;
      } 
      else 
      {
        this.placeHolder.style.backgroundPosition = -150*this.position + "px";
        this.flipped=true;  
      }
    } 
} 

const deck = new Deck();
let card1, card2, card3, card4, card5, playerCard1, playerCard2;

function deal() 
{
  if (deck.length()<7) 
  {
    deck.reset();
    deck.shuffle();
  }  

  card1 = new Card(deck.deal());
  card2 = new Card(deck.deal());
  card3 = new Card(deck.deal());
  card4 = new Card(deck.deal());
  card5 = new Card(deck.deal());
  playerCard1 = new Card(deck.deal());
  playerCard2 = new Card(deck.deal());

  
  card1.displayCard("card1", false);  
  card2.displayCard("card2", false);  
  card3.displayCard("card3", false);  
  card4.displayCard("card4", false);  
  card5.displayCard("card5", false);  
  playerCard1.displayCard("playerCard1", true);  
  playerCard2.displayCard("playerCard2", true); 
} 

deal();

class winningHands 
{
  constructor(hand, board)
  {
    this.hand = hand;
    this.board = board;

    this.numDuplicates = [];

    this.handVals = this.hand.map(a => a.value);
    this.boardVals = this.board.map(a => a.value);
    this.allVals = this.boardVals.concat(this.handVals);

    this.handSuits = this.hand.map(a => a.suit);
    this.boardSuits = this.board.map(a => a.suit);
    this.allSuits = this.boardSuits.concat(this.handSuits);
    this.allSuits = this.allSuits.sort()
    this.sortedSuits = this.allSuits.map((seen => v => v + (seen[v] = v in seen ? seen[v] + 1 : 0))({}));

    this.maxCard = Math.max.apply(null, this.boardVals);
    this.allPairs = this.allVals.sort(function(a, b){return a-b});
    this.allPairs.forEach((x) => {this.numDuplicates[x] = (this.numDuplicates[x] || 0)+1;});
    this.duplicateSort = this.numDuplicates.filter(function(item){return item > 1 && item < 5;});
  }
    
    highCard() 
    {
      for (var card=0; card<this.handVals.length; card++)
      {
        if (this.handVals[card] > this.maxCard)
          document.getElementById("winnerCards").innerHTML = "High Card!"
      }
    }

    onePair() 
    {
      if (this.duplicateSort.length == 1 && this.duplicateSort.includes(2))
        document.getElementById("winnerCards").innerHTML = "One Pair!";
    }

    twoPair() 
    {
      if (this.duplicateSort.length == 2 && !this.duplicateSort.includes(3))
        document.getElementById("winnerCards").innerHTML = "Two Pair!";
      if (this.duplicateSort.length == 3)
        document.getElementById("winnerCards").innerHTML = "Two Pair!";
    }

    threeOfKind() 
    {
      if (this.duplicateSort.length == 1 && this.duplicateSort.includes(3))
        document.getElementById("winnerCards").innerHTML = "Three of a Kind!";
    }

    straight() 
    {
      var count = 1;
      this.straightSort = [...new Set(this.allPairs)]
      this.straightVals = [];
      for (var card=0; card<7; card++)
      {
        var nextVal = this.straightSort[card+1]
        if (count >= 5) 
          {
            this.straightVals.concat(nextVal)
            this.straightVals = this.straightVals.sort()
            document.getElementById("winnerCards").innerHTML = 'Straight!'; this.straight=True
          }
        if (count == 4 && this.straightSort[0] == 1 && this.straightSort[card] == 13)
          {
            this.straightVals.concat(this.straightSort[0])
            this.straightVals = this.straightVals.sort()
            document.getElementById("winnerCards").innerHTML = 'Straight!'; this.straight=True
          }
        else if (this.straightSort[card]==nextVal-1) 
          {
            count+=1; 
            this.straightVals.concat(this.straightSort[card])
          }
        else if (count < 5 && this.allPairs[card]!=nextVal-1) 
          {
            count=1; 
            this.straightVals = [];
          }
      } 
    }

    flush() 
    {
      for(var i = 0; i<=result.length; i++)
      {
        if (result[i] == "Clubs4" || result[i] == "Hearts4" || result[i] == "Diamonds4" || result[i] == "Spades4")
          {document.getElementById("winnerCards").innerHTML = "Flush!"; this.flush = True}
      }
    }

    fullHouse() 
    {
      if (this.duplicateSort.length == 2 && this.duplicateSort.includes(3))
        document.getElementById("winnerCards").innerHTML = "Full House!";
    }

    fourOfKind() 
    {
      if (this.duplicateSort.length == 1 && this.duplicateSort.includes(4))
        document.getElementById("winnerCards").innerHTML = "Four of a Kind!";
    }

    straightFlush() 
    {
      if (this.flush && this.straight)
        document.getElementById("winnerCards").innerHTML = "Straight Flush!";
    }

    straightFlushRoyal() 
    {
      if (this.flush && this.straight && this.straightVals==[1, 10, 11, 12, 13])
        document.getElementById("winnerCards").innerHTML = "Royal Straight Flush!";
    }
}

function nextStep(el) 
{ 
  if (!card1.flipped) 
  {
    card1.flip();
    card2.flip();
    card3.flip();
    el.innerHTML="Reveal 4<sup>th</sup> card";
  } 

  else if(!card4.flipped) 
  {
    card4.flip();
    el.innerHTML="Reveal 5<sup>th</sup> card";
  } 

  else if(!card5.flipped) 
  {
      card5.flip();

      handVals = [playerCard1, playerCard2]
      boardVals = [card1, card2, card3, card4, card5]

      hand = new winningHands(handVals, boardVals)
      hand.highCard();
      hand.onePair();
      hand.twoPair();
      hand.threeOfKind();
      hand.straight();
      hand.flush();
      hand.fullHouse();
      hand.fourOfKind();
      hand.straightFlush();
      hand.straightFlushRoyal();
      el.innerHTML="New Round";
  } 

  else 
  {
    deal();
    document.getElementById("winnerCards").innerHTML='';
    el.innerHTML="Reveal first 3 cards.";
  }
} 