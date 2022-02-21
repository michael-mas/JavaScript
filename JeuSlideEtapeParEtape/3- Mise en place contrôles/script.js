//Chargement au début de l'execution du code dans une fonction anonyme callback
//Fonction anonyme = sans nom pour séparer la porté du jeu de la porté général pour s'assurer que les class et nom de variable
//ne s'entrechoquent pas avec d'autres codes extérieurs, car le code s'executera ligne par ligne

//Bloc de construction d'initialisation

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); //creer contexte canvas pour preparer l'animation 2D
    canvas.width = 800;
    canvas.height = 720;

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
            this.frameY = 0;
            this.speed = 0;  
            this.vy = 0; //velocité en y    
            this.weight = 1; // valeur poid pour gravité
        }
        
        // l'objet joueur a la methode public draw
        draw(context){ // argument context pour demander au canva de dessiner le joueur
            context.fillStyle = 'white'; //méthode fillStyle pour definir couleur
            context.fillRect(this.x, this.y, this.width, this.height); //méthode rect pour représenter le joueur dans un rectangle
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height); //positionne sprites par rapport au rect Player (0 = sx, ect... = source x, ect... = position frame)
        }
        update(input){ // connecter mouvement aux touches de contrôle par l'argument input
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
            } else {
                this.vy = 0 // quand il touche le sol sa velocité revient à 0
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height // rajoute le systeme de poid au saut pour ne pas resauter
        }
        onGround(){ // quand le jour est en l'air
            return this.y >= this.gameHeight - this.height; // limite verticale
        }

    }

    // Pour faire le scroll horizontal et mettre l'image de fond et son animation
    class Background {

    }

    //Class pour genener les enemies
    class Enemy {

    }

    //Fonction pour appeler les groupes enemies ,et gere les animations et disparitions
    function handEnemies(){

    }

    //Fonction pour afficher du texte/message par exemple (gameOver, score)
    function displayStatusText(){

    }

    //Constante pour piocher les elements de controle, dans le constructeur de InputHandler
    const input = new  InputHandler();
    
    //Lancer instance de la class Player pour utiliser KeyBoard
    const player = new Player(canvas.width, canvas.height);

   

    //Fonction qui gèrent les boucles d'animation (fps, dessiner, animer en boucle continu)
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height); //clearRect: efface les frames precedents du rectangle
        player.draw(ctx); // Appel draw dans animation avec ctx en argument
        player.update(input); // Appel de l'argument input via update dans la boucle animation
        requestAnimationFrame(animate); // voir méthode Window.requestAnimationFrame()
    }
    animate(); //lancer animation
});

