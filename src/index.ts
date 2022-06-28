import { books } from "./studyItem";
import setting from "./setting";

import fs from "fs";
import { getToday, randomNums } from "./utils";

let txt = "";

for (let i in books) {
  const length = books[i].length;
  const arr: number[] = randomNums(setting[i], 0, length - 1);
  txt += `${i} 需要学习以下：\n`;
  for (let j in arr) {
    txt += `    ${books[i][arr[j]]}\n    答案：\r`;
  }
}

writeFile(txt);

// 生成今日.txt
function writeFile(value: string) {
  const dir = "./src/today-study";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(`${dir}/${getToday()}.txt`, value, (err) => {
    // console.log(err);
    if (err) return;
    console.log(
      "生成好了，快去学习吧; 尽量用自己的话去组织语言，加油你是最胖的"
    );
  });
}
