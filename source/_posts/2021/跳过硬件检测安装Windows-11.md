---
title: 跳过硬件检测安装Windows 11
date: 2021-09-05 19:38:06
tags: 教程
---
>这台电脑无法运行 Windows 11？
此版本的 Windows 不支持该处理器？
<!--more-->
如何绕过硬件检测安装Windows 11操作系统？
如果通过官方镜像文件安装Windows 11，答案很简单：删除`appraiserres.dll`文件运行安装程序。
截至目前，官方发布的Windows 11镜像文件，跳过硬件检测，使不满足最低硬件要求的设备安装此系统，均可使用此方法。
1. 下载官方镜像文件（.iso）解压到指定文件夹。
2. 打开解压后的文件夹，点击【sources】文件夹 。
3. 选择【appraiserres.dll】文件并将其删除。
4. 再次打开解压后的文件夹，运行【setup.exe】（Windows 11安装程序）即可。