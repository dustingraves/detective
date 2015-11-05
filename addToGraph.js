/**
 * Created by dusting on 11/4/15.
 */
var _ = require('underscore');
var internal = exports.internal = {};

exports.addToGraph = function(acc, witnessAccount) {

    var previousEvent;
    _.each(witnessAccount, addEvent);
    return acc;

    function addEvent(event) {

        if (!_.has(acc.graph, event)) {
            // add vertice
            acc.graph[event] = [];
        }

        if (previousEvent) {
            // add edge
            acc.graph[previousEvent].push(event);
        }

        if(!previousEvent && acc.seenS.indexOf(event) === -1){
            //add start node
            acc.start.push(event);
        }

        if(!previousEvent && acc.seenE.length>0){
            //add end node
            acc.end.push(acc.seenE[acc.seenE.length-1]);
        }

        acc.seenE.push(event);
        acc.seenS.push(event);
        previousEvent = event;
    }
};


