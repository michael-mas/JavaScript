
// Décompte
var i = 1;
var decompte = setInterval(function(){
    var text = document.getElementById("temps").textContent;   
    document.getElementById("temps").textContent = i--;
    console.log("Resultat text: " + text);
    console.log("Resultat i: " + i);    
        }, 1000);
    
var minuteur = setTimeout(function() {
    var d = new Date();
    var date = d.getHours() + ":" + d.getMinutes();
    alert ("Après 15 secondes, il est " + date + " et tu peux cliquer maintenant !");
    clearInterval(decompte);
}, 1000);


