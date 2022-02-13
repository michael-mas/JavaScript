/* ===== CHARGEMENT DES DIFFERENTS SONS DU JEU===== */
const WALL_HIT = new Audio('sounds/wall.mp3');

const PADDLE_HIT = new Audio('sounds/paddle_hit.mp3');

const BRICK_HIT = new Audio('sounds/brick_hit.mp3');

const WIN = new Audio('sounds/win.mp3');

const LIFE_LOST = new Audio('sounds/life_lost.mp3');

/* ===== CHARGEMENT DES IMAGES ===== */
const LEVEL_IMG = new Image(40, 40);
LEVEL_IMG.src = 'img/level.png';
const LIFE_IMG = new Image(40, 40);
LIFE_IMG.src = 'img/lifex.png';
const SCORE_IMG = new Image();
SCORE_IMG.src = 'img/record1.png';