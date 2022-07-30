---
title: VM虚拟机错误提示
date: 2019-10-25 21:42:24
tags: vm
---
Windows10运行虚拟机出现错误提示
VMware workstations 与 Device/credential guard不兼容。在禁用Device/ Credential Guard后，可以运行VMware Workstation

解决办法
1.关闭程序和功能中的Windows沙盒
2.关闭程序和功能中的Hyper-v
3.Windows Powershell以管理员身份运行输入命令`bcdedit /set hypervisorlaunchtype off`
如果依然不好使，可以重启测试