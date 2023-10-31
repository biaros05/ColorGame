"use strict";

/**
 * Generates the DOM for the game board based on size
 * @param {Number} size - The size of the board
 */
function setBoard(size) {
    const board = document.getElementById("board");
    const message = document.getElementById("goal");
    let row = undefined;
    let tile = undefined;
    for (let i = 0; i < size; i++) {
        row = document.createElement("div");
        row.classList.add("row");
        board.insertBefore(row, message);
        for (let j = 0; j < size; j++) {
            tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
        }
    }
}

/**
 * Sets the background colors of each tile on the board based on difficulty
 * @param {Number} difficulty - The difficulty level
 */
function setColors(difficulty) {
    const tiles = document.querySelectorAll(".tile");
    let min = 0;
    let max = 255;
    if (difficulty === 1) {
        min = generateRandomBetween(0, 255 - 80);
        max = min + 80;
    } else if (difficulty === 2) {
        min = generateRandomBetween(0, 255 - 40);
        max = min + 40;
    } else if (difficulty === 3) {
        min = generateRandomBetween(0, 255 - 10);
        max = min + 10;
    }
    tiles.forEach(tile => setRGBwithinBounds(min, max, tile));
}

/**
 * Sets the background color of a tile, where the RGB values are within a certain bound of each other
 * @param {Number} min - The min rgb value between each tile
 * @param {Number} max - The max rgb value between each tile
 * @param {HTMLDivElement} tile - A tile tile on the board
 */
function setRGBwithinBounds(min, max, tile) {
    const red = generateRandomBetween(min, max);
    let green = generateRandomBetween(min, max);
    while (green === red){
        green = generateRandomBetween(min, max);
    }
    let blue = generateRandomBetween(min, max);
    while (blue === red || blue === green){
        blue = generateRandomBetween(min, max);
    }
    tile.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Computes a random number between 2 bounds
 * @param {Number} min - Lower bound 
 * @param {Number} max - Upper bound
 * @returns A random number between min and max
 */
function generateRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Empties the game board and resets the color of the button
 */
function emptyBoard(){
    document.querySelectorAll(".row").forEach(row => row.remove());
    clearButtonColor();
}

/**
 * Changes the color of the button to the color value selected
 * @param {String} - The background color of the button
 */
function changeButton(color) {
    document.getElementById("form-button").style.backgroundColor = color;
}

/**
 * Changes the color background back to default
 */
function clearButtonColor() {
    document.getElementById("form-button").style.backgroundColor = "";
}

/**
 * Displays a message with target tiles to select and selected tiles count
 */
function targetMessage() {
    const message = document.getElementById("goal");
    const correctTiles = determineNumberOfCorrectGuesses();
    const tilesSelected = Array.from(document.querySelectorAll(".tile"))
        .filter(tile => tile.hasAttribute("selected"))
        .length;
    const color = document.getElementById("color").value;
    message.textContent = `Search for ${color} tiles! Your target is ${correctTiles} tiles! ${tilesSelected} selected!`;
}

/**
 * Clears the message that represents the user's goal
 */
function targetMessageRemove() {
    document.getElementById("goal").textContent = "";
}
