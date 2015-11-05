var mock = require('mock');
var should = require('should');
var _ = require('underscore');

describe('findAllPaths.js', function(){
    describe('exports.findAllPaths()', function(){
        var testObject = {
            test1: [ 'test2' ],
            test2: [ 'test3' ],
            test3: []
        };
        var startEndObj = {
            start: ['test1'],
            end: ['test3']
        };
        var path = mock('../findAllPaths.js', {}, require);
        it('Should return all found paths', function(){
            path.findAllPaths(testObject, startEndObj.start[0], startEndObj.end[0], [])
                .should.eql([[ 'test1', 'test2', 'test3' ]]);
        });
        it('Should return path if start === end', function(){
            path.findAllPaths(testObject, startEndObj.end[0], startEndObj.end[0], [])
                .should.eql([[startEndObj.end[0]]]);
        });

        it('Should return if property does not exist', function(){
            path.findAllPaths(testObject, startEndObj.start[-1], startEndObj.end[0], [])
                .should.eql([]);
        });
    })
});