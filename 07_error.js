const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json();// 返回promise
}

const showColumnInfo = async() => {
    // 串行的，第一个完请求第二个
    const feweekly = await getData('feweekly');
    const toolingtips = await getData('toolingtips');

    console.log(`NAME: ${feweekly.name}`);
    console.log(`INTRO: ${feweekly.intro}`);

    console.log(`NAME: ${toolingtips.name}`);
    console.log(`INTRO: ${toolingtips.intro}`);
};


showColumnInfo();