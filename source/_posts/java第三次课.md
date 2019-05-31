---
title: java第三次课
date: 2019-05-31 13:58:04
tags: java
---
## 回顾
1.数组的定义？
统一管理相同的数据类型
2.数组的声明方式？
静态声明
动态声明 必须 给长度
<!--more-->
3.数组的使用？
通过下标，下标从0 到 n-1
4.数组长度属性？
数组名.length
5.冒泡原理？
相邻两个数比较
6.数组有没有默认值？
如果你没有显示给赋值，系统默认有值，int 是 0，String 是 null
### 方法的格式？
```
public static 返回值类型 方法名(参数列表){
    return 语句；
}
```
### 返回值类型都可以有什么类型？
1.8种基本数据类型
2.void
3.引用类型
## 本次课主要内容
### 方法重载
1.什么是方法重载？
方法名必须相同，参数列表必须不同(数据类型，个数)，返回值类型是否相同不影响重载
2.方法重载的好处？
方法重载就是为这种方法提供多种可能性。
例子
```
public class TestOverLoad {
	public static void main(String[] args) {
		sum(1, 1);
	}
	// 完成 2个数的和
	public static double sum(int a,int b){
		return a+b;
	}
	// 完成 3个数的和
	public static double sum(int a,int b,int c){
		return a+b;
	}
	// 完成 2个 浮点 和
	public static float sum(double a,float b){
		return (float)(a+b);
	}
}
```
### 面向对象
Java语言中，万事万物结为对象
所有对象抽象出来的共同点就是类
在代码中，先有类，才有对象
#### 1.类里面有什么？
属性(变量)和功能(方法)
**方法的格式？**
```
public 返回值类型 方法名(参数列表){
    return 语句
}
```
例子
```
public class Person {
	 // 属性 
	String name;
	int  height;
	char  sex;
	
	// 功能 
	public void eat(){
		System.out.println("我们可以吃");
		
	}
	// 跑
	public void run(){
		System.out.println("跑");
	}
}
```