
const fs = require('fs');


var save = function(path, base) {
    var buffer = new Buffer(base, 'base64');
    console.log(buffer.toString('binary'));
    fs.writeFileSync(path, buffer.toString('binary'), {encoding: 'binary'});
}

module.exports.saveto = save;
