/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var investigation = getFile.processArgs(process);

var internal = exports.internal = {};

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

//Find starts and ends
var path = rootEnd();

function rootEnd(){
    var found = {start: [], end:[]};
    _.each(graph, function(e, v){
        if (e.length === 0){
            found.end.push(v);
        } else if (checkStart(v)){
            found.start.push(v);
        }
    });

    return found;

    function checkStart(v) {
        var start = true;
        _.each(graph, function(e){
            if(_.contains(e, v)){
                start = false;
            }
        });
        return start;
    }
}

//Find all paths between start and end
var findAllPaths = function(graph, start, end, path){
    path.push(start);
    console.log(path);
    if (start === end){
        return [path];
    }
    if (!graph.hasOwnProperty(start)){
        return [];
    }
    var paths = [];
    for (var i=0; i<graph[start].length; i++) {
        if (graph.hasOwnProperty(start) && path.indexOf(graph[start][i]) == -1){
            var newPaths = findAllPaths(graph, graph[start][i], end, path);
            for(var n=0; n<newPaths.length; n++){
                paths.push(newPaths[n]);
            }
        }

    }
    return paths;
};

console.log(findAllPaths(graph, path.start[0], path.end[0], []));
//console.log(graph);