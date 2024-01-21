---
title: git常用命令
tags: []
date: 2024-01-21 17:31:53
---
最近开发中使用到了很多git命令，这里记录一下
<!--more-->
1. git clone
将git仓库克隆到本地
2. git satus
查看本地仓库状态，主要是看有哪些内容没有提交，或者是查看内容修改的对不对
3. git branch -a
查看git仓库中的所有分支
4. git checkout
将本地的git仓库切到指定分支
5. git rebase
多分支时会使用。一般是解除分支竞合时使用的，或者将别人的分支作为自己的base
6. git rebase --continue
解除竞合时，可能需要取入base的多个记录，取入一个记录后，还需要继续rebase取入下一个记录
7. git rebase --abort
rebase途中取消rebase
8. git log
查看本地git提交记录，按q退出记录查看
9. git reset --soft
重置本地记录到git log中的指定版本
10. git commit -m
git记录提交时的文言描述，-m参数指定在当前命令中编辑文言内容，不加-m参数则会打开git默认编辑器编辑文言内容，git的默认编辑器是vim，建议手动修改
11. git push
将本地git仓库推送到远程仓库
12. git push --force-with-lease
本地git仓库记录与远程仓库不一致时使用，将本地仓库记录强制推送到远程git分支
