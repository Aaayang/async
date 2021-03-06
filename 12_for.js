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

const showColumnInfo = async () => {
    console.time("test");
    
    const names = ['feweekly', 'toolingtips'];
    // 串行
    for(const name of names) {
        const column = await getData(name);

        console.log(`Name: ${column.name}`);
        console.log(`Intro: ${column.intro}`);
    }

    console.timeEnd("test");
};


showColumnInfo();