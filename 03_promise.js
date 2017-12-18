const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json();// 返回promise
}

getData('feweekly')
    .then(column => {
        console.log(`NAME: ${column.name}`);
        console.log(`INTRO: ${column.intro}`);
    });