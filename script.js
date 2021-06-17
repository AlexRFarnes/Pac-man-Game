const gridEl = document.querySelector('.grid');
const scoreEl = document.querySelector('#score');
const width = 28; //28 squares wide
let squares = [];
let score = 0;
let resetBtn = document.getElementById('resetGame');
let endGameEl = document.getElementById('endGame');

//  28 x 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

function createBoard() {
  squares = [];
  gridEl.innerHTML = '';
  layout.forEach(square => {
    const squareEl = document.createElement('div');

    if (square === 0) {
      squareEl.classList.add('pac-dot');
    } else if (square === 1) {
      squareEl.classList.add('wall');
    } else if (square === 2) {
      squareEl.classList.add('ghost-lair');
    } else if (square === 3) {
      squareEl.classList.add('power-pellet');
    }

    squares.push(squareEl);

    gridEl.append(squareEl);
  });
}

function control({ key }) {
  squares[pacmanCurrentIndex].classList.remove('pacman');
  if (key === 'ArrowLeft') {
    if (
      pacmanCurrentIndex % 28 !== 0 &&
      !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
      !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
    ) {
      pacmanCurrentIndex--;
    }
    if (pacmanCurrentIndex === 364) pacmanCurrentIndex = 391;
  }
  if (key === 'ArrowRight') {
    if (
      pacmanCurrentIndex % 28 < width - 1 &&
      !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
      !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
    ) {
      pacmanCurrentIndex++;
    }
    if (pacmanCurrentIndex === 391) pacmanCurrentIndex = 364;
  } else if (
    key === 'ArrowUp' &&
    pacmanCurrentIndex - width >= 0 &&
    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
  ) {
    pacmanCurrentIndex -= width;
  } else if (
    key === 'ArrowDown' &&
    pacmanCurrentIndex + width < width * width &&
    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
  ) {
    pacmanCurrentIndex += width;
  }
  squares[pacmanCurrentIndex].classList.add('pacman');
  pacDotEaten();
  powerPelletEaten();
  checkForWin();
}

function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot');
    score++;
    scoreEl.textContent = score;
  }
}

function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet');
    score += 10;
    scoreEl.textContent = score;
    ghosts.forEach(ghost => (ghost.isScared = true));

    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach(ghost => (ghost.isScared = false));
}

function moveGhost(ghost) {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  ghost.timerId = setInterval(function () {
    if (
      squares[ghost.currentIndex + direction].classList.contains('wall') ||
      squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
      direction = directions[Math.floor(Math.random() * directions.length)];
    } else {
      squares[ghost.currentIndex].classList.remove(
        ghost.ghostClass,
        ghost.classname,
        'scared'
      );
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(
        ghost.ghostClass,
        ghost.classname
      );
    }

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared');
    }

    if (
      ghost.isScared &&
      squares[pacmanCurrentIndex].classList.contains('ghost')
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.ghostClass,
        ghost.classname,
        'scared'
      );
      score += 100;
      scoreEl.textContent = score;
      ghost.currentIndex = ghost.startIndex;
      squares[ghost.currentIndex].classList.add(
        ghost.ghostClass,
        ghost.classname
      );
    }
    checkForGameOver();
  }, ghost.speed);
}

// Check for game over
function checkForGameOver() {
  if (
    squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared')
  ) {
    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId);
    });
    document.removeEventListener('keyup', control);
    scoreEl.textContent = 'You LOSE';
    endGameEl.style.display = 'flex';
  }
}

function resetGame() {
  endGameEl.style.display = 'none';
  score = 0;
  scoreEl.textContent = score;
  createBoard();
  pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add('pacman');

  ghosts.forEach(ghost => {
    ghost.isScared = false;
    squares[ghost.startIndex].classList.add(ghost.ghostClass, ghost.classname);
    ghost.currentIndex = ghost.startIndex;
  });
  ghosts.forEach(moveGhost);
  document.addEventListener('keydown', control);
}

function checkForWin() {
  if (score >= 300) {
    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId);
    });
    document.removeEventListener('keydown', control);
    scoreEl.textContent = 'You WON!!!!';
    endGameEl.style.display = 'flex';
  }
}

createBoard();

// Starting position of pac-man
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

// Create the Ghost class
class Ghost {
  constructor(classname, startIndex, speed) {
    this.ghostClass = 'ghost';
    this.classname = classname;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

// Instantiate the 4 ghosts in the ghosts array
const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
];

ghosts.forEach(ghost => {
  squares[ghost.startIndex].classList.add(ghost.ghostClass, ghost.classname);
});

ghosts.forEach(moveGhost);

document.addEventListener('keydown', control);

resetBtn.addEventListener('click', resetGame);
