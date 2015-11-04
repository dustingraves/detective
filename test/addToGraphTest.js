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
    beforeEach(function(){
        test = {};
        testObj = {};
    });
    describe('#addToGraph', function(){
        var graph = mock('../addToGraph.js', {}, require);
        it('Should return graph of multi-dimensional arrays', function(done){
            should(graph.addToGraph(testObj, testArray[0])).eql({ test1: [ 'test2' ], test2:[] });
            done();
        });

        it('Should call internal.addEvent', function(){
            graph.internal.addEvent = function(){test.calledAddEvent = true};
            graph.addToGraph(testObj, testArray[0]);
            test.calledAddEvent.should.be.true();
        });
    });
});