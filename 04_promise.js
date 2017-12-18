const fetch = require('node-fetch');

const getData = async (id) => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json();// 返回promise
}

(async () => {
    // 顶级作用于使用await是非法的，所以包起来
    const column = await getData('feweekly');
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
})() ;