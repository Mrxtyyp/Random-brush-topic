# Random-brush-topic
每日刷题小程序, 随机挑选拟定提纲里的题目，进行每日学习覆盖；
需要对应[前端面试资源](https://github.com/BigSharkLx/front-end-interview)来食用, front-end-interview文件夹下也有对应的资料

###  第一步
``` shell
yarn install | npm install
```

###  第二步
``` shell
yarn generate | npm run generate
```

执行完命令之后会在today-study下生成今日需要学习的目录


### 正确的打开方式
- 每日9点生成今日的学习目录
- 花空余时间完成解答
- 解答需用自己的话描述
- 解答完成之后对照原文档加深印象


### **支持自动提取标题**
1. 第一步，将需要提取的markdown放入到front-end-interview目录下
2. 第二步，执行 `yarn build` / `npm run build`
3. 第三步，更改`setting.ts`下的默认配置，默认是文件名对应每次生成的数量


### 简易配置 setting.ts 下面

``` javascript
  // 对应各模块的题目数量，可自行配置
export default {
    "1 前端面试准备": 3,
    "2 程序员面试软技能": 3,
    "3 offer收割机之HTML篇": 3,
    "4 offer收割机之CSS篇": 3,
    "5 offer收割机之JavaScript篇": 3,
    "6 offer收割机之性能优化篇": 3,
    "7 offer收割机之React篇": 3,
    "7 offer收割机之前端工程化篇": 3,
    "8 offer收割机之计算机网络篇": 3,
    "9 offer收割机之浏览器原理篇": 3,
    "10 offer收割机之手写代码篇": 3,
    "11 offer收割机之代码输出篇": 3,
    "12LeetCode面试常考题目": 1,
    "13 offer收割机之Vue篇": 3,
    "14 vue项目的性能优化": 3,
    "Webpack面试题": 3,
}
```