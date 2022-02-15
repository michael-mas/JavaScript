const canvas = document.querySelector('canvas') // selectionner le canva

const c = canvas.getContext('2d') //définis parametre canva en 2D ; c = contexte

canvas.width = innerWidth //taille canva
canvas.height = innerHeight

class Player { //définie l'objet Player
    constructor() { //La méthode constructor est une méthode pour créer et initialiser un objet lorsqu'on utilise le mot clé class
        this.position = { //position
            x: 100,
            y: 100
        }
        this.velocity = { //sens gravité
            x:0,
            y:1
        }
        this.width = 30 //dimension
        this.height = 30
    }

    draw() { //dessine le contenu du bloc Player
        c.fillStyle = 'red' //.fillStyle de l'API Canvas 2D spécifie la couleur ou style à utiliser à l'intérieur des formes
        c.fillRect(this.position.x, this.position.y, this.width, this.height //La méthode fillRect() de l'API 2D des Canvas dessine un rectangle
            )
    }

    update() { //Cette méthode remplace le contenu de l'élément par l' argument newContent fourni et renvoie l'élément.
        this.position.y += this.velocity.y //Mise en place gravité
        this.draw()
    }
}

const player = new Player()  //définis la constante player
player.update() //Lance boucle joueur

function animate() { //créer fonction animate et ainsi pouvoir la modifier
    requestAnimationFrame(animate) //méthode: notifie le navigateur que vous souhaitez exécuter une animation et lance une fonction spécifique de mise à jour de l'animation, avant refresh
player.update() //anime le joueur
}

animate() //lance animation