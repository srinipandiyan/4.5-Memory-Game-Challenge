const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let blockClicking = false;
let matches = 0;
let tries = 0;
let card1 = null;
let card2 = null;

// TODO: Implement this function!
function handleCardClick(event) {
  
  //prevents handleCardClick function from executing if blockClicking is true or during matching
  if (blockClicking == true) return;
  if (event.target.classList.contains("matched")) return;
  //flips card and reveals the color as per className
  event.target.style.backgroundColor = event.target.className;

  //selecting card1 and card2 by adding a class of "matched"
  if (card1 == null || card2 == null) {
    event.target.classList.add("matched");
    card1 = card1 || event.target;

    // cannot select same card element twice to produce a match
    if (event.target === card1){
      card2 = null
    } else {
      card2 = event.target
    }
  }

  //conditionals to be run after card1 and card2 are selected
  if (card1 && card2) {
    //cannot click elsewhere until cards are assessed and blockClicking is set to false
    blockClicking = true;

    //conditions if card1 and card2 match
    if (card1.className === card2.className){
      //blockClicking is set to false (game can continue) and matches and tries are updated
      blockClicking = false;
      matches++;
      tries++;

      //<div> elements associated with card1 and card2 are removed from EventListener and values reset to null to allow next selection
      card1.removeEventListener("click", handleCardClick);
      card1 = null;

      card2.removeEventListener("click", handleCardClick);
      card2 = null;

    } else {
      //timeout to allow faceup cards to "fade" back into facedown cards
      setTimeout(function() {
        //classList is updated to remove "matched" placeholder
        //backgroundColor is set to default for facedown card elements
        //card1 and card2 are assigned null to prepare for the next selection round
        card1.classList.remove("matched");
        card1.style.backgroundColor = "";
        card1 = null;

        card2.classList.remove("matched");
        card2.style.backgroundColor = "";
        card2 = null;

        //blockClicking is set to false and tries updated
        blockClicking = false;
        tries++;
      }, 1000);
    }
  }
  
  //once all cards are matched, player is alerted and number of tries is displayed
  if ((matches * 2) === COLORS.length){
    alert(`You've won with ${tries} attempts!`);
  }

}


// when the DOM loads
createDivsForColors(shuffledColors);
