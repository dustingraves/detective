var fs = require('fs');

exports.processArgs = function (process)
{
    var filename = process.argv[2];

    if (process.argv.length < 3) {
        console.log('Usage: node ' + argv[1] + ' FILENAME');
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};