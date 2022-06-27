# Random-brush-topic
每日刷题小程序, 随机挑选拟定提纲里的题目，进行每日学习覆盖；
需要对应[前端面试资源](https://github.com/BigSharkLx/front-end-interview)来食用, front-end-interview文件夹下也有对应的资料

###  第一步
> yarn instal / npm install

###  第二步
> yarn generate / npm run generate

执行完命令之后会在today-study下生成今日需要学习的目录

### 简易配置 setting.ts下面

``` javascript
  // 对应各模块的题目数量，可自行配置
export default {
    html: 3, 
    css: 3,
    javascript: 5,
    // 网络
    network: 3,
    // 浏览器
    browser: 3,
    // 手写
    handwritten: 3,
    vue: 4,
    webpack: 2
}
```

