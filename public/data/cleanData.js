
const fs = require('fs');

let names = fs.readdirSync(__dirname);
names.forEach(checkfile)
console.log(names);
function checkfile(name) {
    let filePath = __dirname + '/' + name
    let stream = fs.createReadStream(filePath, { end: 37, autoClose: true })
    stream.on('data', d => {
        let str = d.toString();
        if (str === '<?xml version="1.0" encoding="UTF-8"?>') {
            stream.close()
            fs.unlinkSync(filePath)
        }
        console.log(d.toString())

    })
    stream.once('open', fd => {
        console.log(fd)
    })
}