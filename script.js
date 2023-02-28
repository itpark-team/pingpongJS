//region init variables
function setCanvasSize(gameCanvas) {
    let width = Math.floor(window.innerWidth * 0.9);
    let height = Math.floor(window.innerHeight * 0.8);

    gameCanvas.width = width;
    gameCanvas.height = height;
}

//endregion

//region create entities
function createBall(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.05);
    let width = height;
    let x = Math.floor(gameCanvas.width / 2 - width / 2);
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dx = Math.floor(width * 0.2);
    let dy = Math.floor(height * 0.2);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        color: "burlywood"
    }
}

//endregion

//region game logic
function clearGameCanvas(gameCanvas) {
    const canvasContext = gameCanvas.getContext("2d");

    canvasContext.beginPath();
    canvasContext.rect(0, 0, gameCanvas.width, gameCanvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fill();
    canvasContext.closePath();
}

function drawBall(gameCanvas, ball) {
    const canvasContext = gameCanvas.getContext("2d");

    canvasContext.beginPath();
    canvasContext.rect(ball.x, ball.y, ball.width, ball.height);
    canvasContext.fillStyle = ball.color;
    canvasContext.fill();
    canvasContext.closePath();
}


function moveBall(gameCanvas, ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.height >= gameCanvas.height || ball.y <= 0) {
        ball.dy = -ball.dy;
    }

    if (ball.x + ball.width >= gameCanvas.width || ball.x <= 0) {
        ball.dx = -ball.dx;
    }
}

function gameLoop(gameCanvas, ball) {
    clearGameCanvas(gameCanvas);

    moveBall(gameCanvas, ball);
    drawBall(gameCanvas, ball);

    requestAnimationFrame(function () {
        gameLoop(gameCanvas, ball);
    });
}

//endregion

//region set variables
const gameCanvas = document.getElementById("gameCanvas");
setCanvasSize(gameCanvas);

const ball = createBall(gameCanvas);

gameLoop(gameCanvas, ball);
//endregion
