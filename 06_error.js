const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    /* console.log({
        status: response.status
    }); */
    if(response.status !== 200) {
        // 需要自己打出的错误，非系统抛出的错误
        throw new Error(response.statusText);
    }
    return await response.json();// 返回promise
}

const showColumnInfo = async(id) => {
    try {
        // 可能发生错误的代码
        const column = await getData(id);
        console.log(`NAME: ${column.name}`);
        console.log(`INTRO: ${column.intro}`);
    } catch(err) {
        // 在错误发生时怎么处理
        console.log(err);
    }
};

showColumnInfo('feweekly111');
