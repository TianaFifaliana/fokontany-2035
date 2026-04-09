const express = require('express');
const router = express.Router();

const {
    ajouterSignalement,
    getSignalements
} = require('../services/signalements');

router.post('/', (req, res) => {
    ajouterSignalement(req.body);
    res.send("Signalement ajouté");
});

router.get('/', (req, res) => {
    res.json(getSignalements());
});

module.exports = router;