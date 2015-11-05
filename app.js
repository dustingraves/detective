/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var addToGraph = require('./addToGraph').addToGraph;
var findAllPaths = require('./findAllPaths').findAllPaths;

var internal = exports.internal = {};
internal.investigation = getFile.processArgs(process);

//Build Graph
internal.graph = _.reduce(internal.investigation, addToGraph, {start:[],end:[],graph:{}, seenS: [], seenE:[]});

internal.paths = [];

//Follow each start to each end
_.each(internal.graph.start, function(start){
    _.each(internal.graph.end, function(end){
        internal.out = findAllPaths(internal.graph.graph, start, end, []);
        _.each(internal.out, function(out){
            internal.paths.push(out);
        })
    })
});

console.log(internal.paths);
