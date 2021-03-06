---
title: Hexo引用本地图片、音乐、视频
date: 2019-03-11 19:55:52
tags: 博客
---
## hexo引用本地图片
想必大家都知道怎么用markdown语法显示图片吧，我经常用的是先把图片先上传到图床，然后用图床给的地址在文章中显示图片
缺点：图床不是太稳定，有时上传的图片会消失
优点：图片在文章中加载速度很快
优缺点均是相对于我要说的方法
<!--more-->
接下来介绍标题所说的方法：
### 说明
- 本教程不适用于主页中显示图片，本地引用的图片只能在引用文章的详细页显示（在主页中的文章简介中不能显示）
- 如果想在主页中也显示引用的图片，读者可以自行尝试他人经验：[Hexo中添加本地图片](https://www.cnblogs.com/codehome/p/8428738.html)
### 设置
1.  把主页配置文件_config.yml 里的post_asset_folder:这个选项设置为true（如果设置为false，即使本地有相应的文件夹，本地引用也会失效）
![](http://wx3.sinaimg.cn/mw690/0060lm7Tly1g0z4derc84j30ks0ab75z.jpg)
2. 新建博客文章运行hexo n "text"来生成md博文时，/source/_posts文件夹内除了text.md文件还有一个同名的文件夹
![](http://wx2.sinaimg.cn/mw690/0060lm7Tly1g0z4lvjw8lj30a003rq2w.jpg)
3. 最后在text.md中引入图片时，先把图片复制到text这个文件夹中，然后只需要在text.md中按照markdown的格式引入图片：
`![你想输入的替代文字](图片名.扩展名)`
4. `hexo s`可以发现，图片已成功显示，控制台可以看到html标签内的语句是`<img src="图片名.扩展名">`。
---
### 优缺点分析
**优点：**
1. 博客备份时直接就将图片备份到了GitHub（如果你的博客有备份）
2. 避免了图床不稳定而造成的图片无法显示问题
3. 主页配置文件_config.yml 里的post_asset_folder:这个选项设置为true是为了让系统自动创建文件，如果不需要，可以将其改回，改回后本地引用的图片自动失效
记得修改主页配置文件_config.yml后一定要重启服务，如果发现引用的图片没有失效，运行`hexo clean`后再启动服务你就会发现是否会失效了
4. 一张图片的大小如果不超过100kb，在一篇文章中可以多引用几张，载入速度还可以。图片越小，载入速度越快。
---
**缺点：**
1. 如果图片大小过大，载入图片需要很长的时间
2. 不能本地自定义一个存图片的文件夹，图片只能放在生成的文件夹中，在相应的.md文件中引用，可以尝试下载上传本地图片的插件进行解决，自己没有尝试（参照[Hexo中添加本地图片](https://www.cnblogs.com/codehome/p/8428738.html)的第二种方法）
3. 在text.md文件中引入图片时，是可以看到网页图片引入的路径始终是`text/图片名.扩展名`,尝试`../text/图片名.扩展名`，本以为可以退出text去自定义文件夹，但是直接失败（依然是参看[Hexo中添加本地图片](https://www.cnblogs.com/codehome/p/8428738.html)的第二种方法）
4. 如果引用图片大小过大，比如说现在手机拍摄的照片，一张5MB左右大小，一篇文章引用图片数量最好不要多余五张，超过这些数目，图片是无法显示出来的，而且能显示出来的图片载入的过程也很慢。图片很大，而且不是什么特殊图片，建议使用图床。
## hexo引用本地音乐
废话不说，直接看代码
```html
<audio src="音乐.mp3" controls></audio>
```
在markdown语法中直接写就行，支持audio标签 controls必须加，不然浏览器显示不出播放器
以上方法并不唯一，亲测有效
**优缺点分析**同上
## hexo引用本地视频
代码
```html
<video width="100%" height="100%" src="视频.mp4" controls="controls"></video>
```
在这里详细讲解一下video标签
完整的video标签中应该有
```html
<video width="100%" height="100%" src="http://videooss.tan8.com/tan8video/f5/8d/f5ef7a9be4ebfe7ce919cdeca03a878d/f5ef7a9be4ebfe7ce919cdeca03a878d_2.mp4" controls="controls" poster="http://videooss.tan8.com/tan8video/f5/8d/f5ef7a9be4ebfe7ce919cdeca03a878d/f5ef7a9be4ebfe7ce919cdeca03a878d_5.jpg" webkit-playsinline="true"></video>
```
`width="100%" height="100%"`必须要有，不然个别浏览器无法显示视频
`controls="controls"`必须要有，`="controls"`可以省略，但是controls属性必须写，不然无法加载出视频播放器
`poster`是视频的封面，可有可无，如果没有的话，视频未播放前显示的是黑色页面(手机浏览器)，如果有封面，显示的则是封面
`webkit-playsinline`属性是使视频可以在浏览器视窗内全屏(html5)，可有可无
### 说明
不推荐使用，github数据库引用本地图片、音乐很慢，看到这里也应该知道视频的速度，而且在网页打开时便开始加载，文件过大，会从云端下载很多数据
其它方法可自行去网络查找。
如果你有网上视频URL，直接把URL地址粘到src里即可（当然，这就不属于本地引用了）
例子（引用的云端url）：
```html
<video width="100%" height="100%" src="https://vdse.bdstatic.com/c8e809ee661311914373875a22a604fb.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2Fede47047d81e465d4e653b24bfbbb58a78b52db9a311c1e3dab6809efc647277" controls="controls" webkit-playsinline="true"></video>
```
效果：
<video width="100%" height="100%" src="https://vdse.bdstatic.com/c8e809ee661311914373875a22a604fb.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2Fede47047d81e465d4e653b24bfbbb58a78b52db9a311c1e3dab6809efc647277" controls="controls" webkit-playsinline="true"></video>

## 总结
建议少使用本地引用，影响网页加载速度
如果每张图片很小，但是数量多的话，建议将此文章拆分