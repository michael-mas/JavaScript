/**
 * Compte épargne
 */
 class Abonnement extends Compte{
    /**
     * Création du compte
     * @param {Titulaire} titulaire Titulaire du compte
     * @param {number} montant Montant de départ
     * @param {number} prix Taux d'intérêts
     * @param {number} rythme Rythme de versement des intérêts (en millisecondes)
     */
    constructor(titulaire, montant = 50, prix = 0.001, rythme = 1000){
        super(titulaire, montant);
        this.prix = prix;
        this.rythme = rythme;

       
    }
}