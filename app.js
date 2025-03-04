// Mouse table function to avoid problems or name conflicts
const mousetable = Array.from(document.getElementsByClassName('box'));

// MouseOver & mouseOut for all spots
mousetable.forEach(box => {
    box.addEventListener('mouseover', myfunction1);
    box.addEventListener('touchstart', myfunction2);
});
//Set the background color on mouseover
function myfunction1() {
    if (!this.classList.contains('boxComputer')) { // Check if not occupied by computer
        this.style.backgroundColor = '#FFA000'; //set  boxHuman-color.
    }
}

//set background color on touch devices
function myfunction2() {
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundColor = '#FFA000'; // set boxHuman,-color on touch-devices,iPhone,some tabs e.g.
    }
}

mousetable.forEach(box => {
    box.addEventListener('mouseout', myfunction3);
    box.addEventListener('touchend', myfunction4); 
});
// Reset the background color on mouseout
function myfunction3 { 
    if (!this.classList.contains('boxComputer')) { // Check not occupied by player 'boxHuman',if not;
        this.style.backgroundColor = ''; // ...then reset to deafult color.
    }
}
//Same as function3 but touchend for touch devices.
function myfunction4() {
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundColor = ''; 
    }
}
 

 

//Game table to play on.
const table = Array.from(document.querySelectorAll('.box'));
let currenP = 'o'; // Player 'o' starts
let movesPlayed = []; // To track moves, to check for Draw.
const winnCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add Event listener to each box.
table.forEach(box => {
    box.addEventListener('click', myfunction);
});

// GAME START
function myfunction(e) {
    const boxArr = Array.from(document.getElementsByClassName('box'));
    const index = boxArr.indexOf(e.target);

    // If box is already clicked (occupied), ignore the click
    if (table[index].classList.contains('boxHuman') || table[index].classList.contains('boxComputer')) {
        return; // Ignore the click if the spot is taken
    }

    // Player 'o' move
    if (currenP === 'o') {
        table[index].classList.add('boxHuman'); // 'boxHuman'
        movesPlayed.push(index);
console.log( movesPlayed)
        // Check for winner
        if (checkWinner()) {
            setTimeout(() => {
                alert(currenP + " " + "wins! Restart?");
                restart();
            }, 100);
            return;
        }

        // Switch to the next player
        currenP = 'x';

        // Computer's move
        computerMove();
    }
console.log(movesPlayed)
}

// Function to handle computer's move
function computerMove() {
    const availableMoves = table
        .map((box, index) => (box.classList.contains('boxHuman') || box.classList.contains('boxComputer')) ? null : index)
        .filter(index => index !== null);

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    // Add class to the computer's move box
    table[move].classList.add('boxComputer');
    movesPlayed.push(move);

    // Check for winner
    if (checkWinner()) {
        setTimeout(() => {
            alert(currenP + " " + "wins! Restart?");
            restart();
        }, 100);
        return;
    }

    // Switch to the next player
    currenP = 'o';

    // If all moves are played, it's a draw
    if (movesPlayed.length === 9) {
        setTimeout(() => {
            alert("Draw! Restart?");
            restart();
        }, 100);
        return;
    }
}

// Function to check the winner
function checkWinner() {
    for (let combo of winnCombos) {
        const boxes = combo.map(index => table[index]);
        const classes = boxes.map(box => box.classList.value);
        if (classes.every(cls => cls === 'box boxHuman') || classes.every(cls => cls === 'box boxComputer')) {
            return true;
        }
    }
    return false;
}

// Restart the game
function restart() {
    window.location.reload(); // Reload to restart the game
}
