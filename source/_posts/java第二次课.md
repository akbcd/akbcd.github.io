---
title: java第二次课
date: 2019-05-27 15:21:18
tags: java
---
## 上节课回顾
1.变量的三要素
数据类型  变量名  初始化值
2.数据类型都有什么？
基本数据类型 和 引用数据类型
<!--more-->
基本数据类型有：
整型：byte short int long 
默认是int 占四个字节 一个字节占八位（bit）
byte -128~127
long 后面必须加 l
浮点：double float
默认是double
float 后面必须加 f
字符：char
单引号引起来的单个字符
ASII码
"\" 转义字符
布尔：boolean
true 和 false
3.数据类型转换规则
char,byte,short,在运算时，先把自身转换成 int 再运算
小的向大的转换   自动转换
大的向小的转换   强制转换
混合运算，结果是最大的数据类型
boolean 不参加转换
4.运算符
& 与 && 的区别
&& 如果第一个表达式是错的，对整个式子有影响，第二个式子就不执行了，提高效率
5.程序设计结构
顺序和分支
分支包括：
单分支：if(boolean类型)
多分支：if(){} else if(){} ... else{}
## 本次课主要内容
### 多分支
```
switch(常量表达式){
    case 常量1 :语句;
    case 常量2 :语句;
    case 常量3 :语句;
    ...
    case 常量n:语句;
    default :语句;
}
```
常量表达式只能是 int 兼容的（short byte char int）,jdk1.5能放枚举，jdk1.7能放 String
问题：switch 和 else if 区别
答：switch 里面放的是定值，else if 放的是区间值
### 循环结构
for,  while,  do while
它们三个区别？
什么时候用 for ：当知道具体循环次数的时候用 for
什么时候用 while ：不知道循环次数
什么时候用 do while ：首次条件不成立，也想执行
**跳出语句**
break 跳出整个循环
continue 跳出当次循环，然后继续循环
### 数组
**1.为什么要学习数组？**
方便查询一些数据和管理数据
**2.数组的含义**
相同数据类型，统一管理
**3.声明数组的方式**
动态声明
`数据类型 [] 数组名=new 数据类型[长度] `
注意：这个长度一定要给
例子：
```
int [] a = new int[3];//创建一个长度为三的名为a的数组
int a [] = new int[3];//[]位置可以在数组名前或名后
```
静态声明
`int [] a={1,2,3};`
对 `new 数据类型[长度]` 直接进行赋值
**4.如何访问数组里面的元素**
利用下标从0开始到长度-1
**5.数组有个属性：长度**
数组名.length
**6.冒泡排序的原理以及写法**
相邻两个数比较
两层for循环
外侧for 控制循环的趟数
内侧for 控制每趟的次数
例子：
```
public class TestMaoPao {
	public static void main(String[] args) {
		// 我们对于下面的数组进行从小到大的排序，利用冒泡
		int [] arr={5,2,6,3,1};
	/*
	 * 分析
	 * 冒泡 原理：  比较相邻俩个数的大小
	 */
		for(int i=0;i<arr.length-1;i++){
			for(int j=0;j<arr.length-1-i;j++){
				// 比较相邻的俩个数 
				int temp=0;
				if(arr[j]>arr[j+1]){
					// temp是空的
					temp= arr[j];
					// arr[j]空了
					arr[j]=arr[j+1];
					arr[j+1]=temp;
				}
			}
		}
		//利用for循环输出数组 arr
		for(int i=0;i<arr.length;i++){
			System.out.print(arr[i]+"  ");
		}
	}
}
```
**7.二维数组**
比一维数组写法上多了一个中括号
注意：二维数组里的长度，一定要从高维向低维给长度
**8.如果数组里面的元素，没有显示的赋值，系统提供默认的初始值**
整型 0，浮点 0.0，boolean 是false,String 是null;
**9.数组属于什么数据类型呢？**
引用数据类型，java除了8种基本数据类型之外，其他都是引用数据类型
**10.数组的扩容**
System.arraycopy(原数组,从原数据哪里开始复制,目标数组,从目标数组哪里粘贴,粘贴的长度);
例子：
```
public class TestShuZuKuoRong {
	public static void main(String[] args) {
		int [] arr={3,2,5};
		// 我的需求 现在想要 再添加2个元素
		int [] dest=new int[arr.length*2];//创建一个新数组dest 使长度为原数组的2倍
		System.out.println(dest[0]);//此时输出的数组值为0
		System.arraycopy(arr, 0, dest, 0, arr.length);//数组扩容
        //添加两个元素
		dest[3]=6;
		dest[4]=9;
        //扩容后的数组进行输出
		for(int i=0;i<dest.length;i++){
			System.out.print(dest[i]+"  ");
	}
}
```
### 函数
**1.为什么学习函数**
方便管理  完成特定的代码块就是函数
**2.函数的格式**
public static 返回值类型 方法名(参数){
    return 语句；
}
返回值类型：
8种基本数据类型
引用数据类型
void
例子：
```
public class TestMethod {
	public static void main(String[] args) {
		// 有一个需求 ，要打印 50个 $符号
        //调用函数getChar
		getChar(50, '$');
		System.out.println();
		// 2.0版本 更改需求 ，要输出 100个 #号
		getChar(100, '#');
		System.out.println();
		//  要输出  30个 @符号
		getChar(30, '@');
		getChar(70, '我'); // 函数的调用 
		System.out.println();
        //将sum函数返回值赋值给result
		double result=	sum(1, 1);
		System.out.println(result);
        //将getName函数返回值赋值给name
		String name=getName();
		System.out.println(name);
		System.out.println(sum(100, 100));
	}
	// 函数 
	public static  void getChar(int num,char c){
		for(int i=1;i<=num;i++){
			System.out.print(c);
		}
	}
	// 求2个数的和？
	public static double sum(int a,int b){
		return a+b;	
	}
	// 显示你自己的姓名 
	public static String getName(){
		return "奥特曼";
	}
}

```
函数命名规范
多由两个英文单词组成：第一个英文单词小写，第二个英文单词首字母大写，第三个英文单词首字母大写，以此类推
如果是一个英文单词，不需要大写
例子：
getChar()
name()
***
**以下是Java第二次作业及答案**
```
1、一球从100米高度自由落下，每次落地后反跳回原高度的一半；再落下，求它在     第10次落地时，共经过多少米？第10次反弹多高？ 
public class Test1 {

	public static void main(String[] args) {
		//定义初始高度s,每次弹起时高度n,走过的路程sum
		float s=100.0f,n=0,sum=0;
		int i; 
		for(i=1;i<=10;i++) { 
		n=s/2;//s为初始高度，n为每次谈起的高度 
		sum=sum+s+n; //sum初始值为0 
		s=n;//变化下一次的弹起的初始高度 
		}
		//输出结果
		System.out.println("第10次落地时，共经过多少米:"+sum);
		System.out.println("第10次反弹多高："+n);
	}

}

2、现在用程序完成如下要求
利用键盘输入 你个人的 三门学科成绩，然后，分别求出 三科成绩的平均分，最低分，最高分，三科的总分（友情提示：利用方法）
import java.util.Scanner;

public class Test1 {

	public static void main(String[] args) {
		System.out.println("请依次输入三门学科成绩：");
		Scanner sc = new Scanner(System.in);
		//将这三门学科成绩依次赋值给a,b,c
		int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        //调用getSum方法
        getSum(a,b,c);
	}
	public static void getSum(int a,int b,int c) {
		//对a,b,c从大到小排序
		if(a<b) {
			int t=a;
			a=b;
			b=t;
		}
		if(a<c) {
			int t=a;
			a=c;
			c=t;
		}
		if(b<c) {
			int t=b;
			b=c;
			c=t;
		}
		//平均分
		float s1=(a+b+c)/3f;
		//总分
		int s2=a+b+c;
		System.out.println("平均分："+s1+"最高分："+a+"最低分"+c+"总分"+s2);
	}

}

3、将下面给定的数组转置输出
   例如   原数组： 1,2,3,4,5,6
		  转置之后的数组： 6,,5,4,3,2,1
答：我认为这道题是对应位置互换
import java.util.Scanner;

public class Test1 {

	public static void main(String[] args) {
		int n, i, t;
		Scanner sc = new Scanner(System.in);
		// 获取数组长度
		n = sc.nextInt();
		int[] a = new int[n];
		for (i = 0; i < n; i++) {
			//对数组进行赋值
			a[i] = sc.nextInt();
		}
		//数组转置,第一个与最后一个换，第二个与倒数第二个换，以此类推
		for (i = 0; i < n / 2; i++) {
			t = a[i];
			a[i] = a[n-1-i];
			a[n-1-i] = t;
		}
		//转制后的数组输出
		for (i = 0; i < n; i++)
			System.out.print(a[i]+" " );
	}

}

4、现在有如下2个数组
 数组A： “1,7,5,7,9,2,21,13,45”
 数组B：  “2,5,8,14,21”
将俩个数组合并为数组C，按顺序排列输出
public class Test1 {

	public static void main(String[] args) {
		//定义两个数组a,b
		int [] a= {1,7,5,7,9,2,21,13,45};
		int [] b= {2,5,8,14,21};
		//创建数组c
		int [] c=new int[a.length+b.length];
		//对数组c进行赋值
		for(int i=0;i<a.length;i++) {
			c[i]=a[i];
		}
		for(int i=0;i<b.length;i++) {
			c[a.length+i]=b[i];
		}
		//c数组进行输出
		for (int i = 0; i < c.length; i++)
			System.out.print(c[i]+" " );
	}

}
```