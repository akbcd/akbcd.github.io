---
title: PowerShell笔记
date: 2022-10-23 07:35:30
tags: PowerShell
toc: true
---
微软powershell帮助文档
https://learn.microsoft.com/zh-cn/powershell/scripting/overview?view=powershell-7.2
## 变量的使用
支持内插方式使用，单引号不支持内插，内插时，变量和字符之间需要空格
```PowerShell
$a="aaa"
$b="$a xxx"
$b
```
输出`aaa xxx`
<!--more-->
通过`${变量名}`内插时，不需要空格
```PowerShell
$a="111"
$b="aaa${a}bbb"
$b
```
输出`aaa111bbb`

给变量添加多属性并赋值，分号分隔
```PowerShell
$a=@{name="aa";name2="bb"}
$a.name
```
输出`aa`

变量有序
```powershell
$a=[ordered]@{name="aa";name2="bb"}
```

对寄存变量追加属性并赋值
```PowerShell
$array = @(1,'hello')
$array.add("word",2)
```

获取变量成员
```PowerShell
$a | Get-Member
```

## 数组的使用
```PowerShell
$array = @(1,'hello')
$array[0]
```
输出`1`
## 换行符的使用（`）
当一行代码很长时，想手动折行，并且让程序解析成一行代码，请使用 ` （也叫重音符）

换行符 `n
```PowerShell
"aa`nbb"
```
输出
```
aa
bb
```
tab键 `t
```PowerShell
"aa`tbb"
```
输出`aa      bb`
## 产看帮助文档
当不知道命令如何使用时，可以使用`Get-Help`命令
```PowerShell
Get-Help Get-Content
```
## Get-Content的使用
`Get-Content`查看文件内容，`-Encoding`编码参数不指定时，查看文件编码为系统编码
## Import-Csv的使用
`Import-Csv`参看csv形式文件的命令，可以指定编码`-Encoding`以及区切符`Delimiter`
## 运算符的使用
`-eq` 等于
`-ne` 不等于
`-gt` 大于
`-lt` 小于
`-ge` 大于等于
`-le` 小于等于 
`-and` 且运算
`-or` 或运算
`-not` 非运算
## 注释使用
```PowerShell
#单行注释
<#
多行注释
#>
```
## 调试
powershell本身是有调试功能的：**Windows PowerShell ISE**
支持打断点，逐行执行
## 判定条件的使用
这里简单说一下if和else if
```PowerShell
$a=16
$c=$a%2
if($c -eq 1){
    echo "odd number"
}elseif($c -eq 1){
    echo "even number"
}else{
    echo "other"
}
```
需要注意的是`elseif`之间没有空格
## 管道输出符`|`
```PowerShell
Get-Children | Out-File
```
将`Get-Children`输出的结果传递给`Out-File`