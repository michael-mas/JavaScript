//Initialisation du canvas et définition du context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajout de la bordure au canvas
canvas.style.border = '1px solid #6198d8';
ctx.lineWidth = 1;

//Constantes nécessaires
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 20;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 5;
const SCORE_UNIT = 10;
const MAX_LEVEL = 3;


//Variables nécessaires
let life = 3;
let score = 0;
let level = 1;
let gameOver = false;
let leftArrow = false;
let rightArrow = false;
let isPaused = false;

//PROPRIETES DE LA PLANCHE
const paddle = {
    x: (canvas.width / 2) - (PADDLE_WIDTH /2),
    y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    dx: 8
}

//Déssiner la planche
function drawPaddle() {
    ctx.beginPath();

    ctx.fillStyle = '#eae1ff';
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.strokeStyle = '#6198d8';
    ctx.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);

    ctx.closePath();
}

//Mise en place des touches de control de la planche
document.addEventListener('keydown', (e) => {
   if (e.key === 'Left' || e.key === 'ArrowLeft') { leftArrow = true;}
   else if (e.key === 'Right' || e.key === 'ArrowRight') { rightArrow = true;}
});
document.addEventListener('keyup', (e) => {
   if (e.key === 'Left' || e.key === 'ArrowLeft') { leftArrow = false;}
   else if (e.key === 'Right' || e.key === 'ArrowRight') { rightArrow = false;}
});

//Animation - déplacement de la planche
function movePaddle() {
    if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    } else if (rightArrow && paddle.x + paddle.w < canvas.width) {
        paddle.x += paddle.dx;
    }
}

function resetPaddle() {
    paddle.x = canvas.width / 2 - PADDLE_WIDTH / 2;
    paddle.y = canvas.height - (PADDLE_MARGIN_BOTTOM + PADDLE_HEIGHT);
}

//PROPRIETES DE LA BALLE
const ball = {
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    velocity: 7,
    dx: 3 * (Math.random() * 2 - 1),
    dy: -3
}

//Déssiner la balle
function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.strokeStyle = '#6198d8';
    ctx.stroke();

    ctx.closePath();
}

//Mouvement de la balle
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Interaction ball - mur
function bwCollision() {
    //Collision sur l'axe des x;
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        WALL_HIT.play();
        ball.dx *= -1;
    }

    //Collision sur la partie supérieure
    if (ball.y - ball.radius < 0) {
        WALL_HIT.play();
        ball.dy *= -1;
    }

    //Collision sur le bord inférieur (Cette collision entraine la perte d'une vie)
    if (ball.y + ball.radius > canvas.height) {
        LIFE_LOST.play();
        life--;
        resetBall();
        resetPaddle();
    }
}

//Reinitialisation de la balle en cas de perte d'une vie
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

//Collision balle - planche
function bpCollision() {
    if (ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.w &&
        ball.y + ball.radius > paddle.y) {

        PADDLE_HIT.play();

        //On crée un point de collision
        let collidePoint = ball.x - (paddle.x + paddle.w/2);

        //On normalise le point de collision de facon à n'avoir qu'un repère trgonométrique
        collidePoint = collidePoint / (paddle.w/2);

        //On défini un angle de tir a rebond de la balle sur la planche
        let angle = collidePoint * Math.PI/3;

        ball.dx = ball.velocity * Math.sin(angle);
        ball.dy = -ball.velocity * Math.cos(angle);
    }
}

//PROPRIETES DES BRIQUES
const brickProp = {
    row: 3,
    column: 12,
    w: 50,
    h: 15,
    padding: 3,
    offsetX: 55,
    offsetY: 40,
    fillColor: '#6198d8',
    visible: true,
}

//Création des briques
let bricks = [];
function createBricks() {
    for (let r = 0; r < brickProp.row; r++) {
        bricks[r] = [];
        for (let c= 0; c < brickProp.column; c++) {
            bricks[r][c] = {
                x: c * (brickProp.w + brickProp.padding) + brickProp.offsetX,
                y: r * (brickProp.h + brickProp.padding) + brickProp.offsetY,
                status: true,
                ...brickProp,
            }
        }
    }
}
createBricks();

