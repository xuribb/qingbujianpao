# 青步健跑 微信小程序原生开发

## 后端代码地址：

<https://github.com/xuribb/qingbujianpao_back>


## 项目简介：

1. 采用微信小程序原生开发，并没有使用市面上流行的uniapp开发。作者自己的理由是：本程序只在微信端运行，没有跨端的需求，其次开发过程中不用看两套开发文档(微信/uniapp)，开发过程的感受是很重要的，心理上没有那么累。

2. 小程序后端采用ThinkPHP + MongoDB的方式开发。MongoDB作为文档型非关系数据库很适合用来存储用户的运动记录。使用微信提供的openid做为用户唯一标识。

3. 本程序使用的第三方接口:【和风天气API】


## 项目配置

1. `app.js` 中配置 `globalData.domain` 为自己后端域名。
    - 请使用https
    - 请在微信公众平台配置此域名

2. 微信公众平台请完成startLocationUpdateBackground接口相关的API申请


## 欢迎评论留言，提建议~