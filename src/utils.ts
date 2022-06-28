/**
 * 找到区间中的随机数n个
 * @param n 随机数数量
 * @param min 最小值
 * @param max 最大值
 * @returns 数组合集
 */
export function randomNums(n: number, min: number, max: number): number[] {
  let arr: number[] = [];
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
function isExist(arr: number[], ran: number): boolean {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == ran) {
      return true;
    }
  }
  return false;
}

export function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

// 匹配到md的标题包含二级和三级,现在仅仅匹配二级三级标题
export function matchTitle(str: string): string[] {
  console.log(str.substring(100, 1000));
  // 把带前言文案行的删除
  str = str
    .replace(/^(\n)+?#{4,6}(.*)[\r\n]$/gm, "")
    .replace(/^(\n)+?|(.*)(前言)(.*)[\r\n]$/gm, "");
  // const exg = /^([\r\n]?)##(.*)[\r\n]$/mg
  const exg = /^(#{2,3})(.*)[\r\n]/gm;
  const titleAll = str.match(exg);
  //   console.log(titleAll);
  if (!titleAll) return [];
  // 当前二级标题
  let nowTwoTitle = "";
  let twoTitle = "";
  const twoTitleReplaceExp1 = /[、/.](.*)[\r\n]$/;
  const twoTitleReplaceExp2 = /^[\r\n]##(\s)/;
  const threeTitleExp = /^([\r\n]###)|(###)(\s.*)[\r\n]$/;
  let titleArr = [];
  for (let i = 0; i < titleAll.length; i++) {
    // ## 两级标题
    if (!threeTitleExp.test(titleAll[i])) {
      // 如果下一级是二级标题并且最后一列
      if (!threeTitleExp.test(titleAll[i + 1]) || i === titleAll.length - 1) {
        const ti = titleAll[i].replace(/[\r\n]/g, "").replace(/##( )/, "");
        titleArr.push(ti);
        continue;
      }
      // 下一级是三级标题
      if (threeTitleExp.test(titleAll[i + 1])) {
        // 匹配中文和中文标点符号
        const mts = titleAll[i].match(
          /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)(a-zA-Z\d)]+/g
        );
        twoTitle = mts ? mts.join("") : "";
      }
      nowTwoTitle = titleAll[i]
        .replace(twoTitleReplaceExp1, "")
        .replace(twoTitleReplaceExp2, "");
      continue;
    }
    if (threeTitleExp.test(titleAll[i])) {
      const ti = titleAll[i].replace(/[\r\n]/g, "").replace(/^###( )/, "");
      if (twoTitle) {
        titleArr.push(twoTitle + " - " + ti);
      } else {
        titleArr.push(nowTwoTitle + " - " + ti);
      }
    }
  }
  return titleArr;
}

// 找到公共字符串
export function findSameStr(str1: string, str2: string) {
  const plants1 = str1.split("");
  const plants2 = str2.split("");
  return [...new Set(plants1)].filter((item) => plants2.includes(item));
}

function isChCode(chCode) {
  var re = /^[\u4e00-\u9fa5]/;
  var as = "" + chCode;
  return re.test(as);
}

//比较没有后缀的文件名
function fileNoExtCompare(a, b) {
  // 特殊字符判定
  var specialChars = "!#$%^~()-+=-";
  var firstCharA = a.charAt(0);
  var firstCharB = b.charAt(0);
  var spA = specialChars.indexOf(firstCharA);
  var spB = specialChars.indexOf(firstCharB);
  if (spA != spB) {
    return spA >= 0 ? -1 : 1;
  }
  if (spA >= 0 && spB >= 0) {
    if (firstCharA != firstCharB) {
      return firstCharB - firstCharA;
    } else {
      return fileNoExtCompare(a.substring(1), b.substring(1));
    }
  }
  //判定比较内容是不是数值
  var nA = parseInt(a);
  var nB = parseInt(b);
  if (!isNaN(nA) && !isNaN(nB)) {
    return nA - nB;
  }

  if (firstCharA == firstCharB) {
    return fileNoExtCompare(a.substring(1), b.substring(1));
  }

  var isChFirstA = isChCode(firstCharA);
  var isChFirstB = isChCode(firstCharB);
  if (isChFirstA != isChFirstB) {
    return isChFirstA ? 1 : -1;
  }

  var aa = "1" + firstCharA;
  var bb = "1" + firstCharB;

  //return a.localeCompare(b);
  return aa.localeCompare(bb, "zh-CN");
}

export function fileWithExtCompare(a, b) {
  var onlyNameA = a.substring(0, a.lastIndexOf("."));
  var onlyNameB = b.substring(0, b.lastIndexOf("."));
  var result = fileNoExtCompare(onlyNameA, onlyNameB);
  if (result != 0) {
    return result;
  }
}

// test 文件名排序
// const arr = [
//   "1 前端面试准备.md",
//   "10 offer收割机之手写代码篇.md",
//   "11 offer收割机之代码输出篇.md",
//   "12LeetCode面试常考题目.md",
//   "13 offer收割机之Vue篇.md",
//   "14 vue项目的性能优化.md",
//   "2 程序员面试软技能.md",
//   "3 offer收割机之HTML篇.md",
//   "4 offer收割机之CSS篇.md",
//   "5 offer收割机之JavaScript篇.md",
//   "6 offer收割机之性能优化篇.md",
//   "7 offer收割机之React篇.md",
//   "7 offer收割机之前端工程化篇.md",
//   "8 offer收割机之计算机网络篇.md",
//   "9 offer收割机之浏览器原理篇.md",
//   "Webpack面试题.md",
// ];
// arr.sort(function (a, b) {
//   return fileWithExtCompare(a, b);
// });
// console.log(arr);
