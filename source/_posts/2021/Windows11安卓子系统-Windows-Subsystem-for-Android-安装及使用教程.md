---
title: Windows11安卓子系统(Windows Subsystem for Android)安装及使用教程
date: 2021-10-24 09:06:08
tags: [软件安装,教程,经验]
toc: true
---
随着Windows11上Android™应用程序的第一个预览版现已提供给美国Beta频道的Windows内部人员，windows11发布会上所说的安卓子系统来啦。
因为第一个预览版只在beta渠道测试，并且只有美国地区，所以想在中国大陆地区快速体验只能寻找其他方法。
本篇文章将给大家讲解一下如何本地安装**Windows Subsystem for Android™**应用以及在安卓子系统上安卓我们所熟悉的apk文件。
<!--more-->
废话不多说，直接走起
## 前提
1.你的电脑必须是Windows 11版本（Build 22000.xxx series builds）
2.电脑的CPU需要开启虚拟化功能，参看任务管理器》详细信息》性能》CPU》虚拟化是否显示已启用，如果不是已启用，你可能需要在主板BIOS中手动开启
3.你的电脑需要开启**虚拟机平台**可选功能
## 下载Windows Subsystem for Android™应用程序离线包
因为微软测试区域只限美国地区，并且需要为beta渠道才能体验，所以我们通过对微软应用商店抓包的方式，下载应用程序的安装文件，本地安装。
1.浏览器访问[https://store.rg-adguard.net/](https://store.rg-adguard.net/)
2.在输入框输入`https://www.microsoft.com/store/productId/9P3395VX91NR`，选择Slow渠道，点击对号即可对网址进行抓包（网站进不去的话，可能是服务器崩溃，多试几次即可）
![1.jpg](1.jpg)
3.点击抓包后，页面划至最下方，找到文件大小最大的文件（1.21GB），点击进行下载
![2.jpg](2.jpg)
## 安装Windows Subsystem for Android™应用程序离线包
下载后的文件双击安装
![3.jpg](3.jpg)
你会发现无法安装
![4.jpg](4.jpg)
这时，我们点击开始菜单右键，选择【Windows 终端 (管理员) 】，用管理员身份启动powershell，通过命令行方式安装
![5.jpg](5.jpg)
先找到我们下载的安装包，右键【复制文件地址】
![6.jpg](6.jpg)
在powershell里输入
```
add-Appxpackage 
```
并在`add-Appxpackage `之后粘贴我们刚刚复制的文件地址（ctrl+v），回车即可安装
![7.jpg](7.jpg)
![8.jpg](8.jpg)
等待进度条走完，点击开始菜单，在推荐的项目里便可以看见我们安装的安卓子系统应用啦
![9.jpg](9.jpg)
## Windows Subsystem for Android™应用程序的使用
上文说到，安卓子系统目前只在美国地区测试，而且微软目前只开放在亚马逊商店下载指定的app，这并不是我们想要的，所以我们这里需要adb工具安装apk文件
打开刚刚安装成功的绿色图标，进入到设置页面
![10.jpg](10.jpg)
### 点击文件，启动安卓子系统
![11.jpg](11.jpg)
如果出现提示启用虚拟机平台，请在设置》应用》可选功能》相关设置》更多 Windows功能》勾选虚拟机平台，系统会自动安装，需要重启
![12.jpg](12.jpg)
### 打开开发人员模式
保持子系统开启，在设置页面，将开发人员模式打开（跟安卓手机一个道理）
![13.jpg](13.jpg)
### 下载adb程序
如果连接失效，可以在浏览器搜索adb，下载相关程序
[蓝奏云链接](https://wws.lanzoui.com/iJL9fvl8oti)
将下载的文件解压，进入到adb文件夹，打开cmd，cd到adb文件夹
![14.jpg](14.jpg)
输入
```
adb version
```
![15.jpg](15.jpg)
确认adb是否成功显示版本
```
adb connect 127.0.0.1:58526
```
确认连接的地址是否为开发人员模式里显示的地址
![16.jpg](16.jpg)
```
adb devices
```
确认是否连接成功
![17.jpg](17.jpg)
### 通过adb安装本地apk文件
在浏览器下载好apk文件，右键【复制文件地址】
继续在cmd窗口输入
```
adb install 
```
并在`adb install `之后粘贴我们刚刚复制的文件地址（ctrl+v），回车即可安装
这里以酷安为例
![18.jpg](18.jpg)
安装成功后，打开开始菜单，即可在推荐的项目里看到刚刚安装的应用
![19.jpg](19.jpg)
## VirtWifi 的连接受限
打开安卓子系统，Window11通知会提示安卓子系统VirtWifi 的连接受限（无法访问互联网），这是因为原生安卓的网络检测机制，详情可以自行搜索：Captive Portal。其实这是一个可忽略的问题，但是部分应用会通过此机制判断是否可以访问互联网，进而导致应用无法联网。这里简单提供一下解决办法，打开ADB调试，在cmd窗口输入以下两条命令，更换检测地址。
```
adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
```
```
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204
```
安卓系统的默认检测地址是谷歌，手动切换为小米。重启安卓子系统后，连接受限的提示不再出现。

更改后，我想要恢复需要怎么做？
两种方法：
1.将安卓子系统重置
2.删除手动更改的检测地址，ADB命令如下
```
adb shell settings delete global captive_portal_http_url
adb shell settings delete global captive_portal_https_url
```
## 最后
因为安卓子系统默认安装在C盘，如果空间不够的话，可以将安卓子系统移动到其他盘符
设置》应用》应用和功能》找到Windows Subsystem for Android™，将其移动到其他盘符即可

目前测试发现，安卓子系统无法读取电脑文件，电脑文件也无法直接放入子系统中，可以通过文件传输实现，请自行寻找攻略（可以在酷安app里面寻找）。
遇到的问题：
部分应用无法打开，有的打开无法使用，无法联网可尝试手动更换联网检测地址，鼠标滚轮易触发点击事件。

Windows Subsystem for Android™与Windows11高度集成，系统自带输入法可以直接在模拟器里使用，总体来说功能还是很强大的。
好啦，本篇文章到此结束，感谢大家的阅读~~