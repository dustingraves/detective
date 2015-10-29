/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');

var investigation = getFile.processArgs(process);

var graphDict = {};
var graphDictArray = [];
var touchedDict = {seen: [], starts:[], ends:[]};
var pathDict = {paths:[]};

witnessAccounts(investigation, findPaths);


//This section maps nodes and edges to an object
function witnessAccounts(investigation, callback) {
    for (var people = 0; people < investigation.length; people++) {
        mapNodes(investigation[people]);
    }
    callback();
}

function mapNodes(events){

    for (var i = 0; i<events.length; i++){

        var node = events[i];
        var edge = events[i+1];
        if (graphDict.hasOwnProperty(node)){
            addEdges(node, edge, i, events.length);
        }else{
            addNode(node);
            addEdges(node, edge, i, events.length);
        }
    }
}

function addNode(v){
    graphDict[v] = []; //Initialize a vertex with empty edges
    graphDictArray.push(v);
}

function addEdges(node, edge, count, uBound){
    if (edge != undefined && count <= uBound){
        graphDict[node].push(edge);
    }
}


//This section follows the edges from the root and creates the path arrays
function findPaths() {
    while(graphDictArray.length != 0){
        var key = getNextKey();
        for(var i=0;i<graphDict[key].length; i++){
            if(touchedDict.seen.indexOf(key) == -1){
                pathDict.paths.push(startPath(key, i));
            }
        }
    }
}

function getNextKey(){
    //var localCount = count != null ? count : object.length;
    var key = graphDictArray.shift();
    if (validateKey(key, graphDict)) {
        return key;
    }
}

function validateKey(key, object){
   return object.hasOwnProperty(key);
}

function startPath(key, edgeCount) {
    var localPath = [];
    localPath.push(key);
    touchedDict.starts.push(key);
    followPath(graphDict[key][edgeCount], localPath);

    return localPath;
}


function followPath(edge, localPath, forks) {

    if(graphDict[edge] == null && forks == true){

        findPaths(graphDict);
    }

    localPath.push(edge);

    touchedDict.seen.push(edge);

    if (graphDict[edge] != null) {
        if (graphDict[edge].length > 0){
            var splits = true;
        }else{
            touchedDict.ends.push(edge);
        }
        for (var i = 0; i < graphDict[edge].length; i++) {
            if(touchedDict.seen.indexOf(graphDict[edge][i]) == -1 && i+1 <graphDict[edge].length){
                i++;
            }
            followPath(graphDict[edge][i], localPath, splits);
        }
    }
}
console.log(pathDict.paths);
//console.log(touchedDict);
//console.log(graphDict);
//console.log(graphDictArray);