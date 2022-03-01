/**
 * Compte bancaire
 */
class Compte{
    /**
     * Création du compte
     * @param {Titulaire} titulaire Titulaire du compte
     * @param {number} montant Montant de départ
     */
    constructor(titulaire, montant = 0){
        this.titulaire = titulaire;
        this.solde = montant;
        
    }

    
    /**
     * Créditer le compte
     * @param {number} montant 
     */
    crediter(montant){
        this.solde += montant;
    }

    /**
     * Débiter le compte
     * @param {number} montant 
     */
    debiter(montant){
        this.solde -= montant;
    }

    /**
     * Afficher le solde du compte
     */
    afficherSolde(){
        console.log(`Le compte présente un solde de ${this.solde} euros.`);
        
    }
}

