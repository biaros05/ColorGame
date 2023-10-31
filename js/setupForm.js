"use strict";

/**
 * Disables all the input fields/buttons of the form and enables the guess button once the user has submitted the proper inputs
 * @param {HTMLFormElement} form - Form to be disabled
 */
function disableForm(form) {
    Array.from(form.elements).forEach(el => el.disabled = true);
    toggleGuessButton();
}

/**
 * Enables all the input fields/buttons of the form so that the user can play another turn
 */
function enableForm() {
    Array.from([...document.forms[0].elements]).forEach(el => {
        el.disabled = false;
        el.value = null;
    });
    toggleGuessButton();
}

/**
 * Toggles the guess button to be disabled or enabled
 */
function toggleGuessButton() {
    const guessButton = document.getElementById("guess-button");
    guessButton.disabled = guessButton.disabled ? false : true;
}