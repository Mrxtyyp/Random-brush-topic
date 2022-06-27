import { books } from "./studyItem";
import setting from './setting'

import fs from 'fs'
import path from 'path'

let txt = ''

for(let i in books) {
    const length = books[i].length;
    const arr:number[] = randomNums(setting[i], 0, length - 1);
    txt += `${i} 需要学习以下：\n`
    for(let j in arr) {
        txt += `    ${books[i][arr[j]]}\n`
    }
}

writeFile(txt)

/**
 * 找到区间中的随机数n个
 * @param n 随机数数量
 * @param min 最小值
 * @param max 最大值
 * @returns 数组合集
 */
function randomNums(n:number, min:number, max:number):number[] {
    let arr:number[] = [];
    for (let i = 0; i < n; i++) {
        var ran = Math.ceil(Math.random() * (max - min) + min);
        while (isExist(arr, ran)) {
            ran = Math.ceil(Math.random() * (max - min) + min);
        }
        arr[i] = ran;
    }
    return arr;
}

/**
 * 判断数组是否重复
 * @param arr 
 * @param ran 
 * @returns boolean
 */
function isExist(arr:number[], ran:number): boolean {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == ran) {
            return true;
        }
    }
    return false;
}

// 生成今日.txt
function writeFile(value: string) {
    const dir = './src/today-study'
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    
    fs.writeFile(`${dir}/${getToday()}.txt`, value, err => {
        console.log(err);
        if(err) return
        console.log('生成好了，快去学习吧')
    });
}


function getToday() {   
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay()}`
}