var _ = require('underscore');
var internal = exports.internal = {};

exports.addToGraph = function(acc, witnessAccount) {
    internal.previousEvent = null;
    internal.acc = acc;
    _.each(witnessAccount, internal.addEvent);
    return acc;


};

internal.addEvent = function(event) {
    if (!_.has(internal.acc, event)) {
        // add vertice
        internal.acc[event] = [];

    }
    if (internal.previousEvent) {
        // add edge
        internal.acc[internal.previousEvent].push(event);
    }
    internal.previousEvent = event;
}