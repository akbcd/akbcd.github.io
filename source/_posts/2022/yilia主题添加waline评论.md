---
title: yilia主题添加waline评论
date: 2022-08-20 18:10:33
tags: [博客,hexo]
toc: true
---
一言难尽。2022年7月19日下午收到了LeanCloud的邮件：8月1日起，LeanCloud国际版共享域名不再向中国大陆提供服务
8月1日访问自己的博客，果然不出所料，使用LeanCloud国际版的valine无法使用了。
自己很早就听说了waline评论，但是当时valine已在使用中，云引擎休眠的问题也算是解决了（躺平），就没有再关注waline。
在寻找其他评论的途中，再次关注了waline，并且开发者明确说：waline不受LeanCloud国际版共享域名不再向中国大陆提供服务的影响。
本篇文章由此而来~
<!--more-->
## 关于waline
>waline官方网站：https://waline.js.org/

waline是一款基于 Valine 衍生的简洁、安全的评论系统。这里就简单总结一下与valine的关系：valine是无后端评论系统，提交评论时valine直接与LeanCloud交互。waline是有后端评论系统，后端用的是Vercel，提交评论时，waline与Vercel交互，Vercel再与LeanCloud交互。LeanCloud在waline中作为数据库来使用。Vercel是国外的，所以不受不向中国大陆提供服务的限制。
## 快速上手
注意：本篇文章只面向` LeanCloud 国际版 `，国内版的配置，请参看waline官方网站：https://waline.js.org/
1. [登录](https://console.leancloud.app/login) 或 [注册](https://console.leancloud.app/register)` LeanCloud 国际版 `并进入 [控制台](https://console.leancloud.app/apps)
2. 点击左上角 [创建应用](https://console.leancloud.app/apps) 并起一个你喜欢的名字 (请选择免费的开发版):
![](1.png)
3. 进入应用，选择左下角的` 设置 `>` 应用 Key `。你可以看到你的` APP ID `,` APP Key `和` Master Key `。请记录它们，以便后续使用。
![](2.png)

### Vercel 部署 (服务端)
[Deploy](https://vercel.com/new/clone?repository-url=https://github.com/walinejs/waline/tree/main/example)
1. 点击上方链接，跳转至 Vercel 进行 Server 端部署。
>如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

2. 选择自己的GitHub账户，输入一个自己喜欢的 Vercel 项目名称并点击` Create `继续（建议勾选创建私有git仓库）:
![](3.png)
3. 此时 Vercel 会基于 Waline 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。（如果你没有勾选创建私有git仓库，Vercel会创建一个公开的git仓库）
![](4.png)
部署大约需要两分钟，满屏的烟花会庆祝你部署成功。此时点击` Go to Dashboard `可以跳转到应用的控制台。
4. 点击顶部的` Settings  `-` Environment Variables `进入环境变量配置页，并配置三个环境变量` LEAN_ID `,` LEAN_KEY `和` LEAN_MASTER_KEY `。它们的值分别对应上一步在 LeanCloud 中获得的` APP ID `,` APP KEY `,` Master Key `。
![](5.png)
5. 环境变量配置完成之后点击顶部的` Deployments `点击顶部最新的一次部署右侧的` Redeploy `按钮进行重新部署。该步骤是为了让刚才设置的环境变量生效。最新部署下面的其他部署，可以点进去将其删除，只留最新的一次即可。
![](6.png)
6. 此时会跳转到` Overview `界面开始部署，等待片刻后` STATUS `会变成` Ready `。此时请点击` Visit `，即可跳转到部署好的网站地址，此地址即为你的服务端地址。（DOMAINS下的链接地址）
![](7.png)

## HTML 引入 (客户端)
注意：这里以我使用的yilia主题为例
1. 在` yilia\layout\_partial\article.ejs `文件中添加 waline 评论的导入（在主题已有的评论下面导入即可）：
```
<!-- 已有评论 -->
<% if (theme.changyan_appid && theme.changyan_conf){ %>
<%- partial('post/changyan', {
    key: post.slug,
    title: post.title,
    url: config.url+url_for(post.path)
}) %>
<% } %>
<!-- 导入waline评论 -->
<% if (theme.waline && theme.waline.enable){ %>
<%- partial('post/waline', {
    key: post.slug,
    title: post.title,
    url: config.url+url_for(post.path)
}) %>
<% } %>
```
2. 在` yilia\layout\_partial\post `中新建` waline.ejs `模板文件，粘贴如下内容，保存。创建` <script> `标签使用` Waline.init() `初始化，并传入必要的` el `与` serverURL `选项。
>` el `选项是 Waline 渲染使用的元素，你可以设置一个字符串形式的 CSS 选择器或者一个 HTMLElement 对象。
` serverURL `是服务端的地址，即 Vercel 部署成功后DOMAINS下的链接地址。
```
<link rel="stylesheet" type="text/css" href="<%- theme.waline_css %>">
<div id="waline"></div>
<script src="<%- theme.waline_js %>"></script>
<script>
  Waline.init({
    el: '#waline',
    serverURL: '<%= theme.waline.serverURL %>',
    lang: '<%- config.language %>',
    meta: [<%- theme.waline.meta ? theme.waline.meta : "'nick', 'mail', 'link'" %>],
    requiredMeta: [<%- theme.waline.requiredMeta ?  '"' + theme.waline.requiredMeta + '"' : "" %>],
    login: '<%= theme.waline.login%>',
    wordLimit: <%= theme.waline.wordLimit %>,
    pageSize: <%= theme.waline.pageSize %>,
    copyright: '<%- theme.waline.copyright %>' === 'true'
  });
  document.getElementById('wl-edit').setAttribute("placeholder","<%= theme.waline.placeholder %>");
</script>
```
详细配置可以参考waline官网中的组件属性：https://waline.js.org/reference/component.html
3. 在主题配置文件` yilia\_config.yml `中添加 waline 的相关配置（字符串类型请手动添加双引号）：
```
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
waline_css: https://unpkg.com/@waline/client@v2/dist/waline.css
waline_js: https://unpkg.com/@waline/client@v2/dist/waline.js
```
4. 将主题配置文件` yilia\_config.yml `中的` waline.enable `设为` true `，将 Vercel 服务端填入` waline.serverURL `后，启用本地hexo服务，评论服务此时就会在你的网站上成功运行，**看到评论下方的文字` 来发评论吧~ `表明配置成功**。

## 评论管理 (管理端)
1. 部署完成后，请访问` <serverURL>/ui/register `进行注册。首个注册的人会被设定成管理员。
2. 管理员登陆后，即可看到评论管理界面。在这里可以修改、标记或删除评论。
3. 管理员在文章的评论页面登陆后，可直接在文章页面添加、修改、标记或删除评论。
4. 用户也可通过评论框注册账号，登陆后会跳转到自己的档案页。

## 服务端配置
服务端配置分为两种方式：Vercel环境变量和git仓库主入口配置。
Vercel环境变量：上面提到的 **Vercel 部署 (服务端)** 的第四步
git仓库主入口配置：git仓库waline模板中的` index.js `文件
环境变量可以解决的内容，不建议通过修改` index.js `实现
>如果你使用模板，请额外注意你需要自行保存这些配置，因为它们会在拉取官方最新模板时被覆盖。

在这里列举出来我用的环境变量，包括邮件通知提醒，安全域名等。
注意：不包括 **Vercel 部署 (服务端)** 第四步用到的环境变量，用到的环境变量是必须配置的，这里不再说明

|变量|示例|说明|
|:-|:-|:-|
|SITE_NAME|Deserts|填写自己的博客名称|
|SITE_URL|`https://xxx.github.io`|博客首页地址，结尾不需要`/`|
|SMTP_SERVICE|QQ|邮件服务提供商，你可以在 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看所有支持的运营商。|
|SMTP_USER|`xxxxxx@qq.com`|SMTP登录用户，就是输入自己的邮箱|
|SMTP_PASS|ccxxxxxxxxch|SMTP登录密码，如果是QQ邮箱，填写在邮箱设置中获取登录第三方邮箱客户端的授权码|
|AUTHOR_EMAIL|`xxxxxx@qq.com`|博主邮箱，用来接收新评论通知。如果是博主发布的评论则不进行提醒通知。|
|MAIL_TEMPLATE|参看下记详细说明|自定义评论回复邮件内容|
|MAIL_TEMPLATE_ADMIN|参看下记详细说明|自定义新评论通知邮件内容|
|SECURE_DOMAINS|xxx.github.io|安全域名配置，支持逗号分隔配置多个域名|

邮件通知模板的详细说明：
邮件通知模板在 Vercel 环境变量中设定，可自定义通知邮件标题及内容模板。
默认的邮件通知模板是无法看到具体是哪篇文章的评论，这里简单进行了一下修改，跟valine的差不多，但是有区别
环境变量：**MAIL_TEMPLATE**
修改后被@通知邮件内容模板如下：
```
<div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"><h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">您在<a style="text-decoration:none;color: #12ADDB;"href="{{site.url}}"target="_blank">{{site.name|safe}}</a>上的评论有了新的回复</h2>{{parent.nick}}同学，您曾发表评论：<div style="padding:0 12px 0 12px;margin-top:18px"><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{parent.comment|safe}}</div><p><strong>{{self.nick}}</strong>回复说：</p><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{self.comment|safe}}</div><p>您可以点击<a style="text-decoration:none; color:#12addb"href="{{site.postUrl}}"target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb"href="{{site.url}}"target="_blank">{{site.name}}</a>。<br></p><p>详细链接：{{site.postUrl}}</p></div></div>
```
环境变量：**MAIL_TEMPLATE_ADMIN**
修改后博主通知邮件内容模板如下：
```
<div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"><h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">您在<a style="text-decoration:none;color: #12ADDB;"href="{{site.url}}"target="_blank">{{site.name}}</a>上的文章有了新的评论</h2><p><strong>{{self.nick}}</strong>回复说：</p><div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{self.comment|safe}}</div><p>您可以点击<a style="text-decoration:none; color:#12addb"href="{{site.postUrl}}"target="_blank">查看回复的完整內容</a><br></p><p>详细链接：{{site.postUrl}}</p></div></div>
```
效果为在邮件最后一行添加评论详细链接，旨在快速定位是哪篇文章的评论。
## 最后
到此，本篇文章就算结束了。因为自己研究花了一点点时间，导致本篇文章来的晚了一些。
也不知道还有多少人在坚持使用yilia主题，反正我会一直用下去，随时添加自己觉得有用的新功能。
关于评论框占位提示符的实现，这里使用js替换原有的占位符，由于 waline 将` placeholder `选项纳入了多语言支持，已不再支持通过` placeholder `选项直接设置评论框占位提示符，这里直接用js给替换掉了。
环境变量中还有许多有趣的配置，感兴趣可以去看看~