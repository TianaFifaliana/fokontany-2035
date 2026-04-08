const MaxHeap = require('../../data_structures/heap');

// Initialisation du heap
const signalements = new MaxHeap();

// Générer un ID simple
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Calcul de la priorité
function calculerPriorite(s) {
    // Tu peux améliorer cette logique plus tard
    return (s.gravite || 1) * 10;
}

// ➕ Ajouter un signalement
function ajouterSignalement(s) {
    const nouveau = {
        id: generateId(),
        type: s.type,
        gravite: s.gravite,
        zone: s.zone,
        statut: "EN_ATTENTE",
        priority: calculerPriorite(s),
        date: new Date()
    };

    signalements.insert(nouveau);

    return nouveau;
}

// 📄 Voir tous (non triés visuellement)
function getSignalements() {
    return signalements.getAll();
}

// 🚨 Obtenir le plus prioritaire
function getSignalementPrioritaire() {
    return signalements.extractMax();
}

// 📊 Voir sans supprimer (optionnel)
function voirTopPriorite() {
    return signalements.getAll()[0] || null;
}

module.exports = {
    ajouterSignalement,
    getSignalements,
    getSignalementPrioritaire,
    voirTopPriorite
};