"use strict";

/**
 * Toggles the notCheating class every time a user presses shift+C
 */
function toggleCheat() {
  document.querySelectorAll(".tile").forEach(tile => tile.classList.toggle("notCheating"));
}

/**
 * Determines which color is predominant in the tile given
 * @param {HTMLDivElement} tile - A single tile
 * @returns - String of the highest RGB value
 */
function highestRGBValue(tile) {
  const COLORS = ["red", "green", "blue"];
  const rgbs = transformStringRgbToIntegerRgb(tile);
  const max = rgbs.reduce((max, cur) => Math.max(max, cur));
  const index = rgbs.indexOf(max);
  return COLORS[index];
}

/**
 * Creates the p elements, adds the notCheating class to each tile and appends them into the divs
 */
function addCheats() {
  Array.from(document.getElementsByClassName("tile"))
  .forEach(el => {
    const rgb = document.createElement("p");
    const colorName = document.createElement("p");
    const highest = highestRGBValue(el);
    rgb.textContent = `${el.style.backgroundColor}`;
    colorName.textContent = `color: ${highest}`;
    el.classList.add("notCheating");
    el.appendChild(rgb);
    el.appendChild(colorName);
  });
}