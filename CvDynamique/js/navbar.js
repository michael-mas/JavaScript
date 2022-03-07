
window.onload = function() {myFunction()};
// Quand l'utilisateur scroll active myFunction
window.onscroll = function() {myFunction()};

// Selectionne la navBar
var navbar = document.getElementById("navbar");

// Met en place la position de la navbar par rapport à son parent avec la methode offsetTop donc au top
var sticky = navbar.offsetTop;


//Ajoute la class sticky a la navbar quand il atteind une position (pageToffset) par rapport à l'objet fenetre 
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



/* Bascule entre l'ajout et le retrait de la class responsive de la navbar quand l'utilisateur clique sur l'icone */
function myFunction2() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
