const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 100,
    y: 100,
    size: 30,
    speed: 5
};

const world = {
    width: 3000,
    height: 3000
};

let moveX = 0;
let moveY = 0;

const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

// Keyboard Controls
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Touch Controls
joystick.addEventListener("touchmove", (e) => {
    e.preventDefault();

    const touch = e.touches[0];
    const rect = joystick.getBoundingClientRect();

    let x = touch.clientX - rect.left;
    let y = touch.clientY - rect.top;

    x = Math.max(25, Math.min(95, x));
    y = Math.max(25, Math.min(95, y));

    stick.style.left = (x - 25) + "px";
    stick.style.top = (y - 25) + "px";

    moveX = (x - 60) / 35;
    moveY = (y - 60) / 35;
});

joystick.addEventListener("touchend", () => {
    stick.style.left = "35px";
    stick.style.top = "35px";

    moveX = 0;
    moveY = 0;
});

function update() {

    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;

    player.x += moveX * player.speed;
    player.y += moveY * player.speed;

    player.x = Math.max(0, Math.min(world.width - player.size, player.x));
    player.y = Math.max(0, Math.min(world.height - player.size, player.y));
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#5cb85c";
    ctx.fillRect(0, 0, world.width, world.height);

    // Grid
    ctx.strokeStyle = "#4aa34a";

    for (let x = 0; x < world.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, world.height);
        ctx.stroke();
    }

    for (let y = 0; y < world.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(world.width, y);
        ctx.stroke();
    }

    // Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
