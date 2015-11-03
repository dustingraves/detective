/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var investigation = getFile.processArgs(process);

//var internal = exports.internal = {};

//Build Graph
var graph = _.reduce(investigation, addToGraph, {});

//Find start and end vertices
var path = rootEnd();

//Follow each start to each end
_.each(path.start, function(start){
    _.each(path.end, function(end){
        console.log(findAllPaths(graph, start, end, []));
    })
});


function addToGraph(acc, witnessAccount) {
    var previousEvent;
    _.each(witnessAccount, addEvent);
    return acc;

    function addEvent(event) {
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
function findAllPaths(graph, start, end, start_path){
    var locPath = start_path.slice();
    locPath.push(start);
    if (start === end){
        return [locPath];
    }
    if (!graph.hasOwnProperty(start)){
        return [];
    }
    var paths = [];
    for (var i = 0; i < graph[start].length; i++) {
        if (!_.contains(locPath, graph[start][i])) {
            var newPath = findAllPaths(graph, graph[start][i], end, locPath);
            for (var n = 0; n < newPath.length; n++) {
                paths.push(newPath[n]);
            }
        }
    }
    return paths;
};