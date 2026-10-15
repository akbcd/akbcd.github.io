---
title: Beyond Compare 3 错误：许可证密钥已被撤销
tags: [教程]
date: 2026-10-15 20:59:04
toc: true
---
## 前言
因为使用的是网上找到的激活密钥，使用一段时间，打开软件就会提示：许可证密钥已被撤销
目前查询到的一种解决方法，实测可用，但是使用一段时间后，会再次提示许可证密钥已被撤销，让我很苦恼。
## 网上办法：
第一步：`C:\Users\你的用户名\AppData\Roaming\Scooter Software\Beyond Compare 3`进入到这个文件夹，把里面的所有文件删除
第二步：重新打开 Beyond Compare 3 ，按提示重新配置，配置完成就可以使用了
<!--more-->
因为在公司也使用这个软件，并且从来没有出现过许可证密钥已被撤销的提示，唯一的区别就是公司电脑没有连接互联网，猜测跟软件连接互联网有关系，下面是使用Windows防火墙禁用 Beyond Compare 3 联网的方法。

## 使用Windows防火墙禁用 Beyond Compare 3 联网的方法：
第一步：找到 Beyond Compare 3 应用 exe 路径
* 打开任务管理器 → “详细信息” → 右键正在运行的目标应用 → “打开文件所在的位置”。复制完整路径，比如：`D:\Program Files\Beyond Compare 3\BCompare.exe`

第二步：打开高级防火墙
* `控制面板\系统和安全\Windows Defender 防火墙`选择左面的`高级设置`

第三步：新建出站阻止规则
* 左侧点“出站规则” → 右侧“新建规则”
* 类型选“程序” → 下一步
* 选“此程序路径” → 浏览框粘贴 Beyond Compare 3 完整路径
* 操作选“阻止连接” → 下一步
* 配置文件：域、专用、公用全勾选
* 命名，如“Beyond Compare 3” → 完成

之后就可以在出站规则里看到自己创建的`Beyond Compare 3`，这个规则负责禁用软件 Beyond Compare 3 连接网络，如果需要删除，点击此规则，右侧选择删除即可。
进入 Beyond Compare 3 软件，点击 帮助 → 检查更新，提示连接到更新站点时有错误，软件已经成功被禁止联网。

## 激活密钥：
下面是网上寻找到的 Beyond Compare 3 激活密钥：
```
mv1nPlXAywBDCdhxFc9QOVv6TBcQHLAXBQUAKTh3ie4fqSEOnWrPsnVkF
yt0wAkJHweoExRJWWVwwCniKNROSdJzJXE6YVapYW7f+tRRXRFI4yn4Nj
jZ0RiiqGRCTVzwComUcXB-eiFWRBY6JpSsCNkmIxL5KsRCo442djHhTZE
```
