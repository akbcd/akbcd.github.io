hexo-theme-yilia
================

Yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。
本主题是 Yilia 主题的修改版。原版 [hexo-theme-yilia](https://github.com/litten/hexo-theme-yilia)

## 配置

主题配置文件在主题目录下的`_config.yml`，请根据自己需要修改使用。

```
# yilia主题配置文件
# 全局设置
# Global settings

menu:
  主页: /
  归档: /archives/
  随笔: /tags/随笔/
  分类: /categories/分类/

# SubNav
subnav:
  github: http://github.com/
  weibo: https://weibo.com/
  rss: "#"
  zhihu: https://www.zhihu.com/explore
  qq: "#"
  weixin: "#"
  jianshu: "#"
  douban: "#"
  segmentfault: "#"
  bilibili: "#"
  acfun: "#"
  mail: "mailto:litten225@qq.com"
  facebook: "#"
  google: "#"
  twitter: "#"
  linkedin: "#"
  csdn: "#"
  mayun: "#"

# rss订阅实现需要插件hexo-generator-feed
rss: /atom.xml

# 是否需要修改 root 路径
# 如果您的网站存放在子目录中，例如 http://yoursite.com/blog，
# 请将您的 url 设为 http://yoursite.com/blog 并把 root 设为 /blog/。
root: /

# aplayer音乐播放器
# 要支持音乐播放，就必须开启音乐的播放配置和音乐的数据文件。
# 博客 source 目录下的 _data 目录（没有的话就新建一个）中新建 musics.json 文件（存放音乐数据）
# aplayer与mobile_aplayer分被应用于pc与mobile页面
music: true # 全局设置
aplayer: # 电脑页面
  enable: true # 是否开启
  showTitle: # 是否显示标题，非吸底模式有效
    enable: true
    title: 听听音乐
  fixed: true # 吸底模式（fixed:true）aplayer版本1.9.1新增功能，迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
  autoplay: false # 是否自动播放
  theme: '#4d4d4d' # 主题色
  loop: 'one' # 音频循环播放, 可选值: 'all', 'one', 'none'
  order: 'random' # 音频循环顺序, 可选值: 'list', 'random'
  preload: 'none' # 音频预加载，可选值: 'none', 'metadata', 'auto'
  volume: 0.7 # 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  lrcType: 0 # 歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式），0（不显示歌词）
  listFolded: true # 列表是否折叠
  listMaxHeight: '96px' # 列表最大高度，一个列表'32px'
# 移动端页面，配置参考aplayer
mobile_aplayer:
  enable: true
  showTitle:
    enable: false
    title: 
  fixed: false
  autoplay: false
  theme: '#4d4d4d'
  loop: 'all'
  order: 'random'
  preload: 'none'
  volume: 0.7
  lrcType: 1
  listFolded: true
  listMaxHeight:

# 全局搜索
# 本功能实现需要插件hexo-generator-searchdb所生成的search.xml文件
# 在hexo根目录_config.yml添加如下配置
# search:
#   path: search.xml
#   field: post
# 不开启值为false，开启，值为true
# 使用方法：点击所有文章中的搜索图标
local_search:
  enable: false

# 是否在新窗口打开链接
open_in_new: false

# 是否有快速回到顶部的按钮
top: true

# 代码块复制
# 代码块区域右上方创建复制按钮，点击即可复制当前代码块区域代码
clipboard: true

# Miscellaneous 网站分析
baidu_analytics: false
google_analytics: false

# 网页图标
favicon: 

# 你的头像url
avatar: 

# 样式定制 - 一般不需要修改，除非有很强的定制欲望…
style:
  # 头像上面的背景颜色
  header: '#4d4d4d'
  # 右滑板块背景
  slider: 'linear-gradient(200deg,#a0cfe4,#e8c37e)'

# slider的设置
slider:
  # 是否默认展开tags板块
  showTags: false

# 智能菜单
# 所有文章实现需要插件hexo-generator-json-content
# 如不需要，将该对应项置为false
# 比如
#smart_menu:
#  friends: false
smart_menu:
  innerArchive: '所有文章'
  friends: '友链'
  #aboutme: '关于我'

friends:
  友情链接1: http://localhost:4000/
  友情链接2: http://localhost:4000/
  友情链接3: http://localhost:4000/
  友情链接4: http://localhost:4000/
  友情链接5: http://localhost:4000/
  友情链接6: http://localhost:4000/

aboutme: 很惭愧<br><br>只做了一点微小的工作<br>谢谢大家

# 文章设置
# Article settings

# 文章太长，截断按钮文字
excerpt_link: more
# 文章卡片右下角常驻链接，不需要请设置为false
show_all_link: '展开全文'
# 是否激活mathjax数学公式，这是全局配置，但文章仍然不会都开启mathjax渲染，
# 考虑到mathjax加载比较耗时，你还需要在需要渲染的文章的Front-matter中再加上`mathjax: true`才行
mathjax: false
mathjax_js: https://unpkg.com/mathjax@3/es5/tex-svg.js #version 3
# 是否通过cookie记录文章页面浏览位置
# 访问文章时，可快速定位到上次浏览位置
# 需要浏览器允许cookie
scrollPos: true

# 打赏
# 打赏type设定：0-关闭打赏； 1-文章对应的md文件里有reward:true属性，才有打赏； 2-所有文章均有打赏
reward_type: 0
# 打赏wording
reward_wording: '谢谢你请我吃糖果'
# 支付宝二维码图片地址，跟你设置头像的方式一样。比如：/assets/img/alipay.jpg
alipay: 
# 微信二维码图片地址
weixin: 

# 目录
# 目录设定：0-不显示目录； 1-文章对应的md文件里有toc:true属性，才有目录； 2-所有文章均显示目录
toc: 1
# 根据自己的习惯来设置，如果你的目录标题习惯有标号，置为true即可隐藏hexo重复的序号；否则置为false
toc_hide_index: true
# 目录为空时的提示
toc_empty_wording: '目录，不存在的…'
# anchor 目录锚点url
# 当您在文章中滚动时，URL将根据标头ID进行更新
anchor: true

# 字数统计
# 本功能实现需要插件hexo-wordcount
# 设定：0-不显示字数； 1-文章对应的md文件里有wordcount: true属性，才显示字数； 2-所有文章均显示字数
# 不需要使用，直接设置值为false，或注释掉
wordcount: 2

# 文章转载
# default 配置文章的默认转载规则
# 您可以使用在文章md文件的 front-matter 中指定 reprintPolicy 来给单个文章配置转载规则
# 可用的转载规则有：
# 这些转载规则的意义请参考：https://creativecommons.org/choose/?lang=zh
# cc_by（知识共享署名 4.0 国际许可协议 Creative Commons Attribution-NoDerivatives 4.0 International License）
# cc_by_nd（知识共享署名-禁止演绎 4.0 国际许可协议 Creative Commons Attribution-NoDerivatives 4.0 International License）
# cc_by_sa（知识共享署名-相同方式共享 4.0 国际许可协议 Creative Commons Attribution-ShareAlike 4.0 International License）
# cc_by_nc（知识共享署名-非商业性使用 4.0 国际许可协议 Creative Commons Attribution-NoDerivatives 4.0 International License）
# cc_by_nc_nd（知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议 Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License）
# cc_by_nc_sa（知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License）
# cc0（CC0 1.0 通用 (CC0 1.0) 公共领域贡献 CC0 1.0 Universal (CC0 1.0) Public Domain Dedication） https://creativecommons.org/publicdomain/zero/1.0/deed.zh
# noreprint（不允许转载 not allowed to reprint）
# pay（付费转载 pay for reprinting）
reprint:
  enable: true # whether enable reprint section 是否启用“转载规则限定模块”
  default: cc_by

# 是否激活复制文章时追加博客和作者的版权信息
copyright:
  enable: false
  minCharNumber: 120 # 至少复制多少个字符就追加版权信息
  description: 本文章著作权归作者所有，任何形式的转载都请注明出处。

# 文章置顶
# 本功能实现需要卸载hexo自带的文章排序插件hexo-generator-index，安装插件hexo-generator-index-pin-top
# 文章Front-matter中添上'top: true'属性即可将文章置顶

# 阅读文章的密码验证功能
# 如要使用此功能请激活该配置项，并在对应文章的Front-matter中写上'password'的键和密码加密后的密文即可
# 比如
# password: 加密的密文
# 请注意：为了保证密码原文不会被泄露到网页中，文章的密码必须是通过'SHA256'加密的，这样就不会被破解
verifyPassword:
  enable: true
  promptMessage: 请输入访问本文章的密码
  errorMessage: 密码错误，将返回主页！

# 是否开启分享
share_jia: true

# 评论：1、valine；2、gitalk；3、畅言；4、Disqus；5、Gitment；6、waline
# 不需要使用某项，直接设置值为false，或注释掉
# 想要关闭某篇文章的评论，请在文章对应的md文件中添加'comments: false'属性即可
# 具体请参考wiki：https://github.com/litten/hexo-theme-yilia/wiki/

# 1、valine 参考官网：https://valine.js.org
# ADMIN_URL参考https://deserts.io/valine-admin-document/，用于唤醒云引擎
# 若ADMIN_URL没有允许跨域请求，控制台会报错（报错可忽略）
valine:
  enable: false
  appId: 
  appKey: 
  placeholder: '说说你的看法。' # 评论框占位提示符
  maxLength: 500 # 评论框允许输入的最大字符数
  avatar: 'mp' # Gravatar style : ''/mp/identicon/monsterid/wavatar/retro/robohash/hide
  pageSize: 10 # 评论列表分页
  visitor: true # 文章访问量统计
  highlight: true # 代码块高亮
  recordIP: false # 是否记录评论者IP
  enableQQ: true # 是否启用昵称框自动获取QQ昵称和QQ头像, 默认关闭
  ADMIN_URL: false # Web主机二级域名，若没有请设为false
  serverURLs: https://xxx # REST API 服务器地址
valine_css: /css/valine/valine.css
valine_js: //unpkg.com/valine@latest/dist/Valine.min.js

# 2、gitalk
gitalk:
  enable: false
  owner:
  repo:
  oauth:
    clientId:
    clientSecret:
  admin:
gitalk_css: //unpkg.com/gitalk@latest/dist/gitalk.css
gitalk_js: //unpkg.com/gitalk@latest/dist/gitalk.min.js

# 3、畅言（域名需要备案）
changyan_appid: false
changyan_conf: false

# 4、Disqus 在hexo根目录的config里也有disqus_shortname字段，优先使用yilia的（中国大陆无法使用）
disqus: false

# 5、Gitment
gitment_owner: false      #你的 GitHub ID
gitment_repo: ''          #存储评论的 repo
gitment_oauth:
  client_id: ''           #client ID
  client_secret: ''       #client secret

# 6、waline 参考官网：https://waline.js.org
# 字符串类型请手动添加引号
waline:
  enable: false
  serverURL: https://xxx.vercel.app/ # 服务端的地址
  meta: "'nick','mail','link'" # 评论者相关属性。字符串类型，可选值:'nick','mail','link'
  requiredMeta: "" # # 匿名选项。字符串类型，空为允许匿名。可选值:'nick','mail'
  login: enable # 登录模式状态，可选值：'enable'，'disable'，'force'
  wordLimit: 0 # 评论字数限制。填入单个数字时为最大字数限制。设置为0时无限制。
  pageSize: 10 # 评论列表分页，每页条数。
  copyright: true # 是否显示页脚版权信息。
  placeholder: '请留言。(填写邮箱可在被回复时收到邮件提醒)' # 评论框占位提示符（js替换实现）
waline_css: //unpkg.com/@waline/client@v2/dist/waline.css
waline_js: //unpkg.com/@waline/client@v2/dist/waline.js

# 前端库
# Front-end libraries

# 使用到的前端库，可按需替换成对应的CDN地址，如果下面未指定具体的版本号，使用最新的版本即可.
# 发布使用加载速度快，本地调试使用便于阅读
# 修改请先在本地调试修改，完成后压缩放置发布使用

# 发布使用

css:
  main: /css/main.min.css
  mobile: /css/mobile/mobile.min.css
  photoswipe: /css/photoswipe/photoswipe.css
  photoswipe_default_skin: /css/photoswipe/default-skin/default-skin.css
  aplayer: /css/APlayer/APlayer.min.css #1.10.1
js:
  search: /js/search/search.min.js
  aplayer: /js/APlayer/APlayer.min.js #1.9.1
  crypto_js: /js/crypto-js/crypto-js.min.js #3.1.9-1
  photoswipe: /js/photoswipe/photoswipe.min.js
  photoswipe_ui_default: /js/photoswipe/photoswipe-ui-default.min.js
  scrollProgress: /js/scrollProgress/scrollProgress.min.js #3.0.2
  mobile: /js/mobile/mobile.min.js
  main: /js/main.min.js
  clipboard: /js/clipboard/clipboard.min.js
  slider: /js/slider.min.js

# 本地调试使用

# css:
#   main: /css/main.css
#   mobile: /css/mobile/mobile.css
#   photoswipe: /css/photoswipe/photoswipe.css
#   photoswipe_default_skin: /css/photoswipe/default-skin/default-skin.css
#   aplayer: /css/APlayer/APlayer.min.css #1.10.1
# js:
#   search: /js/search/search.js
#   aplayer: /js/APlayer/APlayer.min.js #1.9.1
#   crypto_js: /js/crypto-js/crypto-js.min.js #3.1.9-1
#   photoswipe: /js/photoswipe/photoswipe.min.js
#   photoswipe_ui_default: /js/photoswipe/photoswipe-ui-default.min.js
#   scrollProgress: /js/scrollProgress/scrollProgress.min.js #3.0.2
#   mobile: /js/mobile/mobile.js
#   main: /js/main.js
#   clipboard: /js/clipboard/clipboard.min.js
#   slider: /js/slider.js
```
