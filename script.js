//region init variables
function setCanvasSize(gameCanvas) {
    let width = Math.floor(window.innerWidth * 0.9);
    let height = Math.floor(window.innerHeight * 0.8);

    gameCanvas.width = width;
    gameCanvas.height = height;
}

//endregion

//region create entities
function createScore() {
    return {
        playerLeftScore: 0,
        playerRightScore: 0
    }
}

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

function createLeftRacket(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.2);
    let width = Math.floor(gameCanvas.width * 0.02);
    let x = 10;
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dy = Math.floor(height * 0.15);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dy: dy,
        color: "blue"
    }
}

function createRightRacket(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.2);
    let width = Math.floor(gameCanvas.width * 0.02);
    let x = gameCanvas.width - width - 10;
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dy = Math.floor(height * 0.15);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dy: dy,
        color: "red"
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

function drawRacket(gameCanvas, racket) {
    const canvasContext = gameCanvas.getContext("2d");

    canvasContext.beginPath();
    canvasContext.rect(racket.x, racket.y, racket.width, racket.height);
    canvasContext.fillStyle = racket.color;
    canvasContext.fill();
    canvasContext.closePath();
}

function drawScore(gameCanvas, score) {
    const canvasContext = gameCanvas.getContext("2d");

    canvasContext.beginPath();
    canvasContext.fillStyle = "#FACE8D";
    let fontSize = Math.floor(gameCanvas.height * 0.05);
    canvasContext.font = `italic ${fontSize}pt Arial`;

    let margitTop = Math.floor(gameCanvas.height * 0.1);
    let marginLeft = Math.floor(gameCanvas.width * 0.1);

    canvasContext.fillText(`Счёт игры ${score.playerLeftScore}:${score.playerRightScore}`, gameCanvas.width / 2 - marginLeft, margitTop);
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

function moveRacket(gameCanvas, key, keyUP, keyDOWN, racket) {
    if (key === keyUP && racket.y > 0) {
        racket.y -= racket.dy;
        if (racket.y < 0) {
            racket.y = 0;
        }
    } else if (key === keyDOWN && racket.y + racket.height < gameCanvas.height) {
        racket.y += racket.dy;
        if (racket.y + racket.height > gameCanvas.height) {
            racket.y = gameCanvas.height - racket.height;
        }
    }
}

function ballCollisionWithLeftRacket(ball, leftRacket) {

}

function ballCollisionWithRightRacket(ball, rightRacket) {

}

function ballCollisionWithLeftWall(gameCanvas, ball, score) {

}

function ballCollisionWithRightWall(gameCanvas, ball, score) {

}


function gameLoop(gameCanvas, ball, leftRacket, rightRacket, score) {
    clearGameCanvas(gameCanvas);

    moveBall(gameCanvas, ball);

    ballCollisionWithLeftRacket(ball, leftRacket);
    ballCollisionWithRightRacket(ball, rightRacket);

    ballCollisionWithLeftWall(gameCanvas, ball, score);
    ballCollisionWithRightWall(gameCanvas, ball, score);

    drawBall(gameCanvas, ball);

    drawRacket(gameCanvas, leftRacket);
    drawRacket(gameCanvas, rightRacket);

    drawScore(gameCanvas, score);

    requestAnimationFrame(function () {
        gameLoop(gameCanvas, ball, leftRacket, rightRacket, score);
    });
}

//endregion

//region set variables
const gameCanvas = document.getElementById("gameCanvas");
setCanvasSize(gameCanvas);

const ball = createBall(gameCanvas);
const leftRacket = createLeftRacket(gameCanvas);
const rightRacket = createRightRacket(gameCanvas);
const score = createScore();

document.addEventListener("keydown", function (e) {
    if (e.code === "KeyW" || e.code === "KeyS") {
        moveRacket(gameCanvas, e.code, "KeyW", "KeyS", leftRacket);
    } else if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        moveRacket(gameCanvas, e.code, "ArrowUp", "ArrowDown", rightRacket);
    }
});

gameLoop(gameCanvas, ball, leftRacket, rightRacket, score);
//endregion
