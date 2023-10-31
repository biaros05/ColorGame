"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
    /**
     * On page load, we show all scores (if any) 
     * in descending order
     */
    let descending = true;
    displayScoreDescending();

    /**
     * On form submission, we disable the form, 
     * empty out the board of previous games,
     * create a new board and set the appropriate colors 
     */
    const form = document.forms[0];
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        disableForm(e.target);
        emptyBoard();
        setBoard(e.target.size.value);
        setColors(Number(e.target.difficulty.value));
        addCheats();
        targetMessage();
    });

    /**
     * Toggle tile selection and button submission on
     * the board
     */
    const board = document.getElementById("board");
    board.addEventListener("click", function(e) {
        let el = e.target;
        if (e.target.tagName === "P")
            el = e.target.parentElement;
        toggleTileSelection(el);
        targetMessage();
        if (e.target.id === "guess-button")
            targetMessageRemove();
    });

    /**
     * this event listener retrieves all necessary information for the determineScores 
     * method, calculates high score, and executes necessary functions to append and store the results
     */
    const guessButton = document.getElementById("guess-button");
    guessButton.addEventListener("click", function(e) {
        e.preventDefault();
        const size = document.getElementById("size").value;
        const difficulty = document.getElementById("difficulty").value;
        const name = document.getElementById("name").value
        const numberOfcorrectGuesses = determineNumberOfValidSelections();
        const numberOfSelectedTiles = [...document.querySelectorAll(".tile")]
            .filter(tile => tile.hasAttribute("selected")).length;
        const score = determineScore(numberOfcorrectGuesses, numberOfSelectedTiles, size, difficulty);
        localStorage.setItem(name, score);
        emptyHighScoreDOM();
        displayScoreDescending();
        enableForm();
        emptyBoard();
    });

    /**
     * Update color of form button depending on 
     * color input value
     */
    document.getElementById("color").addEventListener("change", function (e) {
        changeButton(e.target.value);
    });

    /**
     * Toggle ascending/descending order of scores
     */  
    const scoreHeader = document.getElementById("score-header");
    scoreHeader.addEventListener("click", function(e) {
        if (descending) {
            emptyHighScoreDOM();
            displayScoreAscending();
            descending = false;
        } else {
            emptyHighScoreDOM();
            displayScoreDescending();
            descending = true;
        }
    });

    const clearScoreButton = document.getElementById("clear");
    clearScoreButton.addEventListener("click", function(e) {
        emptyHighScore();
    });

    document.addEventListener("keydown", function (e) {
        if (e.shiftKey && e.key === "C" && e.target.tagName !== "INPUT" ) {
            toggleCheat(e);
        }
    });

});