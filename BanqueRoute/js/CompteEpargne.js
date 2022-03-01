/**
 * Compte épargne
 */
class CompteEpargne extends Compte{
    /**
     * Création du compte
     * @param {Titulaire} titulaire Titulaire du compte
     * @param {number} montant Montant de départ
     * @param {number} taux Taux d'intérêts
     * @param {number} rythme Rythme de versement des intérêts (en millisecondes)
     */
    constructor(titulaire, montant = 50, taux = 0.005, rythme = 1000){
        super(titulaire, montant);
        this.taux = taux;
        this.rythme = rythme;

        // Intérêts de taux toutes les "rythme" millisecondes (0.5% toutes les 5 secondes)
        setInterval(() => {
            this.solde *= 1+this.taux;
            console.log(this.solde);
            //document.getElementById("User3").innerHTML = "Nom:" + titulaire3.nom + " | " + "prénom:" + titulaire3.prenom + " | " + "Solde:" + Math.round(compteEpargne1.solde) + "€" ;
            document.getElementById("User1").innerHTML = "Nom:" + titulaire1.nom + " | " + "prénom:" + titulaire1.prenom + " | " + "Solde:" + Math.round(compteEpargne2.solde) + "€" ;
            document.getElementById("User2").innerHTML = "Nom:" + titulaire2.nom + " | " + "prénom:" + titulaire2.prenom + " | " + "Solde:" + Math.round(compteEpargne1.solde) + "€" ;
        }, this.rythme);
    }
}
