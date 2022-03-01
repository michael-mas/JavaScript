
let words = [];

function addUserInfo(){
    let userAdd = document.getElementById('userInput').value;
    if(userAdd!=''){
    words.push(userAdd);
    this.nom = userAdd;
    this.titulaire = userAdd;
    this.solde = 30;
    words.push(new Titulaire(`${this.nom}`), new Compte(userAdd, `${this.solde}`), new CompteEpargne(userAdd, `${this.solde}`));
  
    //console.log(words);
    //words.push(new Compte(userAdd, 25));
    console.log(words);
    console.log(typeof this.solde);
    showUserInfo();
    }
}






function showUserInfo(){
    let showInfo='';
    let counter = 0;
    words.slice(0,1).forEach(word => 
        showInfo += `
        <li class="list-group-item m-1">
            <p class="display-4">Nom:${word} |<span class="float-right">Solde:${this.solde}€<button value="${counter++}" onClick="removeName(this)"  class="btn btn-danger">X</button></span></p>
        </li>
        `
        );
        document.getElementById("display").innerHTML=showInfo;
        document.getElementById('userInput').value = null;
}

function removeName(e){
    words.splice(parseInt(e.value),1);
    showUserInfo();
}