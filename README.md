# ColorGame
This project was done in teams of 2 for my 3rd semester Web Dev class as a Dawson Computer Science student. We were assigned the task to create a color game using HTML, CSS, and JS.
To see full commits and pushes made, visit https://gitlab.com/PrabhjotAulakh12345/web2-project/ .

This websites goal serves as a color guessing game. once the form submitted, the JS will set up a table with however many tiles you selected in the form. If 4 is selected, a 4x4 board will be generated, 5 will generate 5x5, and so forth. the minimum size is 3 and the maximum size is 7. Once this is generated, the program will take care of generating rgb values for each tile. Depending on the difficulty selected, the rgb values can have no range (0), can be within 80 of each other (1), can be within 40 of each other (2), or can be within 10 of each other (3). This range applies to all tiles, therefore every tile will be generated using the same RGB bandwidth (therefore difficulty 3 will cause the tiles to look nearly the same color). Once generated, it is your job to select which tiles you think have the predominant color you chose in the form. If red is selected, find all predominantly red tiles. Blue, predominantly blue. Green, predominantly green. Once you have taken your best guess, submit your results to calculate your score, and see the top 10 scores display on the leaderboard! Local storage was utilized in order to store the scoreboard into local storage and preserve it so long as you dont clear the scores!

## Getting Started

To use this project, simply download all necessary files and drag index.html into a new browser tab!


## Topics covered

This project includes many features which we learned this semester. It includes local storage, regex validation, HTML form validation, DOM manipulation, and a lot of array functions particular to JavaScript.



