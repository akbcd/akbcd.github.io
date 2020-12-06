---
title: 电脑无法访问GitHub解决办法
date: 2020-05-04 19:49:07
tags: [教程,经验]
---
家里用的是吉林联通宽带，之前访问GitHub正常，但是从一月份回家开始，电脑便不能访问GitHub了，上网查了一些教程，没有去实践
为什们拖了这么久？原因其实很简单，因为手机数据流量可以访问，每次写完博客推送文章都是用电脑连的手机热点去完成，日子着实太苦了，好好的宽带用不了，需要去连手机热点，因为能连上，所以拖了这么久
今天闲着没事，忽然想到了GitHub不能连接的问题，照着教程试了一下，成功了
先说一下为什么家里的宽带不能访问GitHub原因：宽带对DNS服务器解析GitHub域名的IP进行屏蔽，导致GitHub无法访问（测试发现，解析出来的IP地址，只是家里的宽带无法访问，其它网络可以访问）
<!--more-->
这里推荐两个网站，通过域名查IP
[iP地址查询--手机号码查询归属地 | 邮政编码查询 | iP地址归属地查询 | 身份证号码验证在线查询网](https://www.ip138.com/)
[多个地点Ping服务器,网站测速 - 站长工具](http://ping.chinaz.com/)
## 无法访问GitHub的情况
先来看一下不能访问Github的情况
浏览器访问GitHub，提示无法访问此页面
![无法访问GitHub](https://i.loli.net/2020/05/04/aPd1IgXTAM9CNY4.png)
cmd输入ping命令`ping github.com`
ping不通
![ping](https://i.loli.net/2020/05/05/ZJEsOqrxHpvYIce.png)
`52.74.223.119`为宽带DNS服务器解析的IP地址
通过网站：[https://www.ip138.com/](https://www.ip138.com/)，输入域名，查询IP，总共查询到如下几个IP地址
![ip查询](https://i.loli.net/2020/05/04/ngwxaV1rGS9sTLZ.png)
ping一个美国和新加坡的IP，美国的可以ping通，新加坡的不通
![](https://i.loli.net/2020/05/04/EijKwWzVtJH9q25.png)
尝试在浏览器中直接访问能ping通的IP，提示此站点不安全，点击继续访问，依然跳到访问GitHub的无法访问此页面
![](https://i.loli.net/2020/05/04/WUnVNQPL42CgIvO.png)
## 解决办法
打开[http://ping.chinaz.com/](http://ping.chinaz.com/)，在此网站中ping测试GitHub
你会发现在国内的监测点中，响应的IP几乎都是ping不通的
![](https://i.loli.net/2020/05/04/Y96HdLzEtrPK4Jq.png)
这里显示最快节点是海外的加拿大
```
加拿大 140.82.114.4 美国 弗吉尼亚州阿什本GitHub公司 13ms 54 不死高防服务器无视DDOS无视CC
```
cmd中ping测试一下此IP，可以访问
![](https://i.loli.net/2020/05/04/HBTha6x1N9EGktw.png)
修改电脑hosts文件
定位文件`C:\Windows\System32\drivers\etc\hosts`（win10系统为例）
hosts文件可以通过`visual studio code`打开，修改后直接`ctrl+s`保存即可
在文件中添加ping测试通过的IP，比如
```
140.82.114.4 github.com
```
在cmd中ping测试`github.com`，通过，显示的是自己添加的IP
![](https://i.loli.net/2020/05/04/jeS85g9MvH3zE1n.png)
浏览器访问GitHub，已成功访问
![](https://i.loli.net/2020/05/04/VrZGzFAQJWeC2hy.png)
## 最后
hosts文件中的IP优先级大于DNS服务器中的IP，访问网站时，系统会先在hosts文件中查找域名所对应的IP，如果没有，才会去请求DNS服务器
起初不能访问GitHub，自己以为是大陆将GitHub屏蔽了，但是手机数据流量可以访问，证明了自己的想法是错的
通过了几次测试，发现DNS解析出GitHub的IP地址无非就是两个（IP可能不唯一）
`13.250.177.223 [新加坡 Amazon数据中心]`
`140.82.112.4 [美国 华盛顿州西雅图GitHub]`
家里的宽带屏蔽掉地址是`新加坡 Amazon数据中心`的IP
这里简单提及一下手机连接这种宽带访问GitHub方法：
因为手机修改hosts文件费劲，这里推荐修改DNS，测试了很多能访问的DNS服务器，发现台湾的DNS服务器适合家里的这种宽带，解析出的IP地址为美国，其它DNS服务器解析出的IP地址多数为新加坡
DNS服务器的地址为：`168.95.192.1`或`168.95.1.1`
修改手机wifi设置，将IP设置为静态，添加上面的DNS即可
因为添加了台湾的DNS服务器，GitHub可以访问，但是访问国内的网站速度变慢，这就涉及到了取舍。

用同样的方法，可以寻找一下谷歌搜索域名的IP，尝试ping测试，你会发现都不通过，这种应该是大陆封锁IP导致，即使遇到测试通过的IP，通过修改hosts文件，浏览器还是无法访问，这种情况，多半是需要VPN了