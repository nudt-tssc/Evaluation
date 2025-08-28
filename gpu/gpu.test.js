// Define the points structure similar to the Python runner, mapping test names to [pass, total]
let points = {
    'gpu opt': [0]
};
// const { assert } = require('console');
// const fs = require('fs');  // 引入 fs 模块

// // 读取命令行传入的文件路径（在命令行中传入文件路径）
// const filePath = process.argv[2];  // 通过 process.argv 获取传入的文件路径

// // 读取文件内容
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error("读取文件时发生错误:", err);
//         return;
//     }

//     // 将文件内容传递给 judge 函数
//     let result = judge(data);
//     console.log("Judge function result:", result);  // 输出 judge 函数的返回值
// });
// // Base assertion utility function

// Main judge function
function myjudge(outputFile) {
    const hasPass = outputFile.includes("PASS");
    if (!hasPass) {
        return;
    }
    // 2. 提取 CPU OPT 的 GFLOPS 数字
    const match = outputFile.match(/GPU OPT:\s*[\d.]+\s*ms,\s*([\d.]+)\s*GFLOPS/);
    const gflops = match ? parseFloat(match[1]) : null;
    points['gpu opt'][0] = gflops;
}

function judge(outputFile){
    let start = outputFile.indexOf('start---gpu-opt');
    let end = outputFile.indexOf('end---gpu-opt', start);
    myjudge(outputFile.substring(start + 'start---gpu-opt'.length, end));
    return points;
} 

module.exports.judge = judge;
