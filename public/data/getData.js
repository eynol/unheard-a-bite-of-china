const json = require('./china.json');
const fs = require('fs');
const https = require('https');


// 更新省份数据
// (async () => {
//     for await (let i of json.features) {
//        let adcode = i.properties.adcode;
//        await download(adcode)
//         // console.log(i)
//     }
//     // console.log(json.features)
// })()

const download = (adcode) => new Promise(resolve => {
    https.request(`https://geo.datav.aliyun.com/areas/bound/${adcode}_full.json`)
        .on('response', resp => {
            resp.pipe(fs.createWriteStream(__dirname + '/' + adcode + '.json'))
            resp.on('end', resolve)
        })
        .end()
});

// 更新城市数据
(async () => {
    for await (let i of json.features) {
        let adcode = i.properties.adcode;
        const file = await fs.promises.readFile(__dirname + '/' + adcode + '.json')
        const json = JSON.parse(file.toString());

        for await (let j of json.features) {
            let adcode = j.properties.adcode;
            await download(adcode)
            // console.log(adcode)
        }

        console.log(i)
    }
    // console.log(json.features)
})()