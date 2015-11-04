/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var investigation = getFile.processArgs(process);
var addToGraph = require('./addToGraph').addToGraph;
var getStartAndEnd = require('./getStartsAndEnds').rootEnd;
var findAllPaths = require('./findAllPaths').findAllPaths;

var internal = exports.internal = {};

//Build Graph
var graph = _.reduce(investigation, addToGraph, {});

//Find start and end vertices
var path = getStartAndEnd(graph);

paths = [];
//Follow each start to each end
_.each(path.start, function(start){
    _.each(path.end, function(end){
        var out = findAllPaths(graph, start, end, []);
        _.each(out, function(out){
            paths.push(out);
        })
    })
});

console.log(paths);






