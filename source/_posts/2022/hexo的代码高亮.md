---
title: hexo的代码高亮
date: 2022-09-24 14:29:44
tags: [博客,hexo]
---
本篇文章记录一下自己在主题追加代码块隐藏功能所踩过的坑。
<!--more-->
首先先来说一下hexo官方所支持的代码高亮：
`highlight.js` 与 `prismjs`
这两个在GitHub上都有对应的开源代码库。

`highlight.js`，hexo官方默认的代码高亮库。这个其实还好，没有什么坑。`highlight.js`本身不支持行号显示，但是hexo对其提供了支持，此支持导致了代码区块的结构与默认的代码区块结构不一致。
Hexo 通过用 `<figure>` 和 `<table>` 包裹其代码块为其添加了行号显示支持:
```html
<figure class="highlight yaml">
<table>
<tbody>
<tr>
  <td class="gutter">
    <pre><span class="line">1</span><br></pre>
  </td>
  <td class="code">
    <pre><span class="line"><span class="attr">hello:</span><span class="string">hexo</span></span><br></pre>
  </td>
</tr>
</tbody>
</table>
</figure>
```
默认的代码区块结构
```html
<pre><code class="yaml">
<span class="comment"># _config.yml</span>
<span class="attr">hexo:</span> <span class="string">hexo</span>
</code></pre>
```
这种支持导致直接引入 `highlight.js` 官方的css不生效，解决办法在之前的文章已经说过了，可以在全局搜索中搜索关键字：代码区块高亮。
如果既想显示行号，又想引入官方的高亮css，只能通过js解决。当然，你也可以把官方的css摘抄过来，单独适配一下自己的主题。
>为了支持行号显示，Hexo 将输出包裹在了 `<figure>` 和 `<table>` 内部。如果要保持 `highlight.js` 原来的行为，你需要将 `line_number` 和 `wrap` 全部关闭。

关闭后的代码区块结构即为默认的代码区块结构。
>提示：当 `line_number` 和 `wrap` 为 `false`，`hljs` 为 `true` 的时候，你可以在站点上直接应用 `highlight.js` 的主题。

`prismjs` 使用的是默认的代码区块结构，并且支持行号显示。行号显示有坑。
>`PrismJS` 默认禁用。启用 `PrimeJS` 前应设置 `highlight.enable` 为 `false`。

开启行号显示。需要引入官方的css：[行号显示](https://prismjs.com/plugins/line-numbers/)
引入行号显示的css，很有可能出现行号和代码对不齐的情况，这应该是我遇到的较为严重的问题了。`prismjs` 的行号显示是在代码的最后一个 `<span>` 标签之后多创建一个 `<span>` 标签，里面放置用于显示行号的 `<span>` 标签。在这种情况下，一定要谨慎使用 `line-height` 属性，很有可能使左侧显示行号的 `<span>` 与右侧显示代码的  `<span>` 行高不一致，导致行号和代码对不齐，具体也没有什么解决办法。当时因为行号与代码对不其，花了很长时间，一直没有找出原因，最后的解决办法就是 `pre` 部分不再单独设置行高，与文章保持一致。

说了上面的两种代码高亮库，其实还有一种默认的，hexo官方文档有说：
>当 `highlight.enable` 和 `prismjs.enable` 均为 `false` 时，代码块输出的 `HTML` 由相应的渲染器控制。

自己试了一下，与上面的默认的代码区块结构大致一致。对于默认结构，想要添加第三方的css可能需要手动适配了。不同的代码高亮库，class所使用的命名规则是不一样的。默认格式目前不支持代码高亮显示，因为代码块直接放在 `code` 标签之中，没有拆分出来单独的 `span` 标签。
```html
<pre><code class="yaml">
# _config.yml
hexo: hexo
</code></pre>
```

最后，简单说一下主题追加的代码块隐藏和显示语言的思路：
隐藏代码块：通过控制css实现，`display:block` 到 `display:none` 之间的来回切换。这里简单说一下主题配置里面的隐藏：
js对追加的div标签添加class属性 `highlight-tools closed` ，css样式中添加 `.highlight-tools.closed ~ * {display: none;}` 实现。之后点击按钮便是js通过对节点添加相应css实现显示和隐藏，因为 `prismjs` 和默认的代码结构一样，分两种场合实现即可。
显示语言：js截取指定节点的class属性，也是分了两种情况，但是需要考虑 `prismjs` 和默认情况的语言显示。

参考文档：[HEXO 代码高亮](https://hexo.io/zh-cn/docs/syntax-highlight.html)