// await后通常跟一个promise
async function main() {
    const number = await 888;
    // 仍正常使用
    console.log(number);
}
main();