//Dessiner les briques
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.status) {
                ctx.beginPath();

                ctx.rect(brick.x, brick.y, brick.w, brick.h);
                ctx.fillStyle = brick.fillColor;
                ctx.fill();

                ctx.closePath();
            }
        })
    })
}

//Collision balle - briques
function bbCollision() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.status) {
                if (ball.x + ball.radius > brick.x &&
                    ball.x - ball.radius < brick.x + brick.w &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brick.h
                ) {

                    BRICK_HIT.play().then(r => null);

                    ball.dy *= -1;
                    brick.status = false;
                    score += SCORE_UNIT;
                }
            }
        })
    })
}

//Afficher les statistiques du jeu
function showStats(img, iPosX, iPosY, text = '', tPosX = null, tPosY = null) {
    ctx.fillStyle = '#fff';
    ctx.font = '20px gruppo';
    ctx.fillText(text, tPosX, tPosY);
    ctx.drawImage(img, iPosX, iPosY, width = 20, height = 20);
}

//Fin de la partie
function gameover () {
    if (life <= 0) {
        showEndInfo('lose');
        gameOver = true;
    }
}

//Aller au niveau suivant
function nextLevel () {
    let isLevelUp = true;

    for (let r = 0; r < brickProp.row; r++) {
        for (let c = 0; c < brickProp.column; c++) {
            isLevelUp = isLevelUp && !bricks[r][c].status;
        }
    }

    if (isLevelUp) {
        WIN.play();

        if (level >= MAX_LEVEL) {
            showEndInfo();
            gameOver = true;
            return;
        }
        brickProp.row += 2;
        createBricks();
        ball.velocity += .5;
        resetBall();
        resetPaddle();
        level++;
    }
}

//Relatif à tous les dessins du jeu
function draw() {
    drawPaddle();
    drawBall();
    drawBricks();
    showStats(SCORE_IMG, canvas.width - 100, 5, score, canvas.width - 65, 22);
    showStats(LIFE_IMG, 35, 5, life, 70, 22);
    showStats(LEVEL_IMG,(canvas.width / 2) - 25, 5, level, (canvas.width / 2), 22);
}

//Mettre à jour toutes les actions du jeu durant son cours.
function update() {
    movePaddle();
    moveBall();
    bwCollision();
    bpCollision();
    bbCollision();
    gameover();
    nextLevel();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isPaused) {
        draw();

        update();
    }

    if(!gameOver) {
        requestAnimationFrame(loop);
    }
}
loop();

//GESTION DES EVENEMENTS AUDIO
const sound = document.getElementById('sound');
sound.addEventListener('click', audioManager);

function audioManager() {
    //Changer l'image
    let imgSrc = sound.getAttribute('src');
    let SOUND_IMG = imgSrc === 'img/sound_on.png' ? 'img/mute.png' : 'img/sound_on.png';
    sound.setAttribute('src', SOUND_IMG);

    //Modification des sons en fonction des etats
    WALL_HIT.muted = !WALL_HIT.muted;
    PADDLE_HIT.muted = !PADDLE_HIT.muted;
    BRICK_HIT.muted = !BRICK_HIT.muted;
    WIN.muted = !WIN.muted;
    LIFE_LOST.muted = !LIFE_LOST.muted;
}

//GESTION DU DOM POUR L'AFFICHAGE DES ERREURS
//Importation des éléments du DOM
const rules = document.getElementById('rules');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const game_over = document.getElementById('game-over');
const youWin = game_over.querySelector('#you-won');
const youLose = game_over.querySelector('#you-lose');
const restart = game_over.querySelector('#restart');

//Affichage des règles du jeu
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
    isPaused = true;
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
    isPaused = false;
});


//Affichage des info de fin de parties (Victoire ou echec)
function showEndInfo(type = 'win') {
    game_over.style.visibility = 'visible';
    game_over.style.opacity = '1';
    if (type === 'win') {
        youWin.style.visibility = 'visible';
        youLose.style.visibility = 'hidden';
        youLose.style.opacity = '0';
    } else {
        youWin.style.visibility = 'hidden';
        youWin.style.opacity = '0';
        youLose.style.visibility = 'visible';
    }
}

//Relancer le jeu
restart.addEventListener('click', () => {location.reload();});