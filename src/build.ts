import fs from 'fs'
import { matchTitle, fileWithExtCompare } from './utils'

const dir = './src/front-end-interview'
const files = fs.readdirSync(dir);
const setting: {[key: string]: number} = {}
const studyItem: {[key: string]: string[]} = {}
console.log(files);
files.sort((a,b) => fileWithExtCompare(a,b))
files.forEach(file => {
    const fileData = fs.readFileSync(`${dir}/${file}`, {encoding: 'utf-8'});
    const fileKey = file.replace(/.md/, '');
    studyItem[fileKey] = matchTitle(fileData.toString())
    setting[fileKey] = studyItem[fileKey].length >=3 ? 3 : studyItem[fileKey].length
})

// console.log(setting);
// console.log(studyItem);

fs.writeFile('./src/setting.ts', `
// 对应各模块的题目数量，可自行配置
export default ${JSON.stringify(setting)}
`, (err) => {
    if(err) return
    console.log('setting 随机数量配置已填充')
})

fs.writeFile('./src/studyItem.ts', `
export const books: { [key: string]: string[] } = ${JSON.stringify(studyItem)}
`, (err) => {
    if(err) return
    console.log('studyItem 目录信息已填充')
})

// 14 vue项目的性能优化  Webpack面试题 7 offer收割机之前端工程化篇
// console.log(matchTitle(fs.readFileSync(`${dir}/7 offer收割机之前端工程化篇.md`, {encoding: 'utf-8'}).toString()))