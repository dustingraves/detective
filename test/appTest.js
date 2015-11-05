/**
 * Created by dusting on 11/3/15.
 */
var mock = require('mock');
var should = require('should');
var _ = require('underscore');

describe('app.js', function(){

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

        it('Should be an object with mapped values', function(done){
            app.internal.graph.graph.test1.should.eql(['test2']);
            app.internal.graph.graph.test2.should.eql(['test3']);
            app.internal.graph.graph.test3.should.eql([]);
            done();
        });
    });

    describe('internal.path', function(){

        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return [['test1','test2'],['test2','test3']];}
            }
        }, require);

        it('Should contain objects of arrays for starts and ends', function(done){
            app.internal.graph.should.have.property('start');
            app.internal.graph.should.have.property('end');
            done();
        });
    });

    describe('internal.out', function(){

        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return [['test1','test2'],['test2','test3']];}
            }
        }, require);

        it('Should output paths from start to end', function(done){
            app.internal.out.should.eql([[ 'test1', 'test2', 'test3' ]]);
            done();
        });
    });
});
