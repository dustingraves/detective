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

            // remove end node
            if(acc.graph[previousEvent] != "undefined" && acc.end.indexOf(previousEvent) != -1){
                acc.end.splice(acc.end.indexOf(previousEvent), 1)
            }

            //add end node
            if(acc.end.indexOf(event) === -1 && acc.seenE.indexOf(event) === -1){
                acc.end.push(event);
            }
        }

        if(!previousEvent && acc.seenS.indexOf(event) === -1){
            //add start node
            acc.start.push(event);
        }

        acc.seenE.push(event);
        acc.seenS.push(event);
        previousEvent = event;
    }
};


