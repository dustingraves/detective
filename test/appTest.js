/**
 * Created by dusting on 11/3/15.
 */
var mock = require('mock');
var should = require('should');
var _ = require('underscore');

describe('app.js', function(){
    var testObject = {
        test1: [ 'test2' ],
        test2: [ 'test3' ],
        test3: []
    };
    var testArray = [["test1","test2"],["test2","test3"]];

    describe('internal.investigation', function(){
        var app = mock('../app.js', {
            "../getFile.js":{processArgs: function(){return testArray;}}
        }, require);

        it('Should equal output of getFile', function(done){
            app.internal.investigation.should.eql(testArray);
            done();
        });
    });

    describe('internal.graph', function(){

        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return testArray;}
            }
        }, require);

        it('Should be an object with mapped values', function(){
            app.internal.graph.test1.should.eql(['test2']);
            app.internal.graph.test2.should.eql(['test3']);
            app.internal.graph.test3.should.eql([]);
        });
    });

    describe('internal.path', function(){

        var startEndObj = {
            start: ['test1'],
            end: ['test3']
        };

        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return [['test1','test2'],['test2','test3']];}
            },
            "../getStartsAndEnds.js":{
                rootEnd: function(){return startEndObj;}
            }
        }, require);

        it('Should contain objects of arrays for starts and ends', function(done){
            app.internal.path.should.eql(startEndObj);
            app.internal.path.should.have.property('start');
            app.internal.path.should.have.property('end');
            done();
        });
    });

    describe('internal.out', function(){

        var startEndObj = {
            start: ['test1'],
            end: ['test3']
        };

        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return [['test1','test2'],['test2','test3']];}
            },
            "../getStartsAndEnds.js":{
                rootEnd: function(){return startEndObj;}
            }
        }, require);

        it('Should output paths from start to end', function(done){
            app.internal.out.should.eql([[ 'test1', 'test2', 'test3' ]]);
            done();
        });
    });
});
