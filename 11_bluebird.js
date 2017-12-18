const bluebird = require('bluebird');

async function main() {
    console.log('start');
    // 延迟2秒
    await bluebird.delay(2000);
    console.log('end');
}
main();