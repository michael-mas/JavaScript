document.addEventListener("click",handler,true);

function handler(e){
    if (i == 0){
        document.body.style.backgroundColor = 'green';
    } else{
    e.stopPropagation(); //Évite que l'évènement courant ne se propage plus loin dans les phases de capture et de déploiement.
    e.preventDefault();//rattachée à l'interface Event, indique à l'agent utilisateur que si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
    }
}
  
document.addEventListener("click", myFunction);

function myFunction() {
    
  document.getElementById("clickeur").innerHTML = "Waow quel clique!";
}


