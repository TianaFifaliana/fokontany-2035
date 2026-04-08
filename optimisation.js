const dijkstra = require('../../algorithms/dijkstra');
const knapsack = require('../../algorithms/knapsack');

// Service Dijkstra
function calculerChemin(graph, start) {
    return dijkstra(graph, start);
}

// Service Knapsack
function optimiserBudget(items, budget) {
    return knapsack(items, budget);
}

module.exports = {
    calculerChemin,
    optimiserBudget
};