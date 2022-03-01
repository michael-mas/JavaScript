let titulaire1 = new Titulaire("Gambier", "Benoit");
//document.getElementById("User1").innerHTML = titulaire1.nom + " " + titulaire1.prenom ;

let titulaire2 = new Titulaire("Talu", "Jean");

//document.getElementById("User2").innerHTML = titulaire2.nom + " " + titulaire2.prenom ;

titulaire2.identite();

let titulaire3 = new Titulaire("Penneflamme", "Katy");



let compte1 = new Compte(titulaire3, 25);



console.log(compte1);

compte1.crediter(150);

console.log(compte1);

compte1.debiter(20);

compte1.afficherSolde();
//document.getElementById("User3").innerHTML = titulaire3.nom + " " + titulaire3.prenom + " " + compte1.solde ;

let compteEpargne1 = new CompteEpargne(titulaire2, 15);

//console.log(compteEpargne1);

compteEpargne1.crediter(35);
compteEpargne1.crediter(35);
compteEpargne1.crediter(35);
compteEpargne1.crediter(35);

//console.log(compteEpargne1);
compteEpargne1.debiter(35);
//console.log(compteEpargne1);

compteEpargne1.afficherSolde();

let compteEpargne2 = new CompteEpargne(titulaire1, 30);
//console.log(compteEpargne2);
compteEpargne2.afficherSolde();

let compteEpargne3 = new CompteEpargne(titulaire3, 1000);

compteEpargne3.afficherSolde();


function prelevement() {
    abonnement1 = new Abonnement(titulaire3, compteEpargne3.solde, prix = 0.00000250, rythme = 1000)
    console.log(abonnement1)
    setInterval(() => {
        this.prix = prix;
        let prixAbonnement = (compteEpargne3.solde - abonnement1.solde)*this.prix;
        compteEpargne3.solde = compteEpargne3.solde - this.prix;
        console.log(compteEpargne3.solde);
        document.getElementById("User3").innerHTML = "Nom:" + titulaire3.nom + " | " + "Prénom:" + titulaire3.prenom + " | " + "Solde:" + Math.round(compteEpargne3.solde) + "€" + " | " + "Abonnement:" + prixAbonnement + "€" ;
    }, this.rythme);
 }