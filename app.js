/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var addToGraph = require('./addToGraph').addToGraph;
var getStartAndEnd = require('./getStartsAndEnds').rootEnd;
var findAllPaths = require('./findAllPaths').findAllPaths;

var internal = exports.internal = {};
internal.investigation = getFile.processArgs(process);

//Build Graph
internal.graph = _.reduce(internal.investigation, addToGraph, {});

//Find start and end vertices
internal.path = getStartAndEnd(internal.graph);

internal.paths = [];
//Follow each start to each end
_.each(internal.path.start, function(start){
    _.each(internal.path.end, function(end){
        var out = findAllPaths(internal.graph, start, end, []);
        _.each(out, function(out){
            internal.paths.push(out);
        })
    })
});

console.log(internal.paths);






