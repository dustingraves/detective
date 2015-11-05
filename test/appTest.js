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

    describe('internal.out', function() {

        it('Should perform full merge', function (done) {
            var testArray = [['test1', 'test2'], ['test2', 'test3']];
            var app = mock('../app.js', {
                "../getFile.js": {
                    processArgs: function () {
                        return testArray;
                    }
                }
            }, require);

            app.internal.out.should.eql([['test1', 'test2', 'test3']]);
            done();
        });
    });

    describe('internal.paths', function(){
        it('Should perform full merge', function (done) {
            var testArray = [['test1', 'test2'], ['test2', 'test3']];
            var app = mock('../app.js', {
                "../getFile.js": {
                    processArgs: function () {
                        return testArray;
                    }
                }
            }, require);

            app.internal.out.should.eql([['test1', 'test2', 'test3']]);
            done();
        });
        it('Should perform partial merge', function(done){
            var testArray =[
                ["test1", "test9", "test3", "test4"],
                ["test1", "test8", "test3"]
            ];
            var app = mock('../app.js', {
                "../getFile.js":{
                    processArgs: function(){return testArray;}
                }
            }, require);
            app.internal.paths.should.eql([
                [ 'test1', 'test9', 'test3', 'test4' ],
                [ 'test1', 'test8', 'test3', 'test4' ]
            ]);
            done();
        });

        it('Should not merge on unique paths', function(done){
            var testArray =[
                ["test1", "test9", "test3"],
                ["test7", "test8", "test3"],
                ["test1", "test6"]
            ];
            var app = mock('../app.js', {
                "../getFile.js":{
                    processArgs: function(){return testArray;}
                }
            }, require);
            app.internal.paths.should.eql([
                ["test1", "test9", "test3"],
                ["test1", "test6"],
                ["test7", "test8", "test3"]
            ]);
            done();
        });
    });
});
