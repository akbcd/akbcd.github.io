---
title: 尝试使用小小电脑写github博客
tags: []
date: 2025-11-16 20:14:07
---
本篇文章记录一下使用小小电脑写博客的过程

<!--more-->
## 小小电脑
给所有安卓 9 以上 arm64 设备的“PC 应用引擎”平替。你可以在小小电脑上安装 PC 级 WPS、CAJ Viewer、亿图图示等软件。
https://github.com/Cateners/tiny_computer

## 已知问题
目前，小小电脑默认启动命令下，进入系统后无法使用git命令。
使用git命令会错误提示如下类似信息：
```
错误：无法写文件 .git/objects/dd/9273c92c9d8b12a4a4d04a5eb9cdc8f2694112: 没有那个文件或目录
错误：xxx/xxx.md：无法插入数据库
错误：无法索引文件 'xxx/xxx.md'
致命错误：添加文件失败
```
查看.git/objects/dd路径，发现git命令失败后会在路径中创建.proot.l2s.tmp_obj_v7C8r30001.0002文件
问了一下AI，AI的回复是：
小小电脑启动命令中 `--link2symlink` 会强制将硬链接转换为符号链接
Git 大量使用硬链接来优化性能（特别是在对象存储中）
这种转换会在git进行文件系统操作时产生冲突，导致临时文件残留和操作失败

## 临时解决方法
目前无法将git的硬链接关闭，只能暂时将小小电脑启动命令中的 `--link2symlink` 参数删除
删除后发现默认的AVNC无法启动，但是可以使用Termux:X11

## 折腾记录
1.安装node.js（含npm）
参照node.js官网，使用nvm安装
```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.11.1".
# Verify npm version:
npm -v # Should print "11.6.2".
```
如果第一条命令提示无法访问github.com，多试几次
2.安装hexo
```bash
npm install -g hexo-cli
```
3.配置公共密钥（前提是自己保留了密钥）
将.ssh文件夹复制到/home/用户/
4.配置密钥在Debian系统的权限
直接将密钥复制到指定位置，git是无法使用的，需要修改访问权限
```bash
chmod 600 ~/.ssh/id_rsa
```
查看权限是否修改成功
```bash
ls -l ~/.ssh/id_rsa
```
控制台显示
`-rw-------`
5.将git仓库目录添加到全局安全目录列表（因为是从电脑上直接复制过来的，无法直接使用）
```bash
git config --global --add safe.directory /media/sd/blog/akbcd.github.io
git config --global --add safe.directory /media/sd/blog/hexo-theme-yilia
```
6.配置git个人信息
```bash
git config --global user.email "xxx@xxx"
git config --global user.name "xxx"
```
之后就可以正常发布文章了
7.发布文章
```bash
git add .
git commit -m "..."
git push origin hexo
hexo g -d
```
## 杂谈
自己有一个安卓平板，想在平板上直接写博客发布文章，结果发现安卓平板根本实现不了我的需求，后来发现了小小电脑。
小小电脑是在proot容器里跑的Debian，而且linux还支持使用wine执行windows程序，折腾起来挺有意思的。
本篇文章就是在安卓平板上完成并发布的。