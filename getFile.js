var fs = require('fs');

exports.processArgs = function (process)
{
    var filename = process.argv[2];

    if (process.argv.length < 3) {
        console.log('Usage: node ' + argv[1] + ' FILENAME');
        process.exit(1);
    }
    //console.log(process.cwd());

    try{
        var output = fs.readFileSync(filename, 'utf-8');
    }
    catch(ex){
        throw ('Cannot open file: '+filename+", "+ex);
    }
    return JSON.parse(output);
};