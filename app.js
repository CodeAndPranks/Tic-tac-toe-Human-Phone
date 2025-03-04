const mousetable = Array.from(document.getElementsByClassName('box'));

// MouseOver & mouseOut for all spots
mousetable.forEach(box => {
    box.addEventListener('mouseover', myfunction1);
    box.addEventListener('mouseout', myfunction2); 
});

// Set the background image on mouseover
function myfunction1() {
    if (!this.classList.contains('boxComputer')) { // Check if not occupied by computer
        this.style.backgroundColor = '#FFA000'; // Set boxHuman color
        this.style.backgroundImage = "url('img/o.svg')"; // Set the image
        this.style.backgroundSize = 'cover'; // Optional: cover the entire box
        this.style.backgroundPosition = 'center'; // Optional: center the image
    }
}

// Function mouseout
function myfunction2() { 
    if (!this.classList.contains('boxComputer')) { 
        this.style.backgroundColor = ''; 
        this.style.backgroundImage = ''; 
    }
}

// Game table to play on.
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
        return; 
    }

    // Player 'o' move
    if (currenP === 'o') {
        table[index].classList.add('boxHuman'); 
        movesPlayed.push(index);

        // Check for winner
        if (checkWinner()) {
            setTimeout(() => {
                alert(currenP + " wins! Restart?");
                restart();
            }, 100);
            return;
        }
    }

    // Switch to the next player
    currenP = 'x';

    // Function to handle computer's move
    const availableMoves = table
        .map((box, index) => (box.classList.contains('boxHuman') || box.classList.contains('boxComputer')) ? null : index)
        .filter(index => index !== null);

    // Check if there are available moves before making a move
    if (availableMoves.length === 0) {
        alert("It's a draw! Restart?");
        restart();
        return; // Exit if it's a draw
    }

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
console.log('Human_index_=_'  + index + '_' +  '_Remove-Box__ ' + index + '_TotalMove_=_ ' +  movesPlayed.length + '_freeBoxes_=_ ' + availableMoves)
    // Add class to the computer's move box
    table[move].classList.add('boxComputer');
    movesPlayed.push(move);
console.log('PC_index_=_'  + index + '_' +  '_Remove-Box__ ' + index + '_TotalMove_=_ ' +  movesPlayed.length + '_freeBoxes_=_ ' + availableMoves)
    // Check for winner
    if (checkWinner()) {
        setTimeout(() => {
            alert(currenP + " wins! Restart?");
            restart();
        }, 100);
        return;
    }

    // Check for draw after the computer's move
    if (availableMoves.length === 1) { 
        alert("It's a draw! Restart?");
        restart();
        return;
    }

    // Switch to the next player
    currenP = currenP === 'o' ? 'x' : 'o';

    // If computer's turn  make computer move
    if (currenP === 'x') {
        setTimeout(computerMove, 300);  //  Simulate pc  thinking.
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
/*
// Restart game easy and safe way: 
function restart() {
    window.location.reload(); // Reload the page to restart game.
}
*/
// But it's a js challange so teacher like;
function restart() {
    movesPlayed = [];  // Reset the counter.  
    //Clean the table
    table.forEach(box => {
        box.classList.remove('boxHuman', 'boxComputer'); 
    });
}
