---
title: 更新hexo8.0遇到的问题
tags: [随笔]
date: 2026-01-17 16:18:50
---
hexo的版本很长时间没有更新了，最近更新了一次，将hexo的版本由6.3.0更新到8.1.1。
在此记录一下遇到的问题。

**1.配置文件_config.yml中的更改**
对_config.yml进行了比较，只发现了这一个变化。
代码高亮部分：highlight

hexo6.3.0版本
```yml
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ''
```

hexo8.1.1版本
```yml
syntax_highlighter: highlight.js
highlight:
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  preprocess: true
  line_number: true
  tab_replace: ''
```
这个没啥可说的，直接切换成新版就行了。

**2.hexo-renderer-marked的版本由3.0.0更新到7.0.1**
不记得之前更新hexo是否同步更新了hexo依赖的插件，目前这个插件更新出现了问题。
我在配置文件 _config.yml 设置 post_asset_folder: true。
hexo-renderer-marked 更新后，发现图片的引用出现了问题。
我使用的是下面的方式导入图片：
```
![1](1.jpg)
```
更新后发现这种方式引用的图片均不能访问，图片链接直接指向站点的根目录，导致图片资源无法访问。
这个问题在hexo文档里有说明：hexo-renderer-marked 3.1.0 引入了一个新的选项，其允许你无需使用 asset_img 标签插件就可以在 markdown 中嵌入图片
如需启用：
```yml
_config.yml

post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```
启用后，资源图片将会被自动解析为其对应文章的路径。 例如： `image.jpg` 位置为 `/2020/01/02/foo/image.jpg` ，这表示它是 `/2020/01/02/foo/` 文章的一张资源图片， `![](image.jpg)` 将会被解析为 `<img src="/2020/01/02/foo/image.jpg">` 。
看了一下设定，最新版本postAsset的设定默认值为false，因此导致图片失效了。