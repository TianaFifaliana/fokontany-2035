const express = require('express');
const router = express.Router();

const { ajouterHabitant, getHabitants } = require('../services/habitants');

// POST /habitants
router.post('/', (req, res) => {
    const { nom, age } = req.body;

    if (!nom || !age) {
        return res.status(400).json({ error: "nom et age requis" });
    }

    const habitant = ajouterHabitant({ nom, age });
    console.log(`POST /habitants: ajouté ${habitant.nom} (${habitant.age} ans) ID:${habitant.id}`);
    res.json({
        message: "Habitant ajouté",
        habitant
    });
});

// GET /habitants
router.get('/', (req, res) => {
    res.json(getHabitants());
});

module.exports = router;
