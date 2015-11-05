/**
 * Created by dusting on 11/4/15.
 */
var mock = require('mock');
var should = require('should');
var _ = require('underscore');

describe('addToGraph.js', function(){
    var testArray = [["test1","test2"],["test2","test3"]];
    var test = {};
    var testObj = {};
    var validate = { start: [ 'test1' ],
        end: [ 'test2' ],
        graph: { test1: [ 'test2' ], test2: [] },
        seenS: [ 'test1', 'test2' ],
        seenE: [ 'test1', 'test2' ] };

    beforeEach(function(){
        test = {};
        testObj =  {start:[],end:[],graph:{}, seenS: [], seenE:[]};
    });
    describe('exports.addToGraph()', function(){
        var graph = mock('../addToGraph.js', {}, require);
        it('Should return graph of multi-dimensional arrays', function(done){
            should(graph.addToGraph(testObj, testArray[0])).eql(validate);
            done();
        });
    });
});
