//var SimpleDijkstraGraph = require("../../SimpleDijkstraGraph");
//var SimpleDijkstra = require("../../SimpleDijkstra");

var SimpleDijkstraGraph = require("../..").SimpleDijkstraGraph;
var SimpleDijkstra = require("../..").SimpleDijkstra;


// creating the graph and filling it
var g = new SimpleDijkstraGraph();

// First example
// from a
g.addEdge("a", "b", 8);
g.addEdge("a", "d", 5);
g.addEdge("a", "c", 2);
// from b
g.addEdge("b", "d", 2);
g.addEdge("b", "f", 13);
// from c
g.addEdge("c", "d", 2);
g.addEdge("c", "e", 5);
// from d
g.addEdge("d", "e", 1);
g.addEdge("d", "f", 6);
g.addEdge("d", "g", 3);
// from e
g.addEdge("e", "g", 1);
// from f
g.addEdge("f", "g", 2);
g.addEdge("f", "h", 3);
// from g
g.addEdge("g", "h", 6);


/*
// Second example
g.addEdge("a", "b", 3);
g.addEdge("a", "c", 5);
g.addEdge("a", "d", 6);

g.addEdge("b", "d", 2);

g.addEdge("c", "d", 2);
g.addEdge("c", "e", 6);
g.addEdge("c", "f", 3);
g.addEdge("c", "g", 7);

g.addEdge("d", "f", 9);

g.addEdge("e", "f", 5);
g.addEdge("e", "g", 2);

g.addEdge("f", "g", 1);
*/

/*
    The 2 steps way
*/
var dij1 = new SimpleDijkstra(g);
// step1: getting the short distances to all other vertice
dij1.runDijkstra("b");

// step 2: retrieving the shortest path from the starting vertex to another
var path = dij1.getShortestPathTo("h");
console.log(path);

/*
    The 1 steps way
*/
var dij2 = new SimpleDijkstra(g);
var path = dij2.getShortestPathFromTo("b", "h");
console.log(path);
