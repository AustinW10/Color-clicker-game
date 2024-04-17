let allCells = document.getElementsByClassName("cell");

// The current yellow / clickable cell
let currentChoosenCell = allCells[0];
let score = -1;
let previousIndex = 0;
/** 
 * Takes the last cell in the animation and resets the color
 * 
 * @type {Element} */
let resetCell = allCells[0];

/** 
 * Keeps track of what animation to play next
 * 
 * - 0: frontToBack( )
 * - 1: randomAnimation( )
 * - 2: backToFront( )
 * 
 * @type {number} */
let animationCounter = 0;
startNextRound();

/**
 * Upon choosing a square it starts the next sequence and increases your score by 1 while changing the animation
 *
 */
function startNextRound() {
    resetCurrentChosenCell();
    increaseScore();

    // Cycles through animations
    if (animationCounter == 0) frontToBack();
    if (animationCounter == 1) randomAnimation();
    if (animationCounter == 2) backToFront();

    animationCounter += 1;
    // if the animation counter equals 3 restart the animation cycle
    if (animationCounter == 3) animationCounter = 0;

    setTimeout(() => {
        resetCell.id = "";
        activateNewCell();
    }, 3000);
}

/**
 * Animates a sequence of cells changing from yellow to red front to back
 *
 */
function frontToBack() {
    // Converts an HTML collection into an Array so we can use forEach
    let allCellsArray = Array.from(allCells);
    resetCell = allCells[11];
    allCellsArray.forEach(iterateAnimation);
}

/**
 * Randomly animates the array of cells from yellow to red
 *
 */
function randomAnimation() {
    // Converts an HTML collection into an Array so we can use forEach 
    let allCellsArray = Array.from(allCells);
    allCellsArray = shuffleArray(allCellsArray);
    resetCell = allCellsArray[11];

    allCellsArray.forEach(iterateAnimation);
}

/**
 * Iterates through cells changing it to yellow after a delay
 *
 * @param {Element} element
 * @param {number} position
 * @param {Element[]} originalArray
 */
function iterateAnimation(element, position, originalArray) {
    setTimeout(() => {
        element.id = "yellow";
        if (position > 0) originalArray[position - 1].id = "";
    }, position * 250);
}

/**
 * Animates the cells from red to yellow in reverse order
 *
 */
function backToFront() {
    // In this animation the "last" index to change colors is 0 because it goes back to front
    resetCell = allCells[0];

    // Iterates through all cells backwards
    // Assigns index to the entire length of allCells 
    // If index is greater than 0 
    // Decrease the index by 1
    for (
        let index = allCells.length;
        index > 0;
        index -= 1
    ) {
        setTimeout(() => {
            // adjustedIndex is created because the index incorrectly off by 1
            // Example: 12, 11, 10 ... 1 
            let adjustedIndex = index - 1;
            let element = allCells[adjustedIndex];
            element.id = "yellow";
            // Logic to set the previous cell to red
            // checks to make sure the adjustedIndex is not 11
            if (adjustedIndex != 11) allCells[adjustedIndex + 1].id = "";
        }, (allCells.length - index) * 250);
    }

    // 3 parts
    // Variable creation - posision / index
    // If check - uses index
    // Increase / decrease

    // for (
    //     let index = 0;
    //     index < 11;
    //     index += 2
    // ) {
    //     console.log(index);
    // }

    // let otherIndex = 0;
    // while (otherIndex < 11) {
    //     console.log(otherIndex);
    //     otherIndex += 2;
    // }

    // for (let msg = "Hello World"; msg.length < 17; msg += "!") {
    //     console.log(msg);
    // }
}

/**
 * Randomly picks a new cell and activates it
 *
 */
function activateNewCell() {
    currentChoosenCell = getRandomItem(allCells);
    // Replaces whatever current cell color with a yellow one
    currentChoosenCell.id = "yellow";

    // Event Listener
    // Part 1: Type, "click", "keyboard key", "hover"
    // Part 2: Function that executes when the event happens
    currentChoosenCell.addEventListener("click", startNextRound);
}

/**
 * After the cell is clicked it removes the ability to click it and resets it's color
 *
 */
function resetCurrentChosenCell() {
    // Removes the ability to click the targeted cell
    currentChoosenCell.removeEventListener("click", startNextRound);
    // Reset the id of the currently choosen cell
    currentChoosenCell.id = "";
}

/**
 * Increase the global variable "score" and display it
 *
 */
function increaseScore() {
    score += 1;
    document.getElementById("score").innerHTML = score;
}

/**
 * Returns a random item of the HTML collection
 *
 * @param {HTMLCollectionOf<Element>} array
 * @return {Element} 
 */
function getRandomItem(array) {

    // get random index value
    let index = Math.floor(Math.random() * array.length);
    while (index == previousIndex) {
        console.log("Random failed, trying again: " + index);
        index = Math.floor(Math.random() * array.length);
    }

    previousIndex = index;

    // get random item
    const item = array[previousIndex];

    return item;
}

/**
 * Takes an array and shuffles it then returns the shuffled array
 *
 * @param {Element[]} elementArray
 * @return {Element[]} 
 */
function shuffleArray(elementArray) {
    for (let i = elementArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elementArray[i], elementArray[j]] = [elementArray[j], elementArray[i]];
    }
    return elementArray;
}
