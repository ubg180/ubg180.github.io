const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";
let gameInterval;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

function createGrid() {
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

function drawSnake() {
    gameBoard.innerHTML = "";
    snake.forEach(segment => {
        const snakeSegment = document.createElement("div");
        snakeSegment.className = "cell snake";
        snakeSegment.style.gridColumn = segment.x;
        snakeSegment.style.gridRow = segment.y;
        gameBoard.appendChild(snakeSegment);
    });
}

function drawFood() {
    const foodElement = document.createElement("div");
    foodElement.className = "cell food";
    foodElement.style.gridColumn = food.x;
    foodElement.style.gridRow = food.y;
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = Object.assign({}, snake[0]);
    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);
        }
        scoreElement.textContent = `Score: ${score} Highscore: ${highscore}`;
        food = {
            x: Math.floor(Math.random() * gridSize) + 1,
            y: Math.floor(Math.random() * gridSize) + 1
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (
        head.x < 1 ||
        head.x > gridSize ||
        head.y < 1 ||
        head.y > gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over!");
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);
        }
		const online = navigator.onLine;
    if (online) {
        const confirmResponse = confirm("Sie sind wieder online. Möchten Sie auf die Hauptseite weitergeleitet werden?");
        if (confirmResponse) {
            window.location.href = "index.html";
        }
    }
        resetGame();
      
    }
}

function resetGame() {
    snake = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    direction = "right";
    score = 0;
    scoreElement.textContent = `Score: ${score} Highscore: ${highscore}`;
    startButton.disabled = false;
}

function updateGame() {
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

function startGame() {
    createGrid();
    drawSnake();
    drawFood();
    gameInterval = setInterval(updateGame, 200);
    startButton.disabled = true;
}

startButton.addEventListener("click", () => {
    startGame();
});

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

function checkOnlineStatus() {
    const online = navigator.onLine;
    if (online) {
        const confirmResponse = confirm("Sie sind wieder online. Möchten Sie auf die Hauptseite weitergeleitet werden?");
        if (confirmResponse) {
            window.location.href = "index.html";
        }
    }
}
