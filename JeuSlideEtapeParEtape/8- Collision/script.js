//Chargement au début de l'execution du code dans une fonction anonyme callback
//Fonction anonyme = sans nom pour séparer la porté du jeu de la porté général pour s'assurer que les class et nom de variable
//ne s'entrechoquent pas avec d'autres codes extérieurs, car le code s'executera ligne par ligne

//Bloc de construction d'initialisation

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); //creer contexte canvas pour preparer l'animation 2D
    canvas.width = 800;
    canvas.height = 720;
    let enemies = []; // Variable pour pouvoir faire apparaitre plusieurs enemies
    let score = 0; //creer variable score qui commance à 0
    let gameOver = false; // variable Gameover: false de base

    //Class pour appliquer evenement keyboard via le tableaux des touches actives
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => { // Voir ES6 arrow functions
                if ((   e.key === 'ArrowDown' || // tests avec chaques directions
                        e.key === 'ArrowUp' || 
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight')
                        &&this.keys.indexOf(e.key) === -1){ // condition pour pas que le l'evenement ne remplisse le tableaux avec les mêmes éléments
                    //La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1.
                    this.keys.push(e.key); //Push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau
                }
            });
            window.addEventListener('keyup', e => { 
                if (    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' || 
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key), 1); // Splice: modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau
                    //retirer 1 élement de l'index du tableau au fur à mesure des activations des touches
                }
            });

        }
    }

    // Class player pour reagir aux evenement réliés (comme avec keyboard, animations, mise a jour positions)
    class Player {
        constructor(gameWidth, gameHeight){ // l'objet Player doit etre au courant des frontieres du jeu
            this.gameWidth = gameWidth; //arguments transformé en propriété de class
            this.gameHeight = gameHeight;
            this.width = 200; //utilisé les memes mesures de vos sprites pour une meilleur adaptation et utilisations de ces derniers
            this.height = 200;
            this.x = 0; //positionement
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage'); // image joueur definit par Id playerImage dans index.html
            this.frameX = 0;//Tourne valeurs drawImage pour sprite en propriété de class pour animation
            this.maxFrame = 8;
            this.frameY = 0;
            this.fps = 20; //affecte la navigation des sprite de façon horizontal
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 0;  
            this.vy = 0; //velocité en y    
            this.weight = 1; // valeur poid pour gravité
        }
        
        // l'objet joueur a la methode public draw
        draw(context){ // argument context pour demander au canva de dessiner le joueur
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height); // initaliser la hitbox
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2); //calcul du cercle du joueur 
            context.stroke();
            context.strokeStyle = 'blue';
            context.beginPath();
            context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2); //calcul du cercle de l'enemie 
            context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height); //positionne sprites par rapport au rect Player (0 = sx, ect... = source x, ect... = position frame)
        }
        update(input, deltaTime, enemies){ // connecter mouvement aux touches de contrôle par l'argument input
            
            // Detection des collisions
            // Nous allons calculer la distance entre le jouer les enemies à l'aide du theoreme de Pythagore
            // Nous devons comparer les distances avec les rayons des deux cercles
            //Si la distance est inferieur à ses deux rayon alors il y a collision
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2); //creation de la constante distance à partir des centres des cercles
                const dy = (enemy.y +enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy) // La fonction Math.sqrt() renvoie la racine carrée d'un nombre
                //On dessine un triangle imaginaire ou on sait que son hypotenus est la distance entre les deux cercles (vf:theoreme Pythagore)
                if (distance < enemy.width/2 + this.width/2){//Si la distance est egale au rayon du cercle de l'enemie + le notre
                    gameOver = true; // Alors gameOver est vrai
                }
            });

            // Animation des sprites joueur
            if(this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0; //Idem que pour le gestion du temps sprite enemie
                else this.frameX++;
                this.frameTimer = 0;
            }else {
                this.frameTimer += deltaTime;
            }
            
            
            //Controle joueur
            if (input.keys.indexOf('ArrowRight') > -1){ //Si appel de arrowUp via le tableau keys est lancé quand l'index est à -1 lance le code de la touche
                this.speed = 5; // alors met la vitesse du joueur à 5
            } else if(input.keys.indexOf('ArrowLeft') > -1){ // Idem pour touche gauche
                this.speed = -5;
            } else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){ // && Empeche le double saut
                this.vy -= 32; // vélocité
            } else {
                this.speed = 0; // Sinon vitesse = 0 pour que le joueur s'arrête
            }

            //mouvements horizontals
            this.x += this.speed;//Augmenter les coordonées en x du joueur par la valeur de this.speed
            if (this.x < 0) this.x = 0; // Mettre les limites de mouvements horizontals à gauche
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width //Mettre les limites de mouvements horizontals à droite
            
            //mouvement verticales
            this.y += this.vy; //Augmenter les coordonées en y du joueur par la valeur de this.vy
            if (!this.onGround()){  //si onGround = Faux alors la velocité du joueur est egale a son poid
                this.vy += this.weight;
                this.maxFrame = 5; // Limite pour ne pas avoir les sprites vide lors su saut
                this.frameY = 1; //défini la frame lors du saut
            } else {
                this.vy = 0 // quand il touche le sol sa velocité revient à 0
                this.maxFrame = 8;
                this.frameY = 0; //défini la frame lors du contact du sol après la chute
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height // rajoute le systeme de poid au saut pour ne pas resauter
        }
        onGround(){ // quand le jour est en l'air
            return this.y >= this.gameHeight - this.height; // limite verticale
        }

    }

    // Pour faire le scroll horizontal et mettre l'image de fond et son animation
    class Background {
        constructor(gameWidth, gameHeight){ //defini parametre de l'image
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 7; //vitesse de défilement 
        }
        draw(context){ //dessine le background
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height); //redefini l'image sur son axe x et corrige les transition de l'image durant la boucle
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0; //creer une boucle pour que l'image reviennent au point de départ (ilusion de boucle)
        }
    }

    //Class pour créer propriété enemies
    class Enemy {
        constructor(gameWidth, gameHeight){ //definir parametre enemies
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160; //defini taille sprite
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20; //affecte la navigation des sprite de façon horizontal
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 8;
            this.markedForDeletion = false; // parametre de suppresion
        }
        draw(context){
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height); // initaliser la hitbox
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2); //calcul du cercle du joueur 
            context.stroke();
            context.strokeStyle = 'blue';
            context.beginPath();
            context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2); //calcul du cercle de l'enemie 
            context.stroke();
            
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
                 this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >=  this.maxFrame) this.frameX = 0;// Si la frame actuel est plus grand que la limite fait par maxFrame alors retour à 0
                else this.frameX++; //Sinon incrémentation de frameX de 1
                this.frameTimer = 0; //retour à 0
            } else {
                this.frameTimer += deltaTime
            }
            this.x -= this.speed; // initalisation pour que l'enemi1 bouge vers la gauche
            if (this.x < 0 - this.width){
                this.markedForDeletion = true; // Si la position enemi est infrieur a 0 alors supprime l'enemie
                score++; // Quand enemies supprimé incrementation du score de 1
        }
      }
    }
    //Fonction pour appeler les groupes enemies ,et gere les animations et disparitions
    function handleEnemies(deltaTime){
        if(enemyTimer > enemyInterval + randomEnemyInterval){ // si le timer enemie est plus grand que son interval assigné
           enemies.push(new Enemy(canvas.width, canvas.height)); //Pousse un/des élements dans le tableau enemy
           console.log(enemies);
           enemyTimer = 0; // apres le compteur revient à 0
        } else {
            enemyTimer += deltaTime; //Sinon enemyTimer est egal au temps du jeu
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx); //appel les fonctions pour afficher les enemies et les animer
            enemy.update(deltaTime);
        });
        //Utilisation de la méth. filter: crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);// Suppresion au fur a mesure des enemies produit dans le tableaux
    }

    //Fonction pour afficher du texte/message par exemple (gameOver, score)
    function displayStatusText(context){
        context.font = '40px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score: '+ score, 20, 50); //Voir methode fillText: ajoute texte. Ici "texte" + objet score et enfin position
        context.fillStyle = 'white'; // creer une ombre sur le texte
        context.fillText('Score: '+ score, 20, 52); 
        if (gameOver){ //affiche un message en cas de gameOver = True
            context.textAlign ='center';
            context.fillStyle = 'black';
            context.fillText('PARTIE TERMINEE, réessayer!', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('PARTIE TERMINEE, réessayer!', canvas.width/2, 202);
        }
    }

    //Constante pour piocher les elements de controle, dans le constructeur de InputHandler
    const input = new  InputHandler();
    
    //Lancer instance de la class Player 
    const player = new Player(canvas.width, canvas.height);

    //Lancer instance de la class background
    const background = new Background(canvas.width, canvas.height);

    let LastTime = 0; // Defini le temps
    let enemyTimer = 0; // compteur du temps lié à enemy
    let enemyInterval = 2000; // interval d'apparition en ms
    let randomEnemyInterval = Math.random() * 1000 + 500; //creer une apparition aléatoire avec la methode random de la lib Math
   

    //Fonction qui gèrent les boucles d'animation (fps, dessiner, animer en boucle continu)
    function animate(timeStamp){

        const deltaTime = timeStamp - LastTime; //La variable système deltaTime contient la différence de temps entre le début de la trame précédente 
        // et le début de la trame actuelle en millisecondes. timeStamp =  enregistrer la date et l'heure d'un événement
        LastTime = timeStamp; //dernier temps = temps écoulé

        ctx.clearRect(0,0,canvas.width, canvas.height); //clearRect: efface les frames precedents du rectangle

        background.draw(ctx); //appel draw pour dessiner background (!!! Bien placer les appel draw dans l'ordre d'affichage)
       // background.update(); //Callback de la mise à jour de background

        player.draw(ctx); // Appel draw dans animation avec ctx en argument pour dessiner le joueur
        player.update(input, deltaTime, enemies); // Appel de l'argument input et deltaTime via update dans la boucle animation

        handleEnemies(deltaTime); //Lance la boucle handleEnemies

        displayStatusText(ctx); //Afficher le contenu de displayStatusText

        if (!gameOver) requestAnimationFrame(animate); // Si il y a collision alors le jeu s'arrete via gameOver, sinon le jeu continu
    }
    animate(0); //lancer animation
});

