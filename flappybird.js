var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreShow = document.getElementById('score');
var messageShow = document.getElementById('message');

var birdImg = new Image();
var backgroundImg = new Image();
var pipeTopImg = new Image();
var pipeBottomImg = new Image();
birdImg.src = "bird.png";
backgroundImg.src = "nenchinh.png";
pipeTopImg.src = "ongtren.png";
pipeBottomImg.src = "ongduoi.png";

var score = 0;
var pipeGap = 140;
var pipeDistance;
var isGameOver = false;

var bird = {
    x: backgroundImg.width / 5,
    y: backgroundImg.height / 2,
    velocity: 0,
    gravity: 0.3,
    jump: 7
};

var pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0
};

function resetGame() {
    score = 0;
    scoreShow.innerHTML = "Score: " + score;
    messageShow.innerHTML = "";
    pipes = [];
    pipes[0] = {
        x: canvas.width,
        y: 0
    };
    bird.y = backgroundImg.height / 2;
    bird.velocity = 0;
    isGameOver = false;
    draw();
}

function draw() {
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(birdImg, bird.x, bird.y);

    for (var i = 0; i < pipes.length; i++) {
        pipeDistance = pipeTopImg.height + pipeGap;
        context.drawImage(pipeTopImg, pipes[i].x, pipes[i].y);
        context.drawImage(pipeBottomImg, pipes[i].x, pipes[i].y + pipeDistance);

        pipes[i].x -= 5;

        if (pipes[i].x == canvas.width / 2) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeTopImg.height) - pipeTopImg.height
            });
        }
        if (pipes[i].x == 0) pipes.splice(0, 1);

        if (pipes[i].x == bird.x) {
            score++;
            messageShow.innerHTML = "";
        }

        if (bird.y + birdImg.height == canvas.height ||
            (bird.x + birdImg.width >= pipes[i].x && bird.x <= pipes[i].x + pipeTopImg.width) &&
            (bird.y <= pipes[i].y + pipeTopImg.height || bird.y + birdImg.height >= pipes[i].y + pipeDistance)
        ) {
            if (!isGameOver) {
                messageShow.innerHTML = "Bạn đã thất bại. Hãy reset trang hoặc nhấn vào màn hình để thử lại.";
                isGameOver = true;
            }
            return;
        }
    }

    scoreShow.innerHTML = "Score: " + score;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (!isGameOver) {
        requestAnimationFrame(draw);
    }
}

document.addEventListener("mousedown", function () {
    bird.velocity = -bird.jump;
    if (isGameOver) {
        resetGame();
    }
});

resetGame();
