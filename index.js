const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Import all routes at the top
const signalementsRoutes = require('./routes/signalements_routes');
const habitantsRoutes = require('./routes/habitants_routes');
const optimisationRoutes = require('./routes/optimisation.routes.js');

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('SmartFokontany API fonctionne');
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        routes: {
            habitants: '/habitants (GET/POST)',
            signalements: '/signalements (GET/POST)', 
            optimisation: '/optimisation/dijkstra (GET/POST), /optimisation/knapsack (GET/POST)'
        }
    });
});

// Mount all routes
app.use('/signalements', signalementsRoutes);
app.use('/habitants', habitantsRoutes);
app.use('/optimisation', optimisationRoutes);

app.listen(PORT, () => {
    console.log(`🚀 SmartFokontany API lancée sur http://localhost:${PORT}`);
    console.log(`✅ Test: curl http://localhost:${PORT}/health`);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} non trouvée` });
});

// Global error handler  
app.use((err, req, res, next) => {
    console.error('Erreur:', err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

module.exports = app;
