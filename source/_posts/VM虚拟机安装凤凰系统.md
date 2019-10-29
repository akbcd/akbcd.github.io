---
title: VM虚拟机安装凤凰系统
date: 2019-10-29 20:23:08
tags: vm虚拟机
---
凤凰系统是基于Linux内核开发的一个安卓桌面系统，适合大屏幕使用。如果你想拥有一个安卓模拟器，可以大屏运行，凤凰系统适合你
现在的凤凰系统，因为生存，在系统内加入了广告，个人体验不是很好，本篇文章分享一个无广告版本的iso文件
说明：
VM虚拟机 VMware® Workstation 15 Pro
版本 15.5.0 build-14665864
凤凰系统 PhoenixOSInstaller_v3.0.7.508_x86_x64
**VM虚拟机安装凤凰系统操作步骤**
<!--more-->
## 创建虚拟机
### 打开VM虚拟机，创建新的虚拟机
![](https://tva1.sinaimg.cn/mw690/007X8olVly1g8fd8su64yj30qz09xdg4.jpg)
### 选择自定义，单击下一步
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fda3014bj30fu0f7q4a.jpg)
### 硬件兼容性选择 Workstation 15.x ，单击下一步
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdakcaefj30fr0f5mxd.jpg)
### 稍后安装操作系统
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdb5gt3qj30fq0f5wen.jpg)
### 客户机操作系统 选择 其他 ，版本选择 其他64位
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdbqu1k3j30fr0f73yn.jpg)
### 虚拟机名称 自定义，我起的是PhoenixOS；位置 自定义，我选的默认
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdci8qfsj30fs0f7dfx.jpg)
### 处理器数量 每个处理器的内核数量 自定义（不能超过电脑处理器核心数量）
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdd0xmjmj30fu0f874b.jpg)
### 此虚拟机的内存（相当于手机的运行内存，建议不要太小）
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fddfxlaqj30fr0f7dg6.jpg)
### 网络类型 选择 使用网络地址转换（NAT） （其他可能连不上网）
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fddvlqo6j30fu0f7t8z.jpg)
### I/O控制器类型 选择推荐
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdeeohmpj30fs0fcq34.jpg)
### 虚拟磁盘类型 推荐
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdf9zv8wj30fs0f3mx8.jpg)
### 选择磁盘 创建新虚拟磁盘
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdfxw6zzj30fp0f2jrm.jpg)
### 指定磁盘容量（相当于手机的存储空间，建议不小于4G） 我设的64G
选择 将虚拟磁盘拆分成多个文件 下一步
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdgrhlolj30fs0f7aad.jpg)
### 指定磁盘文件 默认就好 依次下一步 单击完成
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdhas1btj30fs0f60st.jpg)
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdhnpkpbj30fr0fbt8y.jpg)
到此虚拟机创建成功
## 在虚拟机中安装凤凰系统
最新版本的凤凰系统有广告，分享一个没有广告的凤凰系统映像文件
百度网盘分享 提取码: 8y1u
[https://pan.baidu.com/s/1I5lDSVenk3JFM5k9O_FJOw](https://pan.baidu.com/s/1I5lDSVenk3JFM5k9O_FJOw)
### 单机编辑虚拟机设置
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdmkm7awj30af0dmglw.jpg)
### 选择显示器，将3D图形中的 加速3D图形 勾选（建议勾选，否则可能无法进入凤凰系统）
图形内存中的显示缩放比例 根据自己需要进行勾选
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdpt64hwj30ns07jmxe.jpg)
### 选择CD/DVD 找到连接中的 使用ISO映像文件，将下载的凤凰系统ISO文件导入进来
![](https://tva1.sinaimg.cn/large/007X8olVly1g8fdrlyqasj30na09d3yr.jpg)
最后，单击确定，单击开启此虚拟机，进入凤凰系统安装页面
接下来的操作可以参考 [凤凰系统官方教程](http://www.phoenixos.com/help/installation)
找到.iso镜像文件如何使用
里面提供了两个教程，建议选择 适用于Legacy引导的单凤凰系统安装教程（传统的MBR引导模式）
这里简单描述，文字说明
1.单击开启此虚拟机，选择“Installation Phoenix OS to Harddisk”
2.选择安装磁盘
安装程序会检测磁盘的信息并列出。选择“Create/Modify partitions”新建分区表；
3.创建完成会询问是否使用GPT分区。这里使用Legacy引导方式，我们选择“No”
4.此时会进入到分区工具界面：左右方向键选择“New”，新建一个分区；
5.选择“Primary”新建一个主分区
6.选择分区大小，这里我们把所有剩余大小都分给这个分区，所以不用修改直接按“Enter”；
7.左右方向键选择“Bootable”，把这个分区设置为可以引导的分区；
8.左右方向键选择“Write”，保存我们的修改；
9.分区工具会询问是否确定保存，输入“yes”确认；
10.左右方向键选择“Quit”，退出分区工具；
11.退出后可以在分区选择列表中看到我们新分的sda1，选择它安装Phoenix OS；
12.格式化磁盘 选择EXT4
13.是否安装EFI引导项：选择跳过
14.是否安装Grub：选择“Yes”（安装MBR引导）
15.安装完成，重启电脑，进入凤凰系统页面
## 可能会出现的问题
### 启动虚拟机后，没有进入凤凰系统，卡在`A N D R O I D x86_64:/ #`不动
出现这个问题的原因是因为显示配置问题，两种解决办法
1.在进入凤凰系统启动项后 连续按两次 e ，进入一个编辑模式，在SRC=/PhoenixOS 后面添加 nomodeset
中间要有空格 即 SRC=/PhoenixOS nomodeset
回车返回到上一页，按 b 启动凤凰系统，凤凰系统成功启动
缺点：每次启动都需要重复此操作
2.编辑虚拟机设置——>选择显示器，将3D图形中的加速3D图形勾选，凤凰系统成功启动（此方法一劳永逸）
### 凤凰系统分辨率调高后，文字变小
分辨率越高，文字越小，这个是正常现象，通过修改显示密度可将文字变大