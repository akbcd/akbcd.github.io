本主题基于yilia打造优化，保留yilia几乎所有的功能，添加部分功能
**添加的功能：**
1. 文章字数统计
2. 全局搜索功能
3. 博客文章加密
4. 移动端添加页面进度条
5. 中英文语言切换

## 配置

主题配置文件在主目录下的`_config.yml`，请根据自己需要修改使用。
完整配置例子：

```
# Header

menu:
  主页: /
  随笔: /tags/随笔/
  归档: /archives/

# SubNav（不需要的注释即可）
subnav:
  github: "#"
  weibo: "#"
  rss: "#"
  zhihu: "#"
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

# rss订阅实现需要插件hexo-generator-feed
rss: /atom.xml

# 是否需要修改 root 路径
# 如果您的网站存放在子目录中，例如 http://yoursite.com/blog，
# 请将您的 url 设为 http://yoursite.com/blog 并把 root 设为 /blog/。
root: /

# Content

# 文章太长，截断按钮文字
excerpt_link: more
# 文章卡片右下角常驻链接，不需要请设置为false
show_all_link: '展开全文'
# 数学公式
mathjax: false
# 是否在新窗口打开链接
open_in_new: false

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

# 是否有快速回到顶部的按钮
top: true

# 字数统计
# 本功能实现需要插件hexo-wordcount
# 不需要使用，直接设置值为false，或注释掉
word_count: false

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

# 阅读文章的密码验证功能，如要使用此功能请激活该配置项，并在对应文章的Front-matter中写上'password'的键和密码加密后的密文即可.
# 比如
# password: 加密的密文
# 请注意：为了保证密码原文不会被泄露到网页中，文章的密码必须是通过'SHA256'加密的，这样就不会被破解.
verifyPassword:
  enable: true
  promptMessage: 请输入访问本文章的密码
  errorMessage: 密码错误，将返回主页！

# Miscellaneous
#baidu_analytics: ''
#google_analytics: ''
favicon: /img/avatar.png

#你的头像url
avatar: /img/avatar.png

#是否开启分享
share_jia: true

#评论：1、多说；2、网易云跟帖；3、畅言；4、Disqus；5、Gitment
#不需要使用某项，直接设置值为false，或注释掉
#具体请参考wiki：https://github.com/litten/hexo-theme-yilia/wiki/

#1、多说
duoshuo: false

#2、网易云跟帖
wangyiyun: false

#3、畅言
changyan_appid: false
changyan_conf: false

#4、Disqus 在hexo根目录的config里也有disqus_shortname字段，优先使用yilia的
disqus: false

#5、Gitment
gitment_owner: false      #你的 GitHub ID
gitment_repo: ''          #存储评论的 repo
gitment_oauth:
  client_id: ''           #client ID
  client_secret: ''       #client secret

# 样式定制 - 一般不需要修改，除非有很强的定制欲望…
style:
  # 头像上面的背景颜色
  header: '#4d4d4d'
  # 右滑板块背景
  slider: 'linear-gradient(200deg,#a0cfe4,#e8c37e)'

# slider的设置
slider:
  # 是否默认展开tags板块
  showTags: true

# 智能菜单
# 如不需要，将该对应项置为false
# 比如
#smart_menu:
#  friends: false
smart_menu:
  innerArchive: '所有文章'
  friends: '友链'
  aboutme: '关于我'

friends:
  友情链接1: http://localhost:4000/
  友情链接2: http://localhost:4000/
  友情链接3: http://localhost:4000/
  友情链接4: http://localhost:4000/
  友情链接5: http://localhost:4000/
  友情链接6: http://localhost:4000/

aboutme: 很惭愧<br><br>只做了一点微小的工作<br>谢谢大家

# 使用到的前端库，可按需替换成对应的CDN地址，如果下面未指定具体的版本号，使用最新的版本即可.
css:
  main: /main.0cf68a.css
js:
  mobile: /js/mobile.992cbe.js
  main: /main.0cf68a.js
  slider: /slider.e37972.js
  scrollProgress: https://cdn.bootcss.com/scrollprogress/3.0.2/scrollProgress.js #3.0.2
  #scrollProgress: /js/scrollProgress.min.js
  jquery: https://code.jquery.com/jquery-3.4.1.js #3.4.1
  #jquery: /js/search.js
  search: /js/search.js
  crypto: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js #3.1.9-1
  #crypto: /js/crypto-js.min.js
```