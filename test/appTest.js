/**
 * Created by dusting on 11/3/15.
 */
var mock = require('mock');
var should = require('should');
var _ = require('underscore');

describe('app.js', function(){

    describe('internal.investigation', function(){
        var app = mock('../app.js', {
            "../getFile.js":{processArgs: function(){return [['test1','test2'],['test2','test3']];}}
        }, require);
        it('Should equal output of getFile', function(){
            app.internal.investigation.should.eql([['test1','test2'],['test2','test3']]);
        });
    });
    describe('internal.graph', function(){
        var app = mock('../app.js', {
            "../getFile.js":{
                processArgs: function(){return [['test1','test2'],['test2','test3']];}
            }
        }, require);
        it('Should be an object with mapped values', function(){
            app.internal.graph.test1.should.eql(['test2']);
            app.internal.graph.test2.should.eql(['test3']);
            app.internal.graph.test3.should.eql([]);
        });
    });
});