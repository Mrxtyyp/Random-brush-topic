import fs from 'fs'

const dir = './src/front-end-interview'
const files = fs.readdirSync(dir);
const setting: {[key: string]: number} = {}
const studyItem: {[key: string]: string[]} = {}
files.forEach(file => {
    console.log(file);
    const fileData = fs.readFileSync(`${dir}/${file}`, {encoding: 'utf-8'});
    const fileKey = file.replace(/.md/, '');
    console.log(fileKey);
    console.log(fileData.toString());
    studyItem[fileKey] = matchTitle(fileData.toString())
    setting[fileKey] = studyItem[fileKey].length >=3 ? 3 : studyItem[fileKey].length
})
console.log(setting);
console.log(studyItem);

// 匹配到md的标题包含二级和三级,现在仅仅匹配二级三级标题
function matchTitle(str: string): string[] {
    str = str.replace(/前言(.*)[\r\n]$/g, '')
    const exg = /^[\r\n]##(.*)[\r\n]$/mg
    console.log(str.match(exg))
    const titleAll = str.match(exg);
    if(!titleAll) return [];
    // 当前二级标题
    let nowTwoTitle = '';
    const twoTitleExp = /^[\r\n]##( .*)[\r\n]$/;
    const twoTitleReplaceExp1 = /[、/.](.*)[\r\n]$/
    const twoTitleReplaceExp2 = /^[\r\n]##( )/
    const threeTitleExp = /^[\r\n]###( .*)[\r\n]$/;
    let titleArr = [];
    for(let i = 0; i < titleAll.length; i++) {
        // ## 两级标题
        if(twoTitleExp.test(titleAll[i])) {
            if(twoTitleExp.test(titleAll[i + 1]) || i === titleAll.length -1) {
                const ti = titleAll[i].replace(/[\r\n]/g, '').replace(/##( )/, '')
                titleArr.push(ti);
                continue;
            }
            nowTwoTitle = titleAll[i].replace(twoTitleReplaceExp1, '').replace(twoTitleReplaceExp2, '');
            continue;
        }
        if(threeTitleExp.test(titleAll[i])) {
            const ti = titleAll[i].replace(/[\r\n]/g, '').replace(/^###( )/, '')
            titleArr.push(nowTwoTitle + ' - ' + ti)
        }
    }
    return titleArr;
}
