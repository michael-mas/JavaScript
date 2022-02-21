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
            window.addEventListener('keydown', function(e){
                console.log(e);
            });
        }
    }

    // Class player pour reagir aux evenement réliés (comme avec keyboard)
    class Player {

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

    //Fonction qui gèrent les boucles d'animation (fps, dessiner, animer en boucle continu)
    function animation(){

    }

});

//Fin du Bloc d'initialisation