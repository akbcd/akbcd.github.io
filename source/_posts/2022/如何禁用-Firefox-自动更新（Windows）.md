---
title: 如何禁用 Firefox 自动更新（Windows）
date: 2022-07-23 20:32:18
tags: [教程]
categories: [笔记]
---
网上查询了一下，共有三个方法：
1.使用禁用更新策略
2.修改 `channel-prefs.js` ，亲测无效
3.勾选不更新，新版本已不再提供此选项
<!--more-->
本篇文章主要教大家如何使用禁用更新策略禁用 FireFox 自动更新（Windows）

1. 进入 Firefox 安装根目录：右键浏览器快捷方式，打开文件所在位置
2. 在 Firefox 安装根目录新建 distribution 文件夹，在文件夹中新建一个txt文档
3. 在txt文档中编写如下代码：
```
{
    "policies": {
        "DisableAppUpdate": true
    }
}
```
4. 将txt文档重命名为 `policies.json` 格式并保存。
5. 重启火狐浏览器，设置》Firefox 更新，显示：更新已被系统管理员禁用。