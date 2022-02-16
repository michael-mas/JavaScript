const canvas = document.querySelector('canvas') // selectionner le canva

const c = canvas.getContext('2d') //définis parametre canva en 2D ; c = contexte

canvas.width = innerWidth //taille canva
canvas.height = innerHeight

const gravity = 1.5 // vitesse constante gravité
class Player { //définie l'objet Player
    constructor() { //La méthode constructor est une méthode pour créer et initialiser un objet lorsqu'on utilise le mot clé class
        this.position = { //position
            x: 100,
            y: 100
        }
        this.velocity = { //sens gravité
            x:0,
            y:0
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
        this.draw()
        this.position.x += this.velocity.x //Sens velocité en x
        this.position.y += this.velocity.y //Sens velocité en y 
        
        if (this.position.y + this.height + //creer condition gravité
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity //Pour donner acceleration à la gravité
        else this.velocity.y = 0 //Pour que la gravité s'arrete si touche bas canva
    }
}

const player = new Player()  //définis la constante player
//constante keys
const keys = { // arrete boucle quand on appuie sur une touche directionnelle
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() { //créer fonction animate et ainsi pouvoir la modifier
    requestAnimationFrame(animate) //méthode: notifie le navigateur que vous souhaitez exécuter une animation et lance une fonction spécifique de mise à jour de l'animation, avant refresh
    c.clearRect(0, 0, canvas.width, canvas.height) //efface frame precedent du joueur
    player.update() //anime le joueur

    if (keys.right.pressed) { //relier action objet keys à l'animation joueur
        player.velocity.x = 5
    }   else if (keys.left.pressed) { //acitve touche gauche et donne velocité
        player.velocity.x = -5
    } else player.velocity.x = 0 // si on appuye plus sur la touche desactive velocité
}

animate() //lance animation

//créer evenement touches via keyCode
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37: //definis la touche gauche
            console.log('left')
            keys.left.pressed = true // activer objet key pour left
            break

        case 40: //definis la touche bas
            console.log('down')
            break

        case 39: //definis la touche droite
            console.log('right')
            keys.right.pressed = true
            break

        case 38: //definis la touche haut
            console.log('up')
            player.velocity.y -= 20 //contrer gravité en cas de saut
            break
    }
    console.log(keys.right.pressed)
})


//créer 2eme evenement touches via keyCode pour arreter velocité des mouvement
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37: //definis la touche gauche
            console.log('left')
            keys.left.pressed = false //désactiver objet keys
            break

        case 40: //definis la touche bas
            console.log('down')
            break

        case 39: //definis la touche droite
            console.log('right')
            keys.right.pressed = false 
            break

        case 38: //definis la touche haut
            console.log('up')
            player.velocity.y -= 20 //contrer gravité en cas de saut
            break
    }
    console.log(keys.right.pressed)
})
