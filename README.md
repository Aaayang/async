
# async/await

## fetch

``` javascript
const fetch = require('node-fetch');

function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(column => {
            console.log(`NAME: ${column.name}`);
            console.log(`INTRO: ${column.intro}`);
        });
}

getData('feweekly');
```

## async

``` javascript
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    // await后跟的是一个promise
    const response = await fetch(url);
    const column = await response.json();
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
}

getData('feweekly');
```

## 直接调用函数返回的promise

``` javascript
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    // 返回一个promise，这里的await没有必要，因为本身response.json()返回的就是一个promise
    return await response.json();
}

getData('feweekly').then(column => {
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
});
```

## 接收函数返回的promise

``` javascript
const fetch = require('node-fetch');

const getData = async (id) => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    // 返回一个promise
    return await response.json();
}

(async () => {
    // 顶级作用域使用await是非法的，所以包起来
    const column = await getData('feweekly');
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
})();
```

## class中使用async

``` javascript
const fetch = require('node-fetch');

class APIClient {
    async getColumn(id) {
        const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
        const response = await fetch(url);
        // 返回一个promise
        return await response.json();
    }
}

(async () => {
    const client = new APIClient();

    // 顶级作用域使用await是非法的，所以包起来
    const column = await client.getColumn('feweekly');
    console.log(`NAME: ${column.name}`);
    console.log(`INTRO: ${column.intro}`);
})();
```

## 错误处理

``` javascript
// 好像和异步没啥关系
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    if(response.status !== 200) {
        throw new Error(response.statusText);
    }
    // 返回一个promise
    return await response.json();
}

// 顶级作用域使用await是非法的，所以...
const showColumnInfo = async (id) => {
    try {
        // 可能发生错误的代码
        const column = await getData(id);
        console.log(`NAME: ${column.name}`);
        console.log(`INTRO: ${column.intro}`);
    } catch(err) {
        // 发生错误时怎么处理
        console.log(err);
    }
    // 错误处理我后面的代码照样执行喔😯
    console.log("test...")
};

showColumnInfo('feweekly1');
```

## 串行的

``` javascript
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    // 返回一个promise
    return await response.json();
}

const showColumnInfo = async () => {
    console.time("test");
    // 串行的，第一个请求完再请求第二个
    const feweekly = await getData("feweekly");
    const toolingtips = await getData('toolingtips');

    console.log(`NAME: ${feweekly.name}`);
    console.log(`INTRO: ${feweekly.intro}`);

    console.log(`NAME: ${toolingtips.name}`);
    console.log(`INTRO: ${toolingtips.intro}`);
    console.timeEnd("test");
};

showColumnInfo();
```

## 并行的

``` javascript
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    // 返回一个promise
    return await response.json();
}

const showColumnInfo = async () => {
    console.time("test");
    // 并行的，一起出来，速度并没有比串行的快
    const feweeklyPromise = getData("feweekly");
    const toolingtipsPromise = getData('toolingtips');

    const feweekly = await feweeklyPromise;
    const toolingtips = await toolingtipsPromise;

    console.log(`NAME: ${feweekly.name}`);
    console.log(`INTRO: ${feweekly.intro}`);

    console.log(`NAME: ${toolingtips.name}`);
    console.log(`INTRO: ${toolingtips.intro}`);
    console.timeEnd("test");
};

showColumnInfo();
```

## Promise.all

``` javascript
// 并行的另一种书写️✍️方式
const fetch = require('node-fetch');

async function getData(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json();// 返回promise
}

const showColumnInfo = async () => {
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
```

## 睡眠函数

``` javascript
const fetch = require('node-fetch');

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

async function getData() {
    await sleep(2000);

    console.log('sleep...');
}

getData();
```

## await

``` javascript
// await后通常跟一个promise
async function main() {
    const number = await 888;
    // 不跟也能正常使用
    console.log(number);
}
main();
```

## bluebird

``` javascript
const bluebird = require('bluebird');

async function main() {
    console.log('start');
    await bluebird.delay(2000);
    console.log('end');
}

main();
```

## 串行的另一种写法

``` javascript
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
    for (const name of names) {
        const column = await getData(name);

        console.log(`Name: ${column.name}`);
        console.log(`Intro: ${column.intro}`);
    }

    console.timeEnd("test");
};

showColumnInfo();
```

## 并行的另一种写法

``` javascript
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
    const promises = names.map(x => getData(x));
    // 并行
    for (const promise of promises) {
        const column = await promise;

        console.log(`Name: ${column.name}`);
        console.log(`Intro: ${column.intro}`);
    }

    console.timeEnd("test");
};

showColumnInfo();
```
