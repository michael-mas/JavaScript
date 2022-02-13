
//*************_  initier parametre canva/ clavier et souris   _****************//


const canvas = document.getElementById('breakout');
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler)



//*************_  initier environnement du jeu   _****************//

let game = {    
    requestId: null,
    timeoutId: null,
    leftKey: false,
    rightKey: false,
    on: false,
    music: true,
    sfx: true
}

//*************_  initier la raquette   _****************//

let paddle = {
    height: 20,
    width: 100,
    get y() { return canvas.height - this.height; }
}

//*************_  initier balle   _****************//


let ball = {
    radius: 10
};

//*************_  initier briques   _****************//


let brick = {
    rows: 5,
    cols: 10,
    get width() { return canvas.width / this.cols; },
    height: 30
}

//*************_  initier image   _****************//


let images = {
    background: new Image(),
    ball: new Image(),
    paddle: new Image()
}

//*************_  fonctions au moment l'initalisation du jeu Start   _****************//


function onImageLoad(e) {
    resetGame();
    initBricks();
    resetPaddle();
    paint();
    ctx.font = '45px Short Stack';
    ctx.fillStyle = 'grey';
    ctx.fillText('PRESS START', canvas.width / 2 - 140, canvas.height / 2);
};

//*************_  chargement image   _****************//

images.background.addEventListener('load', onImageLoad);
images.background.src = './images/Background.jpg';
images.ball.src = './images/ball.png';
images.paddle.src = './images/paddle.png';


//*************_  mise en place constante pour charger le son   _****************//


const sounds = {
    ballLost: new Audio('./sounds/ball-lost.mp3'),
    breakout: new Audio('./sounds/breakout.mp3'),
    brick: new Audio('./sounds/brick.mp3'),
    gameOver: new Audio('./sounds/game-over.mp3'),
    levelCompleted: new Audio('./sounds/level-completed.mp3'),
    music: new Audio('./sounds/music.mp3'),
    paddle: new Audio('./sounds/paddle.mp3')
}




let brickField = [];

function play() {   // Commence boucle
    cancelAnimationFrame(game.requestId);
    clearTimeout(game.timeoutId);
    game.on = true;

    resetGame();
    resetBall();
    resetPaddle();
    initBricks();

    game.sfx && sounds.breakout.play();

 //*************_  Boucle de la musique et sons  _****************// 

    setTimeout(() => game.music && sounds.music.play(), 2000);

    animate();
}


 //*************_  fonctions parametre joueur de base  _****************// 


function resetGame() {
    game.speed = 7;
    game.score = 0;
    game.level = 1;
    game.lives = 3;
    game.time = { start: performance.now(), elapsed: 0, refreshRate: 16  };
}


 //*************_  Activation du son  _****************// 


function initSounds() {
    sounds.music.loop = true;
    for (const [key] of Object.entries(sounds)) {
        sounds[key].volume = 0.5;
    }
}


 //*************_  Axe balle  _****************// 

 
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - paddle.height - 2 * ball.radius;
    ball.dx = game.speed * (Math.random() * 2 - 1);  // vitesse aleatoire *voir méthode Math.random()
    ball.dy = -game.speed; // Monté balle
}


//*************_  Axe raquette _****************// 


function resetPaddle() {
    paddle.x = (canvas.width - paddle.width) / 2;
    paddle.dx = game.speed + 7;
}

//*************_  Définir les briques  _****************// 


function initBricks() {
    brickField = [];
    const topMargin = 30;
    const colors = ['#330303ee', '#0f2742cc', '#0f2742cc', '#0f2742cc', '#0f2742cc']; //Couleurs
    for(let row = 0; row < brick.rows; row++) {
        for(let col = 0; col < brick.cols; col++) {
           //La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
            brickField.push({                      
                x: col * brick.width,
                y: row * brick.height + topMargin,
                height: brick.height,
                width: brick.width,
                color: colors[row],
                points: (5 - row) * 2, //selection
                hitsLeft: row === 0 ? 2 : 1  //resistance
            });
        }
    }
}


