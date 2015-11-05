/**
 * Created by dusting on 11/4/15.
 */
var _ = require('underscore');

var internal = exports.internal = {};

//Find all paths between start and end
exports.findAllPaths = function(graph, start, end, start_path){
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
            var newPath = exports.findAllPaths(graph, graph[start][i], end, locPath);

            _.each(newPath, function(n){
                paths.push(n);
            });
        }
    }

    for(var x=0;x<paths.length; x++){
        for (var y=0;y<paths.length; y++){
            if((_.difference(paths[x], paths[y]).length === 0 && x != y) ){
                paths.splice(x, 1);
            }
        }
    }
    return paths;
};
