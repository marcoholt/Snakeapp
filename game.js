// Game configuration
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state
let snake = [
    { x: 10, y: 10 }
];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop = null;

// DOM elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverOverlay = document.getElementById('gameOver');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const finalScoreElement = document.getElementById('finalScore');

// Control buttons
const upBtn = document.getElementById('upBtn');
const leftBtn = document.getElementById('leftBtn');
const downBtn = document.getElementById('downBtn');
const rightBtn = document.getElementById('rightBtn');

// Initialize
highScoreElement.textContent = highScore;
updateHighScore();

// Generate random food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Draw functions
function drawGame() {
    clearCanvas();
    drawSnake();
    drawFood();
}

function clearCanvas() {
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#667eea';
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head with gradient
            const gradient = ctx.createLinearGradient(
                segment.x * gridSize,
                segment.y * gridSize,
                segment.x * gridSize + gridSize,
                segment.y * gridSize + gridSize
            );
            gradient.addColorStop(0, '#764ba2');
            gradient.addColorStop(1, '#667eea');
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = '#667eea';
        }
        
        ctx.fillRect(
            segment.x * gridSize + 2,
            segment.y * gridSize + 2,
            gridSize - 4,
            gridSize - 4
        );
        
        // Add rounded corners effect
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            segment.x * gridSize + 2,
            segment.y * gridSize + 2,
            gridSize - 4,
            gridSize - 4
        );
    });
}

function drawFood() {
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
    
    // Add shine effect
    ctx.fillStyle = '#ff8787';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2 - 3,
        food.y * gridSize + gridSize / 2 - 3,
        4,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

// Game logic
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        updateHighScore();
        generateFood();
    } else {
        snake.pop();
    }
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverOverlay.classList.remove('hidden');
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameOverOverlay.classList.add('hidden');
}

// Input handling
function changeDirection(newDx, newDy) {
    // Prevent reversing into itself
    if (dx === -newDx && dy === -newDy && snake.length > 1) {
        return;
    }
    dx = newDx;
    dy = newDy;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            changeDirection(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            changeDirection(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            changeDirection(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            changeDirection(1, 0);
            break;
    }
});

// Mobile controls
upBtn.addEventListener('click', () => {
    if (gameRunning) changeDirection(0, -1);
});

downBtn.addEventListener('click', () => {
    if (gameRunning) changeDirection(0, 1);
});

leftBtn.addEventListener('click', () => {
    if (gameRunning) changeDirection(-1, 0);
});

rightBtn.addEventListener('click', () => {
    if (gameRunning) changeDirection(1, 0);
});

// Start game function
function startGame() {
    resetGame();
    gameRunning = true;
    startScreen.classList.add('hidden');
    
    // Start game loop
    gameLoop = setInterval(() => {
        moveSnake();
        drawGame();
    }, 150);
    
    drawGame();
}

// Button event listeners
startBtn.addEventListener('click', () => {
    startGame();
});

restartBtn.addEventListener('click', () => {
    startGame();
});

// Initialize food position
generateFood();
drawGame();

