console.info('cocktails.js loaded');

//preconfigurer injection element API dans html
document.addEventListener('prechange', function(event) { 
    document.querySelector('ons-toolbar .center')
        .innerHTML = event.tabItem.getAttribute('label');
});

// Connecte API et met fonction en cas de probleme de reponse
function getRandomCocktail(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Regarde, on a un probleme. Le status du code est: ' +
                response.status);
                return;
            }

            //Examine le texte en réponse
            response.json().then(function(data) { 
                //console.log(data);
                dysplayRandomCocktail(data);
             });
        }
    )
    .catch(function(err) {
        console.log('Erreur à chercher:-S' , err);
    });
}

//affiche tableaux de API
        getRandomCocktail();

        //affiche contenu
        function dysplayRandomCocktail(cocktail){
            console.log(cocktail.drinks);

            let drinkSection = document.querySelector('#drink-section');

            //nom du cocktail
            let drinkName = document.createElement('h2');
            drinkName.innerHTML = cocktail.drinks[0].strDrink;
            drinkSection.appendChild(drinkName);

            //Image du cocktail ( injection img )
            let img = document.createElement('img');
            img.src =  cocktail.drinks[0].strDrinkThumb;
            drinkSection.appendChild(img);
          
            //boucle lister elements ingredients
            for(let i=1; i<16; i++){ 
                console.log(i);

                //supprimer elements vide (null) du tableau
                if(cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == 'null'){
                    break;  
                }

                if(cocktail.drinks[0][`strMeasure${i}`] == null || cocktail.drinks[0][`strMeasure${i}`] == 'null'){
                    break;  
                }

                //variable ingredient et quantité et injecter dans la section
                let ingredient = document.createElement('ons-list-item');
                ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`]
                drinkSection.appendChild(ingredient);
            }

            //Instruction pour faire le cocktail mis dans ons-card
            let card = document.createElement('ons-card');
            card.innerHTML = cocktail.drinks[0].strInstructions;
            drinkSection.appendChild(card);

        }
    
        
        //Swapper vers le haut pour actualiser la page et le cocktail
        ons.ready(function() {
            var pullHook = document.getElementById('pull-hook');
          
            pullHook.addEventListener('changestate', function(event) {
              var message = '';
          
              switch (event.state) {
                case 'initial':
                  message = 'Pull to refresh';
                  getRandomCocktail();
                  break;
                case 'preaction':
                  message = 'Release';
                  break;
                case 'action':
                  message = 'Loading...';
                  break;
              }
          
              pullHook.innerHTML = message;
            });
          
            pullHook.onAction = function(done) {
              setTimeout(done, 1000);
            };
          });

