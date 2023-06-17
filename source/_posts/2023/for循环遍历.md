---
title: for循环遍历
date: 2023-06-17 21:42:19
tags: [笔记]
---
最近开发中，关于for循环踩了一点坑，在此记录一下。
分享一下关于for循环对数组的遍历
<!--more-->
1.从小到大依次输出
```c#
static void Main(string[] args)
{
    /*需要遍历的数组*/
    int[] i = {1,2,3,4,5};
    /*for循环对数组的值从小到大输出*/
    for (int j = 0; j < i.Length; j ++)
    {
        Console.WriteLine(i[j]);
    }
}
```
依次输出：12345
2.从大到小依次输出
```c#
static void Main(string[] args)
{
    /*需要遍历的数组*/
    int[] i = {1,2,3,4,5};
    /*for循环对数组的值从小到大输出*/
    for (int j = i.Length - 1; j > -1; j --)
    {
        Console.WriteLine(i[j]);
    }
}
```
依次输出：54321