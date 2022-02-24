const tagsElemnts = document.getElementById('tags'); // L'element ou envoyer les choix
const textarea = document.getElementById('textarea'); // l'endroit ou le texte sera prix pour les choix

textarea.focus(); // focus() définit le focus sur l'élément spécifié, s'il peut être focalisé. L'élément ciblé est l'élément qui recevra le clavier et les événements similaires par défaut.
// On assigne textarea le focus pour la rentré de texte

textarea.addEventListener('keyup', (e) => { // On ajoute l'evenement de rentré de texte avec la l'evenement keyup
    createTags(e.target.value);

    if(e.key === 'Enter'){ // Si la touche appuyer est entré
        setTimeout(() => { //permet de définir un « minuteur » (timer) qui exécute une fonction ou un code donné après la fin du délai indiqué.
            e.target.value = ''; //Rentre les textes
        });
        randomSelect(); // La,ce un choix au hasard parmi eux
    }
});

function createTags(input){ // Fonction pour creer un choix
    const tags = input.split('').filter(tag => tag.trim() !== '').map(tag => tag.trim());
// On divise tags en liste => On retire tout les espaces blancs et divisant les chaines de caractere entre les espaces en element texte séparé,
// avec la methode trim => si tag! n'est pas vide
// Et enfin on  creeer un nouveau tableau avec la methode map avec les elements séparé
    tagsElemnts.innerHTML = ''; // On injecte le contenu rentré dans ''

    
    tags.forEach(tag => { // Pour chaque tag créer
        const tagElement = document.createElement('span'); // On creer un element span
        tagElement.classList.add('tag'); // On ajoute l'element avec la class tag
        tagElement.innerText = tag; // On injecte le texte
        tagsElemnts.appendChild(tagElement); // Le contenu est envoyé de tagELement est envoyé à tagELements et donc via l'id qui lui est affecté
        // la méthode appenChild est utilisé:  ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié. 
        //Si l'enfant donné est une référence à un nœud existant dans le document,
        // appendChild() le déplace  de sa position actuelle vers une nouvelle position
    });
}

function randomSelect(){ // la fonction qui fera le choix au hasard
    const times = 30; // la constante temps = 0.03s, c'est la mesure de base qui sera utilisé

    const interval = setInterval(() => { // creer l'interval entre le passage des choix durant le lancement
        const randomTag = pickRandomTag(); //on creer random tag qui deviendra le choix selectionner par pickRandomTag

        selectedTag(randomTag); //Fait un choix

        setTimeout(() => {
            unselectedTag(randomTag) //Déselectionne
        }, 100); //durera 0.1scd
    }, 100);//durera 0.1scd

    setTimeout(() => {
        clearInterval(interval); //renitialise l'interval

        setTimeout(() => { // Relance le choix au hasard
            const randomTag = pickRandomTag(); // Refait un choix

            selectedTag(randomTag); //Selectionne 
        }, 100);
    }, times * 100); //Le lancement de cette evenement durerar 0.03 *100 = 3 scd  au total de la boucle entiere
}

function pickRandomTag(){ // La fonction qui fera le choix au hasard avec la methode Math et le resultat sera dans la boucle via la class tag
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)] // selection au hasard sur les element defni par tags.lenght qui sera le texte
}

function selectedTag(tag){ // la fonction de selection de choix
    tag.classList.add('selected'); // ajoute selection de tag pour la fontion selectedTag
}
function unselectedTag(tag){ // la fonction de déselection
    tag.classList.remove('selected'); // supprime selection de tag pour la fontion selectedTag
}
