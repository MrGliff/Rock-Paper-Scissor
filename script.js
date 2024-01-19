let result = '';
let compMove = '';

const score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    loss: 0,
    tie: 0
};

function updateScore() {
    document.querySelector('.score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Tie: ${score.tie}`;
};
updateScore();

function computerMove() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber == 0) {
        compMove = 'rock';
    }

    else if (randomNumber == 1) {
        compMove = 'paper';
    }
    else {
        compMove = 'scissor';
    }
    return compMove;
}

function reset() {
    score.win = 0;
    score.loss = 0;
    score.tie = 0;
    document.querySelector('.result').innerHTML = null;
    document.querySelector('.move').innerHTML = null;
    updateScore();
}

let isAutoPlay = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlay) {
        intervalID = setInterval(function () {
            const playerMove = computerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlay = true;
        document.querySelector('.autoValue').innerHTML = ` On`;
    }
    else {
        clearInterval(intervalID);
        isAutoPlay = false;
        document.querySelector('.autoValue').innerHTML = `  Off`;
    }
}

function playGame(playerMove) {
    let compMove = computerMove();
    if (playerMove === 'rock') {

        if (compMove == 'rock') {
            result = "Tie.";
        }
        else if (compMove == 'paper') {
            result = "You Lose.";
        }
        else {
            result = "You Win."
        }
    }
    else if (playerMove === 'paper') {

        if (compMove == 'rock') {
            result = "You Win.";
        }
        else if (compMove == 'paper') {
            result = "Tie."
        }
        else {
            result = "You Lose."
        }
    }
    else {

        if (compMove == 'rock') {
            result = "You Lose.";
        }
        else if (compMove == 'paper') {
            result = "You Win."
        }
        else {
            result = "Tie."
        }
    }

    if (result === "You Win.") {
        score.win++;
    }
    else if (result === "You Lose.") {
        score.loss++;
    }
    else {
        score.tie++;
    }


    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.result').innerHTML = result;
    document.querySelector('.move').innerHTML = `You
    <img src="assets/${playerMove}.png" alt="rock" class="moveIcon">
    <img src="assets/${compMove}.png" alt="rock" class="moveIcon">
    Computer`;
    updateScore();
}

document.querySelector(".rock").addEventListener('click', () => { playGame('rock') })

document.querySelector('.paper').addEventListener('click', () => { playGame('paper') })

document.querySelector('.scissor').addEventListener('click', () => { playGame('scissor') })

document.querySelector('.reset').addEventListener('click', () => { reset() });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R')
        playGame('rock');
    else if (event.key === 'p' || event.key === 'P')
        playGame('paper');
    else if (event.key === 's' || event.key === 'S')
        playGame('scissor')
})