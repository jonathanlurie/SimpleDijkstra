

function SimpleDijkstraGraph(){
    // map of map with the distances (w)
    this._vertice = {};

    // just the name of the vertices, in a map (value will be always 1)
    this._verticeList = {};
}


/*
    add two vertice and a distance.
*/
SimpleDijkstraGraph.prototype.addEdge = function(v1, v2, d){
    if( !(v1 in this._vertice)){
        this._vertice[v1] = {};
    }
    this._vertice[v1][v2] = d;

    // add them to the list (even if they are already)
    this._verticeList[v1] = 1;
    this._verticeList[v2] = 1;

}


/*
    returns the distance between two vertice
*/
SimpleDijkstraGraph.prototype.getDistance = function(v1, v2){

    // same vertex
    if(v1 == v2){
        return 0;
    }

    var d = Number.MAX_SAFE_INTEGER;

    // stored in one way...
    if(v1 in this._vertice){
        if(v2 in this._vertice[v1]){
            d = this._vertice[v1][v2];
        }
    }

    // ... or the other
    if(v2 in this._vertice){
        if(v1 in this._vertice[v2]){
            d = this._vertice[v2][v1];
        }
    }

    return d;
}


/*
    return the array of all vertice (names only)
*/
SimpleDijkstraGraph.prototype.getVertices = function(){
    return Object.keys(this._verticeList);
}


/*
    exporting the module for both Node and Browser
*/
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = SimpleDijkstraGraph;
}else{
    window.SimpleDijkstraGraph = SimpleDijkstraGraph;
}
