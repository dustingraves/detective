/**
 * Created by dusting on 10/26/15.
 */
var getFile = require('./getFile');
var _ = require('underscore');
var addToGraph = require('./addToGraph').addToGraph;
var findAllPaths = require('./findAllPaths').findAllPaths;

var int = exports.internal = {};
int.investigation = getFile.processArgs(process);

//Build Graph
int.graph = _.reduce(int.investigation, addToGraph, {start:[],end:[],graph:{}, seenS: [], seenE:[]});
int.graph.end = _.keys(_.pick(int.graph.graph, function(value) { return _.isEmpty(value); }));

int.paths = [];

//Follow each start to each end
_.each(int.graph.start, function(start){
    _.each(int.graph.end, function(end){
        int.out = findAllPaths(int.graph.graph, start, end, []);
        _.each(int.out, function(out){
            int.paths.push(out);
        })
    })
});

console.log(int.paths);
