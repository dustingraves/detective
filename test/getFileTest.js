/**
 * Created by dusting on 11/3/15.
 */
var mock = require('mock');
var should = require('should');
var fsReal = require('fs');


describe('getFile.js', function(){

    describe('#processArgs', function(){

        var test = {};
        var getFile = mock('../getFile.js', {}, require);
        var fakeProcess = process;
        var testArray = [["test1","test2"],["test2","test3"]];

        it('Should return file contents', function(done){
            fakeProcess.argv = [ 'node', 'app.js', 'test/samples/test.json' ];
            var testOut = getFile.processArgs(fakeProcess);
            testOut.should.eql(testArray);
            done();
        });

        it('Should fail if file does not exist', function(){
            fakeProcess.argv = [ 'node', 'app.js', 'test/samples/FAIL.json' ];
            (function(){getFile.processArgs(fakeProcess)}).should.throw();
        })
    });
});
