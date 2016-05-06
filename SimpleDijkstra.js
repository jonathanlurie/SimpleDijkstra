

function SimpleDijkstra(graph){
    this._graph = graph;
    this._unvisitedVertice = graph.getVertices();
    this._shortestDistances = {};
    this._startingPoint = undefined;

    // initialize the shortest distances with the largest number (simulate INF)
    for(var i=0; i<this._unvisitedVertice.length; i++){
        this._shortestDistances[this._unvisitedVertice[i]] = {
            d: Number.MAX_SAFE_INTEGER,
            currentVertex: this._unvisitedVertice[i],
            byVertex: undefined
        };
    }

}


/*
    Simulate the behaviour of a priority queue by returning the vertex with
    the shortest distance (so far), among the unvisited ones.
    note: the returned vertex is a copy
    (and not a pointer on a vertex from within this._shortestDistances).
    If no more vertex are available (all were visited), the  "currentVertex"
    property of the returned object will be "undefined" , so it can raise a flag
*/
SimpleDijkstra.prototype.getShortestDistance = function(){
    var vertexWithShortestDistance = {
        d: Number.MAX_SAFE_INTEGER,
        currentVertex: undefined,
        byVertex: undefined
    };

    for(var i=0; i<this._unvisitedVertice.length; i++){

        if(this._shortestDistances[this._unvisitedVertice[i]].d < vertexWithShortestDistance.d){
            vertexWithShortestDistance.currentVertex = this._unvisitedVertice[i];
            vertexWithShortestDistance.d = this._shortestDistances[this._unvisitedVertice[i]].d;
            vertexWithShortestDistance.byVertex = this._shortestDistances[this._unvisitedVertice[i]].byVertex;
        }
    }

    return vertexWithShortestDistance;
}

/*
    access point from the ouside, run Dijkstra from a point
*/
SimpleDijkstra.prototype.runDijkstra = function(startVertex){

    this._startingPoint = startVertex;

    // initialization
    for(var i=0; i<this._unvisitedVertice.length; i++){
        this._shortestDistances[this._unvisitedVertice[i]].d = Number.MAX_SAFE_INTEGER;
        this._shortestDistances[this._unvisitedVertice[i]].byVertex = startVertex;
    }
    this._shortestDistances[startVertex].d = 0;
    this._shortestDistances[startVertex].currentVertex = startVertex;
    this._shortestDistances[startVertex].byVertex = startVertex;

    // prepare for the start: the startVertex to itself has a distance of 0
    var referenceVertex = {
        d: 0,
        currentVertex: startVertex,
        byVertex: startVertex
    };

    while(typeof referenceVertex.currentVertex !== "undefined"){
        // run the distance calculation from this current vertex (referenceVertex)
        this.perVertex(referenceVertex.currentVertex);

        // removing the current vertex from the list of unvisited vertice
        var indexOfCurrentVertice = this._unvisitedVertice.indexOf(referenceVertex.currentVertex);
        this._unvisitedVertice.splice(indexOfCurrentVertice, 1);

        // get the unvisited vertex that has the shortest distance to startVertex so far
        referenceVertex = this.getShortestDistance();
    }

}


/*
    make the shortest path progress starting from startVertex to i (see for loop), going by v
*/
SimpleDijkstra.prototype.perVertex = function(v){

    for(var i=0; i<this._unvisitedVertice.length; i++){

        // don't do the current vertex (with itself)
        if(v == this._unvisitedVertice[i] )
            continue;

        var distance_i_v = this._graph.getDistance(v, this._unvisitedVertice[i]); // the distance should be added to the d so far
        var distanceDijkstraTo_i = this._shortestDistances[this._unvisitedVertice[i]]; // idem
        var distanceDijkstraTo_v = this._shortestDistances[v]; // idem

        // if there is no direct connection, the vertex i is not a candidate
        if(distance_i_v == Number.MAX_SAFE_INTEGER)
            continue;

        // distance from startVertex to v, by i
        var distanceStartVertexTo_i_by_v = distanceDijkstraTo_v.d + distance_i_v;

        if( (distanceDijkstraTo_i.d == Number.MAX_SAFE_INTEGER)  || (distanceStartVertexTo_i_by_v < distanceDijkstraTo_i.d) ) {
            distanceDijkstraTo_i.d = distanceStartVertexTo_i_by_v ;
            distanceDijkstraTo_i.byVertex = v;
        }
    }
}


/*
    build the route from startVertex to v
*/
SimpleDijkstra.prototype.getShortestPathTo = function(v){
    if(v in this._shortestDistances){

        var path = {d: this._shortestDistances[v].d, vertice: [v]};
        var visitedVertex = v;

        while(visitedVertex != this._startingPoint){
            visitedVertex = this._shortestDistances[visitedVertex].byVertex;
            path.vertice.unshift(visitedVertex);
        }

        return path;

    }else{
        console.log("ERROR: Vertex " + v + " was not found in the graph.");
        return undefined;
    }
}


/*
    concatenation of the main method accesible. (the 1 step way)
*/
SimpleDijkstra.prototype.getShortestPathFromTo = function(fromV, toV){
    this.runDijkstra(fromV);
    var path = this.getShortestPathTo(toV);

    return path;
}


/*
    exporting the module for both Node and Browser
*/
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = SimpleDijkstra;
}else{
    window.SimpleDijkstra = SimpleDijkstra;
}