// cadre à animer (paint frame)

function animate(now = 0) { 
    game.time.elapsed = now - game.time.start;
    if (game.time.elapsed > game.time.refreshRate) {
        game.time.start = now;

        paint();
        update();
        detectCollision();
        detectBrickCollision();
    
        if (isLevelCompleted() || isGameOver()) return;
    }    

    game.requestId = requestAnimationFrame(animate);
}


//*************_  Pour dessiner les images  _****************// 


function paint() {
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);  // dessine l'arrière-plan 
    ctx.drawImage(images.ball, ball.x, ball.y, 2 * ball.radius, 2 * ball.radius); // dessine la balle
    ctx.drawImage(images.paddle, paddle.x, paddle.y, paddle.width, paddle.height);
    drawBricks();
    drawScore();
    drawLives();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (game.rightKey) {
        paddle.x += paddle.dx;
        if (paddle.x + paddle.width > canvas.width){
            paddle.x = canvas.width - paddle.width;
        }
    }
    if (game.leftKey) {
        paddle.x -= paddle.dx;
        if (paddle.x < 0){
            paddle.x = 0;
        }
    }
}

function drawBricks() {
    brickField.forEach((brick) => {
      if (brick.hitsLeft) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
  }

function drawScore() {
    ctx.font = '24px Short Stack';
    ctx. fillStyle = 'white';
    const { level, score } = game;
    ctx.fillText(`Level: ${level}`, 5, 23);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, 23);
}

// dessine les vies

function drawLives() {
    if (game.lives > 2) { ctx.drawImage(images.paddle, canvas.width - 150, 9, 40, 13); }
    if (game.lives > 1) { ctx.drawImage(images.paddle, canvas.width - 100, 9, 40, 13); }
    if (game.lives > 0) { ctx.drawImage(images.paddle, canvas.width - 50, 9, 40, 13); }
}

function detectCollision() {
    const hitTop = () => ball.y < 0;
    const hitLeftWall = () => ball.x < 0;
    const hitRightWall = () => ball.x + ball.radius * 2 > canvas.width;
    const hitPaddle = () => 
        ball.y + 2 * ball.radius > canvas.height - paddle.height &&
        ball.y + ball.radius < canvas.height && 
        ball.x + ball.radius > paddle.x &&
        ball.x + ball.radius < paddle.x + paddle.width;

    if (hitLeftWall()) {
        ball.dx = -ball.dx;
        ball.x = 0;
    }        
    if (hitRightWall()) {
        ball.dx = -ball.dx;
        ball.x = canvas.width - 2 * ball.radius;
    }
    if (hitTop()) {
        ball.dy = -ball.dy;
        ball.y = 0;
    }
    if (hitPaddle()) {
        ball.dy = -ball.dy;
        ball.y = canvas.height - paddle.height - 2 * ball.radius;
        game.sfx && sounds.paddle.play();
        // TODO change cette logique pour les angles avec sin/cos.
        // Changer x en fonction de l'endroit où la balle rebondit sur la raquette.
        // Le fait de faire rebondir la balle plus d'un côté entraîne la balle un peu plus de ce côté.
        const drawingConst = 5
        const paddleMiddle = 2;
        const algo = (((ball.x - paddle.x) / paddle.width) * drawingConst);
        ball.dx = ball.dx + algo - paddleMiddle;
    }
}


//*************_  Detecter la colision des briques   _****************// 


function detectBrickCollision() {
    let directionChanged = false;
    const isBallInsideBrick = (brick) => 
        ball.x + 2 * ball.radius > brick.x &&
        ball.x < brick.x + brick.width && 
        ball.y + 2 * ball.radius > brick.y && 
        ball.y < brick.y + brick.height;
  
    brickField.forEach((brick) => {
        if (brick.hitsLeft && isBallInsideBrick(brick)) {
            sounds.brick.currentTime = 0;
            game.sfx && sounds.brick.play();
            brick.hitsLeft--;
            if (brick.hitsLeft === 1) {
                brick.color = 'darkgray';
            }
            game.score += brick.points;
    
            if (!directionChanged) {
                directionChanged = true;
                detectCollisionDirection(brick);
            }
        }
    });
}

function detectCollisionDirection(brick) {
    const hitFromLeft = () => ball.x + 2 * ball.radius - ball.dx <= brick.x;
    const hitFromRight = () => ball.x - ball.dx >= brick.x + brick.width;

    if (hitFromLeft() || hitFromRight()) {
      ball.dx = -ball.dx;
    } else {     // Frapper par le haut ou par le bas
      ball.dy = -ball.dy;
    }
}


//*************_  Controle clavier son   _****************// 



function keyDownHandler(e) {
    if (!game.on && e.key === ' ') {
        play();
    }
    if (game.on && (e.key === 'm' || e.key === 'M')) {
        game.music = !game.music;
        game.music ? sounds.music.play() : sounds.music.pause();
    }
    if (game.on && (e.key === 's' || e.key === 'S')) {
        game.sfx = !game.sfx;
    }
    if (e.key === 'ArrowUp') {
        volumeUp();
    }
    if (e.key === 'ArrowDown') {
        volumeDown();
    }
    if (e.key === 'ArrowRight') {
        game.rightKey = true;
    } else if (e.key === 'ArrowLeft') {
        game.leftKey = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        game.rightKey = false;
    } else if (e.key === 'ArrowLeft') {
        game.leftKey = false;
    }
}


//*************_  Mouvement souris   _****************// 


function mouseMoveHandler(e) {
    const mouseX = e.clientX - canvas.offsetLeft;    
    const isInsideCourt = () => mouseX > 0 && mouseX < canvas.width;

    if(isInsideCourt()) {
        paddle.x = mouseX - paddle.width / 2;
    }
}


//vérifier si le niveau est fini et conditions

function isLevelCompleted() {
    const levelComplete = brickField.every((b) => b.hitsLeft === 0);  
//La méthode every() permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument. 
//Cette méthode renvoie un booléen pour le résultat du test.

    if (levelComplete) {
        initNextLevel();
        resetBall();
        resetPaddle();
        initBricks();
        game.timeoutId = setTimeout(() => {
            animate();
            sounds.music.play();
        }, 3000);

        return true;
    }
    return false;
}

//fonctions initialisation du niveau

function initNextLevel() {
    game.level++;
    game.speed++;
    sounds.music.pause();
    game.sfx && sounds.levelCompleted.play();
    ctx.font = '50px ArcadeClassic';
    ctx.fillStyle = 'yellow';
    ctx.fillText(`LEVEL ${game.level}!`, canvas.width / 2 - 80, canvas.height / 2);
}


//En cas de fin de jeu

function isGameOver() {
    const isBallLost = () => ball.y - ball.radius > canvas.height;

    if (isBallLost()) {
        game.lives -= 1;
        game.sfx && sounds.ballLost.play();
        if (game.lives === 0) {
            gameOver();
            return true;
        }
        resetBall();
        resetPaddle();
    }
    return false;
}


//definir l'objet gameover 


function gameOver() {
    game.on = false;
    sounds.music.pause();
    sounds.currentTime = 0;
    game.sfx && sounds.gameOver.play();
    ctx.font = '50px Short Stack';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', canvas.width / 2 - 140, canvas.height / 2);
}



function volumeDown() {
    if (sounds.music.volume >= 0.1) {
        for (const [key] of Object.entries(sounds)) {
            sounds[key].volume -= 0.1;
        }
    }
}



function volumeUp() {
    if (sounds.music.volume <= 0.9) {
        for (const [key] of Object.entries(sounds)) {
            sounds[key].volume += 0.1;
        }
    }
}

initSounds();

