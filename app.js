/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var investigation = getFile.processArgs(process);

//var pathDict = {paths:[]};

var graph = _.reduce(investigation, addToGraph, {});

function addToGraph(acc, witnessAccount) {

    // acc here is the graph we are producing, acc = accumulator
    var previousEvent;
    _.each(witnessAccount, addEvent);
    return acc;

    function addEvent(event) {
        //console.log(event);
        if (!_.has(acc, event)) {
            // add vertice
            acc[event] = [];
        }
        if (previousEvent) {
            // add edge
            acc[previousEvent].push(event);
        }
        previousEvent = event;
    }
}
var endpoints = startOrEnd(graph);



function startOrEnd(graph){
    var endpoints = {start:[], end:[]};
    for (var v in graph) {
       if(checkStart(v)){
           endpoints.start.push(v);
       }else if(graph[v].length == 0){
           endpoints.end.push(v);
       }
    }
    return endpoints;

    function checkStart(v){
        for (w in graph){
            if(_.contains(graph[w], v)){
                return false;
            }
        }
        return true;
    }
}
//////////////////////

//followPath(endpoints, graph);
//console.log();




function findBackwardPath(endpoints,graph){
    for(key in graph){

    }
}













//////////////////////////////////
followNewPath(endpoints, graph);

function followNewPath(endpoints, graph) {
    var paths = [];
    var seen = [];
    _.each(endpoints.start, function(start){
        seenPath = [];
        _.each(endpoints.end, function(end){
            //console.log(seen);
            visit(start, end, [], seen, graph);
            console.log(seenPath);
            //console.log(output);

            function visit(node, end, path, seen, graph){

                //seen = seen == undefined ? [] : seen;

                if (node === end){
                    // Target reached
                    path.push(node);
                    seenPath.push(seen);
                    paths.push(path);
                    return path;
                }

                //Mark the node
                seen.push(node);

                //Try all unmarked neighbors
                _.each(graph[node], addNode);
                function addNode(w){
                    if(!_.has(path, node)){
                        //add to path
                        //path.push(node);
                    }
                    if(!_.has(seen, w)){

                        path.push(w);
                        visit(w, end, path, seen, graph);
                    }
                }
            }
        });
    });

    return paths;
}


/////////////////////

//Other Stuff I was working on

//
//for (v in graph){
//    if (graph[v] == null){
//        endpoint.push(v);
//    }

//
//}


//console.log(visited.join(', '));

////This section follows the edges from the root and creates the path arrays
//function findPaths(graph) {
//    for (var v in graph){
//
//        for(var i=0;i<graph[v].length; i++){
//            if(touchedDict.seen.indexOf(v) == -1){
//                pathDict.paths.push(startPath(v, i));
//            }
//        }
//    }
//}
//
////function getNextKey(){
////    //var localCount = count != null ? count : object.length;
////    var key = graphDictArray.shift();
////    if (validateKey(key, graph)) {
////        return key;
////    }
////}
//
//function validateKey(key, object){
//   return object.hasOwnProperty(key);
//}
//
//function startPath(key, edgeCount) {
//    var localPath = [];
//    localPath.push(key);
//    touchedDict.starts.push(key);
//    followPath(graph[key][edgeCount], localPath);
//
//    return localPath;
//}
//
//
//function followPath(edge, localPath, forks) {
//
//    if(graph[edge] == null && forks == true){
//
//        findPaths(graph);
//    }
//
//    localPath.push(edge);
//
//    touchedDict.seen.push(edge);
//
//    if (graph[edge] != null) {
//        if (graph[edge].length > 0){
//            var splits = true;
//        }else{
//            touchedDict.ends.push(edge);
//        }
//        for (var i = 0; i < graph[edge].length; i++) {
//            if(touchedDict.seen.indexOf(graph[edge][i]) == -1 && i+1 <graph[edge].length){
//                i++;
//            }
//            followPath(graph[edge][i], localPath, splits);
//        }
//    }
//}


console.log(graph);
//console.log(pathDict.paths);
//console.log(touchedDict);
//console.log(graphDict);
//console.log(graphDictArray);
