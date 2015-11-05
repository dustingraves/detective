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
    describe('exports.addToGraph()', function(){
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

    describe('internal.addEvent()', function(){
        var graph = mock('../addToGraph.js', {}, require);
        it('Should add event if it does not exist in acc object', function(){
            graph.internal.acc = {};
            graph.internal.addEvent('test1');
            graph.internal.acc.should.have.property('test1');
        });

        it('Should set previousEvent value', function(){
            graph.internal.previousEvent = null;
            graph.internal.addEvent('test2');
            graph.internal.previousEvent.should.eql('test2');
        });

        it('Should add event as edge if previousEvent exists', function(){
            graph.internal.acc = {test1:[]};
            graph.internal.previousEvent = 'test1';
            graph.internal.addEvent('test2');
            graph.internal.acc.test1.should.eql(['test2']);
        });

    });
});
