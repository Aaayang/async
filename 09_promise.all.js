const fetch = require('node-fetch');

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

async function getData(id) {
    await sleep(2000);

    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json();// 返回promise
}

const showColumnInfo = async() => {
    // 并行
    const [feweekly, toolingtips] = await Promise.all([
        getData('feweekly'),
        getData('toolingtips')
    ]);
    
    console.log(`NAME: ${feweekly.name}`);
    console.log(`INTRO: ${feweekly.intro}`);

    console.log(`NAME: ${toolingtips.name}`);
    console.log(`INTRO: ${toolingtips.intro}`);
};


showColumnInfo();