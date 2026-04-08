const HashTable = require('../../data_structures/hashTable');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(__dirname, '../../../data/habitants.json');

const habitants = new HashTable();

// Générer ID unique
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function loadHabitants() {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        Object.assign(habitants.table, JSON.parse(data));
        console.log('Habitants chargés depuis le fichier');
    } catch (e) {
        console.log('Aucun fichier de données ou vide, démarrage frais');
    }
}

function saveHabitants() {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(habitants.table, null, 2));
        console.log('Habitants sauvegardés dans le fichier');
    } catch (e) {
        console.error('Erreur de sauvegarde:', e);
    }
}

loadHabitants();

function ajouterHabitant(h) {
    const id = generateId();

    const habitant = {
        id,
        nom: h.nom,
        age: h.age
    };

    habitants.set(id, habitant);
    saveHabitants();
    console.log(`Habitant ajouté ID: ${id} - ${h.nom} (${h.age} ans)`);

    return habitant;
}

function getHabitants() {
    return habitants.getAll();
}

module.exports = { ajouterHabitant, getHabitants };