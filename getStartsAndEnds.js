/**
 * Created by dusting on 11/4/15.
 */
var _ = require('underscore');

var internal = exports.internal = {};

//Find starts and ends
exports.rootEnd = function(graph){
    internal.graph = graph;
    var found = {start: [], end:[]};
    _.each(internal.graph, function(e, v){
        if (e.length === 0){
            found.end.push(v);
        } else if (internal.checkStart(v)){
            found.start.push(v);
        }
    });

    return found;
};

internal.checkStart = function(v) {
    var start = true;
    _.each(internal.graph, function(e){
        if(_.contains(e, v)){
            start = false;
        }
    });
    return start;
};
