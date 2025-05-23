const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Variables de puntuación
let scoreLeft = 0;
let scoreRight = 0;

// Configuración de la pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: 4
};

// Configuración de las paletas
const paddleWidth = 10, paddleHeight = 80;
const leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
const rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };

// Movimiento de las paletas
document.addEventListener("keydown", (e) => {
    if (e.key === "w") leftPaddle.dy = -5;
    if (e.key === "s") leftPaddle.dy = 5;
    if (e.key === "ArrowUp") rightPaddle.dy = -5;
    if (e.key === "ArrowDown") rightPaddle.dy = 5;
});

document.addEventListener("keyup", () => {
    leftPaddle.dy = 0;
    rightPaddle.dy = 0;
});

// Función para actualizar el juego
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    // Rebote en los bordes superior e inferior
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy *= -1;

    // Rebote en las paletas
    if (
        (ball.x - ball.radius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.dx *= -1;
    }

    // Puntuación cuando la pelota pasa el borde
    if (ball.x < 0) {
        scoreRight++;
        resetBall();
    } else if (ball.x > canvas.width) {
        scoreLeft++;
        resetBall();
    }
}

// Reiniciar posición de la pelota
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Función para dibujar el juego
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la pelota
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Dibujar las paletas
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

    // Dibujar el marcador
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Jugador Izquierdo: ${scoreLeft}`, 50, 30);
    ctx.fillText(`Jugador Derecho: ${scoreRight}`, canvas.width - 250, 30);
}

// Bucle del juego
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();