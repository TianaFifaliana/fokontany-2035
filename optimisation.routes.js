const express = require('express');
const router = express.Router();

const {
    calculerChemin,
    optimiserBudget
} = require('../services/optimisation');

// Route Dijkstra GET
router.get('/dijkstra', (req, res) => {
    let graph = req.body.graph || req.query.graph;
    let start = req.body.start || req.query.start;

    if (!graph || !start) {
        return res.status(400).json({ error: "graph et start requis (utilisez POST avec body JSON ou GET avec query params URL-encoded)" });
    }

    try {
        // If from query and string, decode and parse
        if (req.query.graph) {
            graph = JSON.parse(decodeURIComponent(graph));
        } else if (typeof graph === 'string') {
            graph = JSON.parse(graph);
        }
        // start remains string
        const result = calculerChemin(graph, start);

        res.json({
            message: "Chemins les plus courts calculés",
            result
        });
    } catch (error) {
        res.status(400).json({ error: "Format graph invalide (doit être objet JSON valide)" });
    }
});

// Route Dijkstra POST
router.post('/dijkstra', (req, res) => {
    const { graph, start } = req.body;

    if (!graph || !start) {
        return res.status(400).json({ error: "graph et start requis" });
    }

    const result = calculerChemin(graph, start);

    res.json({
        message: "Chemins les plus courts calculés",
        result
    });
});

// Route Knapsack GET
router.get('/knapsack', (req, res) => {
    const { items, budget } = req.query;

    if (!items || !budget) {
        return res.status(400).json({ error: "items et budget requis en query params" });
    }

    try {
        const parsedItems = JSON.parse(decodeURIComponent(items));
        const parsedBudget = parseInt(budget);
        const result = optimiserBudget(parsedItems, parsedBudget);

        res.json({
            message: "Budget optimisé",
            result
        });
    } catch (error) {
        res.status(400).json({ error: "Format items invalide" });
    }
});

// Route Knapsack POST
router.post('/knapsack', (req, res) => {
    const { items, budget } = req.body;

    if (!items || !budget) {
        return res.status(400).json({ error: "items et budget requis" });
    }

    const result = optimiserBudget(items, budget);

    res.json({
        message: "Budget optimisé",
        result
    });
});

// Root route for API info
router.get('/', (req, res) => {
    res.json({
        message: 'Optimisation API - SmartFokontany',
        endpoints: {
            dijkstra: {
                path: '/optimisation/dijkstra',
                method: 'GET/POST',
                description: 'Calcul chemin le plus court (préférez POST avec body JSON)',
                params: 'graph (objet JSON), start (string node)',
                example_post: {
                    graph: {"A": {"B": 2, "C": 5}, "B": {"C": 1}, "C": {}},
                    start: "A"
                },
                example_dijkstra_get: '/optimisation/dijkstra?graph=%7B%22A%22%3A%7B%22B%22%3A2%2C%22C%22%3A5%7D%2C%22B%22%3A%7B%22C%22%3A1%7D%2C%22C%22%3A%7B%7D%7D&start=A'
            },
            knapsack: {
                path: '/optimisation/knapsack',
                method: 'GET/POST',
                description: 'Optimisation budget sac à dos',
                params: 'items (JSON array), budget (number)'
            }
        },
        example_dijkstra_post: '{"graph":{"A":{"B":2,"C":5},"B":{"C":1},"C":{}},"start":"A"}',
        health: 'OK'
    });
});

module.exports = router;
