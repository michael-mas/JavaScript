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
            window.addEventListener('keydown', e => { 
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
            this.y = 0;
        }
        // l'objet joueur a la methode public draw
        draw(context){ // argument context pour demander au canva de dessiner le joueur
            context.fillStyle = 'white'; //méthode fillStyle pour definir couleur
            context.fillRect(this.x, this.y, this.width, this.height); //méthode rect pour représenter le joueur dans un rectangle
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

    //Appeler la methode draw pour le player avec l'argument ctx
    player.draw(ctx);

    //Fonction qui gèrent les boucles d'animation (fps, dessiner, animer en boucle continu)
    function animation(){

    }

});

//Fin du Bloc d'initialisation