"use strict";

/**
 * Updates the UI so that when a tile is clicked, it has a border and an attribute of selected.
 * If the tile has alrealy been selected, we remove the attrribute and the border (aka the css class)
 * @param {HTMLDivElement} el - The tile element on which the click event was launched 
 */
function toggleTileSelection(el) {
    if (el.hasAttribute("selected")) {
        el.classList.remove("selected");
        el.removeAttribute("selected");
    } else if (el.classList.contains("tile")) {
        el.setAttribute("selected", "true");
        el.classList.add("selected");
    }
}

/**
 * Counts the number of valid tiles that contain a predominant color.
 * This number is the total number of possible right guesses
 * @returns The number of possible correct selections/guesses
 */
function determineNumberOfCorrectGuesses() {
    const color = document.getElementById("color").value;
    const allTiles = Array.from(document.querySelectorAll(".tile"));
    const arrayOfAllRgbValues = allTiles.map(tile => transformStringRgbToIntegerRgb(tile))
    return determineNumberOfValidTiles(color, arrayOfAllRgbValues);
}

/**
 * This function loops through the RGB values array of all tiles and 
 * determines how many are considered correct guesses (based on color chosen)
 * @param {String} color - represents the color chosen by user
 * @param {Array} rgbArray - an array of each rgb values for every tile
 * @returns - returns the total number of valid tiles
 */
function determineNumberOfValidTiles(color, rgbArray)
{
    const COLORS = ["red", "green", "blue"];
    const index = COLORS.indexOf(color);
    let numValidTiles = 0;
    rgbArray.forEach(singleRGB => {
        const highest = singleRGB.reduce((acc, cur) => {return Math.max(acc, cur)});
        const highestIndex = singleRGB.indexOf(highest);
        if (COLORS[highestIndex] === COLORS[index]) {
            numValidTiles++;
        }
    });
    return(numValidTiles);
}

/**
 * Loops through all the tiles that the user has selected and counts the ones that are valid, 
 * meaning they have the highest rgb value for a chosen color
 * @returns - The number of selected tiles that are valid/correctly guessed
 */
function determineNumberOfValidSelections() {
    const color = document.getElementById("color").value;
    const selectedTiles = Array.from(document.querySelectorAll(".tile")).filter(tile => tile.hasAttribute("selected"));
    const arrayOfSelectedRgbValues = selectedTiles.map(tile => transformStringRgbToIntegerRgb(tile))
    let validSelections = 0;
    arrayOfSelectedRgbValues.forEach(rgb => {
        if ((color === "red"   && rgb[0] > rgb[1] && rgb[0] > rgb[2])   || 
            (color === "green" && rgb[1] > rgb[0] && rgb[1] > rgb[2])   || 
            (color === "blue"  && rgb[2] > rgb[1] && rgb[2] > rgb[0])) {
                validSelections++;
        }
    });
    return validSelections;
}

/**
 * Transform the style.backgroundColor string rgb value into an array of integers for a tile
 * @param {HTMLDivElement} tile - The tile with a style.backgroundColor 
 * @returns An array of rgb values for a tile
 */
function transformStringRgbToIntegerRgb(tile) {
    const rgbString = tile.style.backgroundColor.substring(String("rgb(").length, tile.style.backgroundColor.length - 1);
    const rgbStringArray = rgbString.split(",");
    const rgbIntegerArray = rgbStringArray.map(str => Number(str));
    return rgbIntegerArray;
}

/**
 * Calculates the score 
 * @param {Number} numberOfCorrectAnswers - Number of correct answers on the board
 * @param {Number} numberOfCorrectUserHasGuessed - Number of correct guesses the user has made
 * @param {Number} size - Size of the board 
 * @param {Number} difficulty - Difficulty level
 * @returns The score 
 */
function determineScore(numberOfCorrectAnswers, numberOfCorrectUserHasGuessed, size, difficulty) {
    const percent = (2 * numberOfCorrectAnswers - numberOfCorrectUserHasGuessed) / (size * size);
    return Math.floor(percent * 100 * size * (difficulty + 1));
}

/**
 * Displays the names and scores from local storage in descending order
 */
function displayScoreDescending() {
    const storage = fetchDataFromLocalStorage()
    storage.sort((a, b) => Number(a.score) > Number(b.score) ? -1 : 1)
           .slice(0,10)
           .forEach(obj => appendNameAndScore(obj))
}

/**
 *Displays the names and scores from local storage in ascending order
 */
function displayScoreAscending() {
    const storage = fetchDataFromLocalStorage()
    storage.sort((a, b) => Number(a.score) < Number(b.score) ? -1 : 1)
           .slice(0, 10)
           .forEach(obj => appendNameAndScore(obj));
}

/**
 * Appends the name and score to the DOM at the appropriate location
 * @param {Object} obj - Object data type contains key/value pairs of local storage
 */
function appendNameAndScore(obj) {
    const nameLi = document.createElement("li");
    const scoreLi = document.createElement("li");
    nameLi.textContent = obj.name;
    scoreLi.textContent = obj.score;
    document.getElementById("name-list").appendChild(nameLi);
    document.getElementById("score-list").appendChild(scoreLi);
}

/**
 * Fetches all key/value pairs from the dom
 * @returns Object that maps the key/value pairs of local storage
 */
function fetchDataFromLocalStorage() {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
        data.push({name: localStorage.key(i), score: localStorage.getItem(localStorage.key(i))});
    }
    return data;
}

/**
 * Removes all scores from the dom, but not local storage
 */
function emptyHighScoreDOM() {
    Array.from(document.getElementsByTagName("ul")).forEach(ul => ul.textContent = undefined);
}

/**
 * Removes all scores from dom and local storage
 */
function emptyHighScore() {
    emptyHighScoreDOM();
    localStorage.clear();
}