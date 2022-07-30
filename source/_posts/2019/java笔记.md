---
title: java笔记
date: 2019-05-21 21:08:30
updated: 2022-07-30
tags: java基础
categories: [笔记]
toc: true
---
java基础内容，总共十四次课
## java第一次课
### java
####  什么是Java语言？
是计算机语言，比如：c、c++、python、c#等等
<!--more-->
####  为什么学Java？
应用广，就业快，好！目前十五年内，Java还是前三名
####  如何创建Java文件？
* jdk==《Java软件安装包》
在官网下载jdk,安装好jdk和jre,配置环境变量path值
jdk文件安装目录复制一个到bin的路径
计算机->属性->高级系统设置->环境变量->在path中编辑->新建->值就是你复制的路径
* 如何验证环境变量是否配置成功？
在cmd中输入
java -version
出现jdk版本号即为成功
####  学习Java
我们目前讲的是Java基础，相当于英文中的26个字母地位，如果26个字母没学会，Java基础之后就费劲了
* Java的历史背景
Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。Java具有简单性、面向对象、分布式、健壮性、安全性、平台独立与可移植性、多线程、动态性等特点。Java可以编写桌面应用程序、Web应用程序、分布式系统和嵌入式系统应用程序等。
* 真正认识什么是Java代码
新建一个java文件
在cmd中输入
D：回车`---`进入指定的盘符D
cd 文件夹名 回车`---`进入指定的文件夹
编译命令：javac 文件.java 回车
你会看到生成一个文件.class文件
运行命令：java 文件
* 环境变量为什么要配置到bin文件夹？
bin文件夹中有java相关的exe文件
####  eclipse编译快捷键
main alt+? `---` 快速创建main方法
运行 ctrl+f11、右键run as、绿色按钮
syso alt+? `---` 快速创建System.out.println()
####  正式进入Java基本语法
* 学会注释
让看代码的人，能快速看懂代码，因为你可能去看别人的代码，有可能你代码也被别人看
// `---` 单行注释
`/* */` `---` 多行注释
`/** */` `---` 文档注释
* 什么是标识符（你自己代码中起名字的地方）
由数字、字母、_、$组成
不能由数字开头
不能是Java关键字
语义化，驼峰标识 首字母大写，其他的单词首字母也大写
目前来说，class后面的那个名首字母也大写
* 什么是关键字？
就是Java里面有一定意义的单词，都是小写字母
Java有两个保留关键字 const goto
####  注意：
Java严重区分大小写
每一条语句都要以分号结束
* Java有几种数据类型？
两种：基本数据类型和引用数据类型
8种基本数据类型
整形：byte(-128 ~ 127)，short(-2的15次方 ~ 2的15次方-1)，int(-2的31次方 ~ 2的31次方-1)，long(-2的63次方 ~ 2的63次方-1)
浮点：float，double
字符：char
布尔：boolean
* 问题：
整型默认是什么类型？
int类型 占用4个字节 1字节等于8bit 1字符占2字节
浮点默认是什么类型？
double
float后面加什么？ f
long后面加什么？ l
char后面都可以放什么？ 用单引号引起来的单个字符、数字、转义字符
boolean的值有什么？ true false
* 声明变量，变量三要素
数据类型 变量名 初始化值
***
####  数据类型转换
数据类型的大小 byte-short-char,int,long,float,double
1.表数范围小的向大的转换是 自动转换
2.表数范围大的向小的转换是 强制转换
3.short,byte,char在做运算的时候，自身先转换成int再运算
4.混合运算时，结果为最大的数据类型
5.boolean不参加运算
####  Java的运算符
1.算术运算符
`+，-，*，/，%，++，--`
/和%的区别？
%是余数，/是商
2.关系运算符
`>,<,>=,<=,==,!=`
3.逻辑运算符
`&，|，！，&&，||`
&与&&区别？
&&短路与，如果第一个式子为false，第二个式子不执行
4.扩展运算符
`+=，-=，*=，/*`
例子：a+=b 等价于 a=a+b
5.连接符 +
String类型的式子，遇到任何类型 结果都是String 类型
6.赋值符号 =
7.三目运算符
boolean表达式？值1:值2  如果前面的式子是真的，执行值1，否则执行值2
####  程序设计结构
1.顺序结构：自上而下，自左而右
2.分支
单分支
* if(){}else{}
多分支
* if{}else if(){}...else{}
***
**以下是Java第一次课作业及答案**
```
1、再cmd 里 打印出，你个人的基本信息（例如：班级啦，姓名啦，专业啦等等）
图片略
源代码如下：
public class Test1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("班级");
		System.out.println("姓名");
        System.out.println("专业");
	}
}

1. （标识符命名）下面几个变量中，那些是对的？那些是错的？错的请说明理由
A. ILoveJava
B. $20
C. learn@java
D. antony.lee
E. Hello_World
F. 2tigers
答：A没有问题 B没有问题 C@不能用作标识符 D.不能用作标识符 E没有问题 F不能以数字开头

1.（操作符）有如下代码：
int a = 5;
int b = (a++) + (--a) +(++a);
问执行完之后，b 的结果是多少？
答：16

2. （基本类型的运算）一家商场在举行打折促销，所有商品都进行8 折优惠。一
位程序员把这个逻辑写成：
short price = ...; // 先计算出原价
short realPrice = price * 8 / 10; //再计算出打折之后的价格
问：这段代码是否正确？如果正确，假设price  为100 ，那计算之后的
realPrice值为多少？如果不正确，应该怎么改正？
把完整代码写出来
答：不正确
short realPrice = price * 8 / 10改为float realPrice = price * 8 / 10f
完整代码
public Price{
public static void main(String args[]){
short price=100;
float realPrice = price * 8 / 10f;
System.out.println("打折后的的价格为："+realPrice);
}
}

3.关于运算符的作业
	随机给出一个五位数的彩票号码（正整数），程序输出该彩票号码中的数字及相关信息
		1）在主类的main方法中声明一个用于存放彩票号码的int型变量ticketNumber，以及
    用于存放彩票号码中个位、十位、百位、千位和万位上数字的byte型变量a1、a2、a3、
    a4和a5。
                2）?依次求出ticketNumber中个位、十位、百位、千位和万位上的数字，并将这些数字依
    次赋值给变量a1、a2、a3、a4和a5。
                3）输出表达式a1+a2+a34-a4+a5的值。
                4）输出表达式a1*a2*a3*a4*a5的值。
答：Java程序代码
public class Test1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int ticketNumber=45555;
		byte a1,a2,a3,a4,a5;
		a1=(byte) (ticketNumber%10);
		a2=(byte)(ticketNumber/10%10);
		a3=(byte)(ticketNumber/100%10);
		a4=(byte)(ticketNumber/1000%10);
		a5=(byte)(ticketNumber/10000);
		System.out.println(a1+a2+a3+a4+a5);
		System.out.println(a1*a2*a3*a4*a5);
	}
}

1.（ if 语句） *中国的个税计算方法：
应税所得为税前收入扣除2000 元（起征点），然后超出部分，按照以下税率
收税：
500 5%
500-2000 10%
2000-5000 15%
5000-20000 20%
20000-40000 25%
40000-60000 30%
60000-80000 35%
80000-100000 40%
100000 - ? 45%
例：若月收入15000，则应税所得为15000-2000=13000；总的个人所得税为
（ 13000-5000） *20% + （ 5000-2000） *15% + （ 2000-500） *10% + 500*5%= 2225
要求：读入一个整数，表示税前收入，输出应当缴纳的个人所得税和税后实
际收入。
答：Java代码
import java.util.*;

public class Test1 {

	public static void main(String[] args) {
		System.out.println("请输入月收入：");
		Scanner sc=new Scanner(System.in);
		int s=sc.nextInt();
		int s1;
		float s2,s3;
		if(s>2000) {
			s1=s-2000;
			if(s1<=500) {
				s2=s1*0.05f;
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>500&s1<2000) {
				s2=(float)((s1-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=2000&&s1<5000) {
				s2=(float)((s1-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=5000&&s1<20000) {
				s2=(float)((s1-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=20000&&s1<40000) {
				s2=(float)((s1-20000)*0.25+(20000-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=40000&&s1<60000) {
				s2=(float)((s1-40000)*0.3+(40000-20000)*0.25+(20000-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=60000&&s1>80000) {
				s2=(float)((s1-60000)*0.35+(60000-40000)*0.3+(40000-20000)*0.25+(20000-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else if(s1>=80000&&s1<100000) {
				s2=(float)((s1-80000)*0.4+(80000-60000)*0.35+(60000-40000)*0.3+(40000-20000)*0.25+(20000-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}
			else {
				s2=(float)((s1-100000)*0.45+(100000-80000)*0.4+(80000-60000)*0.35+(60000-40000)*0.3+(40000-20000)*0.25+(20000-5000)*0.2+(5000-2000)*0.15+(2000-500)*0.1+500*0.05);
				s3=(float)(s-s2);
				System.out.println("应当缴纳的个人的所得税为："+s2);
				System.out.println("税后实际收入为："+s3);
			}	
		}
		else {
			System.out.println("应当缴纳的个人的所得税为：0");
			System.out.println("税后实际收入为："+s);
		}
	}
}
```

## java第二次课
### 上节课回顾
1.变量的三要素
数据类型  变量名  初始化值
2.数据类型都有什么？
基本数据类型 和 引用数据类型
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
### 本次课主要内容
####  多分支
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
####  循环结构
for,  while,  do while
它们三个区别？
什么时候用 for ：当知道具体循环次数的时候用 for
什么时候用 while ：不知道循环次数
什么时候用 do while ：首次条件不成立，也想执行
**跳出语句**
break 跳出整个循环
continue 跳出当次循环，然后继续循环
####  数组
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
####  函数
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

## java第三次课
### 回顾
1.数组的定义？
统一管理相同的数据类型
2.数组的声明方式？
静态声明
动态声明 必须 给长度
3.数组的使用？
通过下标，下标从0 到 n-1
4.数组长度属性？
数组名.length
5.冒泡原理？
相邻两个数比较
6.数组有没有默认值？
如果你没有显示给赋值，系统默认有值，int 是 0，String 是 null
####  方法的格式？
```
public static 返回值类型 方法名(参数列表){
    return 语句；
}
```
####  返回值类型都可以有什么类型？
1.8种基本数据类型
2.void
3.引用类型
### 本次课主要内容
####  方法重载
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
####  面向对象
Java语言中，万事万物结为对象
所有对象抽象出来的共同点就是类
在代码中，先有类，才有对象
##### 1.类里面有什么？
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

## java第四次课
### 回顾
1.类里面有什么？
属性 和 功能
属性：变量    功能：方法
2.变量声明格式？（变量三要素）
数据类型 变量名 初始值
3.方法的格式？
public 返回值类型 方法名(参数列表){
    return 语句;
}
### 本次课主要内容
####  变量的分类
局部变量：在方法内，语句块内的变量是局部变量
全局变量（成员变量）：在方法外，类体内是成员变量
区别：局部变量使用前，必须赋初始值
成员变量，如果没有赋初始值，系统默认提供初始值，和数组的元素一样
整形是0 浮点是0.0 String是null
局部变量作用域只在临近大括号内有效
####  创建对象方法？
类名 对象名=new 类名();
####  调用类里面的成员
对象名.成员(属性和功能)
####  构造方法
方法的标志   小括号()   数组标志   中括号[]
构造方法的格式
```
public 类名(){

}
```
注意：构造方法没有返回值类型！方法名必须和类名相同
构造方法的规则？
构造方法不用程序员手动调用，系统在创建对象时自动调用
如果没有显式声明构造方法，系统默认提供一个无参的构造
构造方法的作用？
1.初始化对象
2.给成员变量赋初始值，创建对象
####  关键字 this
代表当前对象，区分成员变量和局部变量重名的问题
### 面向对象的三（四）大特征
封装 继承 多态 （抽象）
####  封装
把一样东西，包装起来，目的是为了保证里面的东西安全
总结：就是把属性私有化，然后通过get set 方法 操作属性
####  继承
1.java的四个权限修饰符
public：整个项目下都可以访问
private：只能本类下使用
缺省的：同包下能使用
protected：不同包下有继承关系的
能修饰什么？ 变量 方法 public能修饰类
2.什么是包？
区分 各个文件的 命名冲突问题，还有一个目的就是利于管理
如何命名包？ 包的所有书写都是小写字母，然后用点管理每一层，其实就是个文件夹
包的关键字 package
建包时：
1）公司域名倒过来
2）公司域名 com net cn edu org
import 导入要用的其他包
java里面唯一一个特殊的包，java.lang 不用程序员手动调用，系统自动导入
3.继承
1）关键字extends
好处：子类可以继承父类除了private的其他成员
例子：
```
package org.jsoft.extends0;//包的命名
//父类
public class Animal {
	// 属性   
	private String  name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	// 功能
	 void run(){
		System.out.println("我跑完就会 前进一段距离");
	}
}

```
```
package org.jsoft.extends0;
//继承父类Animal
public class Cat extends Animal{
	public static void main(String[] args) {
		Cat  c=new Cat();
		c.run();
		
	}
	public void run(){
		System.out.println("我用四条腿跑再加尾巴跑");
	}
}
```
2）方法重写
子类不能满足父类方法的实现
格式：方法声明部分一样，方法内容不同
注意：声明部分 权限可以修改，子类的修饰符可以比父类的修饰符权限高
例：父类为缺省修饰符时
子类可以改为public
**方法重载和方法重写的区别？**
```
java的重写,是指在子类中对父类的某方法进行重新定义,其子类的该方法名以及参数位置和个数均与父类相同,从而在调用子类的该方法时,不会执行父类的方法。如果在父类中以final定义的方法,在子类中无法重写。
Java的重载，就是在类中可以创建多个方法，它们具有相同的名字，但具有不同的参数和不同的定义。调用方法时通过传递给它们的不同参数个数和参数类型来决定具体使用哪个方法, 这就是多态性。
重写就是再写一遍，重载就是再多一个。重写：父类里有，子类再照猫画虎写一个。重载：自己类里面有，觉得不够再写一个。 
```
3）java只支持单继承
4）子类想调用父类的构造函数 super

## java第五次课
### 回顾
1.如何创建类？类里面有什么？
属性（变量） 和 功能（方法）
2.变量的分类？
局部变量：在方法内，语句块内容
全局（成员）变量：在方法外，类体内
区别：作用域不同，局部变量临近大括号有效
局部变量要使用的话必须赋初值，成员变量有默认的初始值
boolean默认是false String默认是null
3.如何创建对象？对象的成员调用？
类名 对象名=new 类名();
对象名.成员
4.面向对象的四大特征？
封装，继承，多态，抽象
5.构造方法的规则？格式？作用？
public 类名(参数列表){}
规则：如果一个类没有显示声明构造，那么系统默认提供一个无参的构造方法，不用程序员手动调用
格式：方法名必须与类名相同，没有返回值类型
作用：创建对象和初始化对象
6.封装的意义？写法？
把属性私有化，目的是保护属性不被外界访问，通过set和get方法操作属性
如果给属性赋值，目前知道的办法有三种
（1）对象名.属性
（2）set方法
（3）构造方法
7.java包的书写和意义？
公司域名倒过来，所有字母都是小写，每一层用点管理
方便管理，区分命名重复
8.java的权限修饰符？
1）private：私有的，只能在本类使用
2）缺省的：同包中使用
3）protected：不同包中，有继承关系的
4）public：整个项目下
9.继承的关键字？意义？规则？
关键字：extends
意义：代码量减少，可扩展性强
规则：
java只支持单继承
子类继承父类除private的其他成员
子类不能满足父类的方法，我们可以重写
**10.重载和重写的区别？**
重载：发生在一个类里面，方法名必须相同，参数列表必须不同（类型，顺序）
重写：方法声明部分一样，唯独权限可以不一样，子类可以比父类大，实现部分不同
11.this和super的作用？
this代表当前对象，可以区分成员变量和局部变量重名问题
super代表父类对象，可以调用父类成员
### 本次课主要内容
1.继承中的构造方法规则
构造方法能否重载？能否重写？
能重载，不能重写
1）子类在构造自己的过程中，先构造父类
2）如果一个父类没有显示声明无参的构造，只有有参的构造，那么父类必须要有有参的构造，而且用super调用父类构造
3）this调用本类其他构造，super调用父类构造 必须都写在第一行
例子：
**以下程序写出输出结果**
```
class Super{
    public Super(){
        System.out.println("Super()");
    }
    public Super(String str){
        System.out.println("Super(String)");
    }
}
class Sub extends Super{
    public Sub(){
        //此处省略了super();
        System.out.println("Sub()");
    }
    public Sub(int i){
        this();
        System.out.println("Sub(int)");
    }
    public Sub(String str){
        super(str);
        System.out.println("Sub(String)");
    }
}
public class TestSuperSub{
    public static void main(String args[]){
        Sub s1=new Sub();
        Sub s2=new Sub(10);
        Sub s3=new Sub("hello");
    }
}
```
**输出结果：**
```
Super()
Sub()
Super()
Sub()
Sub(int)
Super(String)
Sub(String)
```
2.抽象 关键字 abstract
1）在父类里，某些方法，不需要方法的实现，都是子类重写的，这样的方法，我们就不需要方法体，这就是抽象方法
2）有了抽象方法，这个类必须是抽象类
3）如果一个类是抽象类，那么里面的方法不一定都是抽象方法
4）抽象类能否实例化（创建对象）？
不能实例化，认为它是不完整的
5）抽象类被子类继承时，抽象方法必须被重写
6）抽象类是否能有构造方法？
可以，子类构造自己的时候，先构造父类

## java第六次课
### 回顾
抽象的关键字？
abstract
抽象的规则？
* 当一个方法，我们不需要实现的时候，我们就不写方法体，这就是抽象方法
* 如果一个类有抽象方法，那么这个类必须是抽象类
* 抽象类不能实例化，被子类继承时，父类引用指向子类对象
* 抽象方法必须被子类重写
java源文件第一条语句是什么？
package语句
目前写代码的编程规范？
* class名字必须首字母大写，驼峰标识
* 变量名和方法名必须首字母小写，驼峰标识
* 包名：所有字母都是小写，用点管理
* 每一行语句，前面要有tab键缩进
* 每一个功能、属性都要加注释
***
本节课代码较多
### 本次课主要内容
**三大特征**
封装、继承、多态
最大化利于代码的重复利用，节省代码，解耦合性
**多态**
Java多态体现在两个方面
* 方法的重载 -->编译器的多态
* 非编译期间 -->运行多态

**多态的条件？**
* 有继承关系
* 有重写方法
* 父类引用指向子类对象
好处？
* 代码量少
* 灵活
**多态最常用的两个地方**
* public viod m(父类){}
* public 父类 m (){
    return 子类;
}
####  接口
1.接口是什么？
接口是一个引用类型，interface
***
2.如何创建接口，接口里面有什么？
常量和抽象方法
常量：不变的变量
抽象方法：没有方法体，且有abstract关键字
***
3.java的修饰符
java中有四个权限修饰符，分别为private,default,protected,public,下面主要是四者之间的区别： 
* private(私有的) 
private可以修饰成员变量，成员方法，构造方法，不能修饰类(此刻指的是外部类，内部类不加以考虑)。被private修饰的成员只能在其修饰的本类中访问，在其他类中不能调用，但是被private修饰的成员可以通过set和get方法向外界提供访问方式 
* default(默认的) 
defalut即不写任何关键字，它可以修饰类，成员变量，成员方法，构造方法。被默认权限修饰后，其只能被本类以及同包下的其他类访问。 
* protected(受保护的) 
protected可以修饰成员变量，成员方法，构造方法，但不能修饰类(此处指的是外部类，内部类不加以考虑)。被protected修饰后，只能被同包下的其他类访问。如果不同包下的类要访问被protected修饰的成员，这个类必须是其子类。 
* public(公共的)
 
public是权限最大的修饰符，可以修饰类，成员变量，成员方法，构造方法。被public修饰后，可以在任何一个类中，不管同不同包，任意使用。 
1个抽象修饰符：abstract
```
public abstract class Animal {
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public abstract void enjoy();
}

```
```
public class Monkey extends Animal{

	@Override
	public void enjoy() {
		System.out.println(getName()+"的宠物，它开心就会"+"吃香蕉");
	}

}
```
```
public class Pig extends Animal{

	@Override
	public void enjoy() {
		System.out.println(getName()+"的宠物，它开心就会"+"哼哼叫");	
	}
    // 猪也会有 别的动物没有的功能
	public void  gongDi(){
		System.out.println("猪猪会拱地");
	}
}
```
```
public class Person {
	// 属性
	private String  name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	// 功能
	public void feed(Animal p){ //  
		System.out.print("我叫"+name+"我养了一个叫");
		p.enjoy();
	}
```
```
public class TestPAndP {
	public static void main(String[] args) {
		// 标识 姜雪琪这个人
		Person p =new Person();
			p.setName("姜雪琪");
		Animal p1=new Pig(); // 父类引用指向了子类对象  向上转型     自动转换
			p1.setName("小升升");
		p.feed(p1);
		  //p1是否能访问拱地方法？   不能访问，如果想访问就必须强制类型转换
		 Pig  pp=(Pig)p1; // 向下转型   强制转换
		pp.gongDi();
			
		Person p2 =new Person();
		p2.setName("张旭");
		Animal m=new Monkey();
		m.setName("孙大圣");
		p2.feed(m);
	}
}

```
1）static修饰符 静态的
变量：可以用来使用计数器
```
public class TestStaticHW {
	public static void main(String[] args) {
		MyClass  m1=new MyClass();
		System.out.println(m1.i); // 20  10
		MyClass  m2=new MyClass(10);
		System.out.println(m2.i); //10
	}
}


class MyClass{
	static int i=10;
	static {
		int i=20;
		System.out.println("IN Static");
	}
	public MyClass(){
		System.out.println("无惨的");
	}
	public MyClass(int i){
		System.out.println("有惨的");
		this.i=i;
	}
}
```
2）final修饰符 最后的（与接口一起使用）
变量：修饰的变量，值就不能改变了，因为就是常量了
方法：修饰的方法，不能被重写了
类：修饰的类，不能被继承
3）总结7个修饰符
4个权限：public protected 缺省的 private
抽象：abstract
静态的：static
最后的：final
***
4.接口的意义
接口可以实现多继承，关键字：implements
接口里面的所有方法都必须重写
接口不能实例化
接口不能有构造方法
***
定义两个接口
```
public interface Person {
	
	void  eat(); // 省略了  public abstract	
	void  sleep();	
}
```
```
public interface Student {	
	public abstract void study();
}
```
继承（调用）接口
```
public class BigStudent implements Person,Student{

	@Override
	public void study() {
		System.out.println("60分万岁，多一份浪费");
	}

	@Override
	public void eat() {
		System.out.println("外卖");
	}

	@Override
	public void sleep() {
		System.out.println("白天睡，晚上活动");
	}

}
```
测试
```
public class TestSAndP {
	public static void main(String[] args) {
		// 接口能否实例化？
		 // 接口就是一个特殊的抽象类
		Person  p =new BigStudent();
		p.eat();
		p.sleep();
		Student s =new BigStudent();
		s.study();
	}
}
```
***
final测试
```
public class FinalTest extends TestF{
	final int k=11; //如果一个成员变量是fianl 必须 赋初始值
	   int q;
	public static void main(String[] args) {
		final  int i=10;
	    //不能修改	i=11;
		     int j=10;
		     j=11;
	}
	
	public final void m(){}
	public void m1(){}
}


//final class TestF{}  不能被继承


class  TestF{
	public final void m(){}
	
	public void m1(){}
}
```
StaticTest.java
```
public class StaticTest {
	public static void main(String[] args) {
		// 如果我想在这个类里面使用i 
		Static1  s=new  Static1();
		Static1  s1=new  Static1();
		Static1  s2=new  Static1();
//		s.i=10;
		
//		Static1.j=10;
		System.out.println(s.i++);
		System.out.println(s1.i++);
		System.out.println(s2.i++);
		System.out.println(s.j++);
		System.out.println(s1.j++);
		System.out.println(s2.j++);
		s.m();
		m1();
//		m(); 在静态方法里面访问不了非静态成员
		
		String  name="这是什么鸟";
				}
	
	public static void m1(){}
	public void m(){}
	
}


class  Static1{
	int  i =10;// 和 对象 有关   不同对象，有不同的值，初始值都是10
	static int j=10; // 和类有关 ，是累加的 可以计数器
	
	public void m(){
		//能不能访问 i 和 j  能
		System.out.println(i);
		System.out.println(j);
	}
	public  static  void  m1(){
		System.out.println();
		//能不能访问 i 和 j   // 不能i
//		System.out.println(i);
		System.out.println(j);
	}
	
}
```
Test.java
```
public interface Test {
//	 public static void main(String[] args) {
//		
//	} 不让写
	
	/*
	 *   常量  
	 *    抽象方法
	 */
	
	public static final int I=10;// 常量命名规则，所有字母都大写
	public static final int SHEN_FEN=100;
}
```
Tabstract.java
```
public class Tabstract {
   
}


abstract  class A extends B{
//	public  abstract  void m1();
//	private abstract  void m1();
}

abstract class B{
//	abstract  final  void m();// abstract 和 final是天敌
}

class  C extends A{
//	public void final m(){}
	
	public final static  void m(){}
	//  修饰符  返回值类型  方法名 （参数列表）{}
	
	private final  void  m1(){}
	
}
```

## java第七次课
本次课主要是Java基础知识回顾以及部分习题及答案
### Java基础知识回顾
1. **类里面有什么？**
    1. 属性和方法
2. **如何创建对象？**
    1. **无参构造方法**
        1. 类名 对象名=new 类名()
    2. **有参构造方法**
        1. 类名 对象名=new 类名(参数列表)
3. **如何访问类里面的成员？**
    1. 对象名.成员
    2. 私有成员利用 get/set 方法
    3. 有参构造方法 创建对象时直接访问并修改
4. **构造方法的规则？**
    1. 没有返回值类型
    2. 方法名与类名相同
    3. 系统在创建对象时自动调用，没有显式声明，系统默认提供一个无参的构造
    4. 不能被static、final、synchronized、abstract和native修饰
    5. 构造方法不能被子类继承，所以用final和abstract修饰没有意义
5. **构造方法的作用？**
    1. 初始化对象
    2. 给成员变量赋初始值，创建对象
6. **方法重载的定义，方法重写的定义? 构造方法是否能重载？是否能重写？**
    1. 重载发生在一个类中，方法名字必须相同，参数列表必须不同（顺序，个数，类型不同），返回值类型是否相同不影响
    2. 重写：子类不能满足父类的实现。方法声明部分一样，方法内容不同
    3. 构造方法能重载不能重写
7. **this的意义？super的意义？**
    1. this代表当前对象，可以区分成员变量与局部变量重名问题
    2. super代表父类对象，可以调用父类成员
8. **一个类能创建几个对象？**
    1. 正常的一个类可以创建多个对象
    2. 抽象类无法实例化，不能创建对象
9. **类和对象的关系？**
    1. 类是对象的模板
    2. 对象是类的实例
10. **面向对象的特征？**
    1. 封装 继承 多态 抽象
11. **封装的含义，写法**
    1. 把属性私有化，目的是保护属性不被外界访问，通过set和get方法操作属性
12. **变量的分类？**
    1. 以数据类型分类
        - 基本数据类型 引用数据类型
    2. 以声明位置分类 
        - 局部变量和成员变量
    3. 实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null
    4. 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用
13. **静态成员和非静态成员的区别？**
    1. 静态成员 
	    - 随着类的加载而加载
	    - 优先于对象存在
	    - 被所有对象所共享
	    - 可以直接被类名调用
    2. 区别	
        - 两个变量的生命周期不同
	    	1. 成员变量随着对象的创建而存在，随着对象的回收而释放
	    	2. 静态变量随着类的加载而存在，随着类的消失而消失
        - 调用方式不同
	    	1. 成员变量只能被对象调用
	    	2. 静态变量可以被对象调用，还可以被类名调用
        - 别名不同 
	    	1. 成员变量也称为实例变量 
	    	2. 静态变量称为类变量
        - 数据存储位置不同 
	    	1. 成员变量数据存储在堆内存的对象中，所以也叫对象特有数据
	    	2. 静态变量数据：存储在方法区(的静态区)，所以也叫对象的共享数据
        - 静态成员可以直接访问，非静态成员需要分配内存后才能进行访问
        - 静态成员不能访问非静态成员
14. **继承的关键字？继承的意义？**
    1. 关键字
        - extends
    2. 减少代码量
    3. 意义 
        - 新类具有继承类的数据属性和行为，并可以扩展新的能力
        - 子类可以继承父类除了private的其他成员
15. **继承中的构造规则？**
    1. 子类的构造过程中必须调用父类的构造方法
    2. 子类可以在自己的构造方法中使用super(argumentList)来调用父类的构造方法;
    3. 使用this（argumentList）调用本类的其他构造方法
    4. 如果使用super(argumentList)来调用父类的构造方法，必须写在子类构造方法的第一行。
    5. 如果子类的构造方法中没有明确地调用父类的构造方法，则默认调用无参的构造方法。相当于在子类构造方法中默认执行super()
    6. 如果子类构造方法中，即没有显示地调用父类的构造方法，而基类中也没有无参的构造方法，则编译不通过。
16. **抽象类和接口的区别？**
    1. 接口里面有常量和抽象方法，有abstract关键字
    2. Java抽象类可以提供某些方法的部分实现，而Java接口不可以（就是interface中只能定义方法，而不能有方法的实现，而在abstract class中则可以既有方法的具体实现，又有没有具体实现的抽象方法）
    3. 相同点：
        - 都不能被实例化
        - 接口的实现类或抽象类的子类都只有实现了接口或抽象类中的方法后才能实例化。
    4. 不同点：
        - 接口只有定义，不能有方法的实现，java 1.8中可以定义default方法体，而抽象类可以有定义与实现，方法可在抽象类中实现。
        - 实现接口的关键字为implements，继承抽象类的关键字为extends。一个类可以实现多个接口，但一个类只能继承一个抽象类。所以，使用接口可以间接地实现多重继承。
        - 接口强调特定功能的实现，而抽象类强调所属关系。
        - 接口成员变量默认为public static final，必须赋初值，不能被修改；其所有的成员方法都是public、abstract的。抽象类中成员变量默认default，可在子类中被重新定义，也可被重新赋值；抽象方法被abstract修饰，不能被private、static、synchronized和native等修饰，必须以分号结尾，不带花括号。
        - 接口被用于常用的功能，便于日后维护和添加删除，而抽象类更倾向于充当公共类的角色，不适用于日后重新对立面的代码修改。功能需要累积时用抽象类，不需要累积时用接口。
17. **final的作用！** 
    1. final可以修饰类，这样的类不能被继承。
    2. final可以修饰方法，这样的方法不能被重写。 
    3. final可以修饰变量，这样的变量的值不能被修改，是常量。
18. **定义接口的关键字，实现接口的关键字，接口是否可以继承接口？**
    1. 定义接口 interface 
    2. 实现接口 implements
    3. 接口可以继承接口 
19. **代码块的种类，执行顺序？**
    1. 普通代码块：普通方法体中的代码,方法被调用时执行
    2. 静态代码块：用static修饰的代码 例如  static{},类加载的时候支持，只执行一次
    3. 构造代码块：直接用大括号括起来的代码块，没有方法名，没有返回类型，例如{}，对象被new的时候调用，构造对象时，先执行构造代码块里的代码，再执行构造函数里的代码，每次new对象的时候，构造代码块里的代码都会被执行
    4. 同步代码块：用synchronize注释的代码，例如synchronized{}
    5. 初始化子类的执行顺序：父类静态代码块——子类静态代码块——父类构造函数和变量初始化（按编码顺序执行）,构造代码块在构造函数前面执行——子类构造函数和变量初始化（按编码顺序执行）,构造代码块在构造函数前面执行
20. **内部类有几种？**
    1. **常规内部类**：常规内部类没有用static修饰且定义在在外部类类体中。
        - 常规内部类中的方法可以直接使用外部类的实例变量和实例方法。在常规内部类中可以直接用内部类创建对象。
    2. **静态内部类**：与类的其他成员相似，可以用static修饰内部类，这样的类称为静态内部类。静态内部类与静态内部方法相似，只能访问外部类的static成员，不能直接访问外部类的实例变量，与实例方法，只有通过对象引用才能访问。
        - 由于static内部类不具有任何对外部类实例的引用，因此static内部类中不能使用this关键字来访问外部类中的实例成员，但是可以访问外部类中的static成员。这与一般类的static方法相通。
    3. **局部内部类**：在方法体或语句块（包括方法、构造方法、局部块或静态初始化块）内部定义的类成为局部内部类。局部内部类不能加任何访问修饰符，因为它只对局部块有效。
        - 局部内部类只在方法体中有效，就想定义的局部变量一样，在定义的方法体外不能创建局部内部类的对象
            * 在方法内部定义类时，应注意以下问题：
                - 方法定义局部内部类同方法定义局部变量一样，不能使用private、protected、public等访问修饰说明符修饰，也不能使用static修饰，但可以使用final和abstract修饰
                - 方法中的内部类可以访问外部类成员。对于方法的参数和局部变量，必须有final修饰才可以访问。
                - static方法中定义的内部类可以访问外部类定义的static成员
    4. **匿名内部类**：定义类的最终目的是创建一个类的实例，但是如果某个类的实例只是用一次，则可以将类的定义与类的创建，放到与一起完成，或者说在定义类的同时就创建一个类。以这种方法定义的没有名字的类成为匿名内部类。
21. **如何给对象的属性赋值？有几种？**
    1. 对象名.属性
    2. set方法
    3. 构造方法
22. **如何判断一个引用类型是不是 另外一个引用类型？** 
    1. instanceof
23. **你所学过的修饰符，以及用法？**
    1. 权限修饰符
        - public：整个项目下
        - private：私有的，只能在本类中使用
        - 缺省的：同包中使用
        - protected：不同包中，有继承关系的
    2. final  修饰符  
        - final的意思是不可变，他可以修饰类、字段、方法。
        - 修饰类后类不能被扩展（extends），也就是不能被继承。
        - 修饰字段后字段的值不能被改变，因此如果有final修饰字段，应该对字段进行手动初始化。
        - 修饰方法后该方法不能被改变，也就是重写。 
    3. abstract修饰符 
        - abstract是抽象的意思，用来修饰类和方法，修饰类后，该类为抽象类
        - 不能被实例化，必需进行扩展。修饰方法后，该方法为抽象方法必须被子类重写（override）。 
    4. static修饰符 
        - static用来修饰内部类，方法，字段。
        - 修饰内部类说明该内部类属于外部类而不属于外部类的某个实例。
        - 修饰字段说明该字段属于类而不属于类实例。
24. **java中包的意义？**
	1. 包是便于管理项目，区分项目里面的类重名问题
25. **目前所学的书写规范？**
    1. class名字必须首字母大写，驼峰标识
    2. 变量名和方法名必须首字母小写，驼峰标识
    3. 包名所有字母都是小写，用点管理
    4. 每一行语句，前面要有tab缩进
    5. 每一个功能、属性都要加注释
***
### 部分习题及答案
####  问题1
（封装、继承、多态）创建三个类，组成一个继承树，表示游戏中的角色。
描述如下：
父类：Role。是所有职业的父类。 属性： name，表示角色的名字。 
方法：public int attack() ，该方法返回值为角色的攻击对敌人的伤害。
Role 有两个子类：
1）法师Magicer 属性：魔法等级（范围为1 ~ 10） 方法： public int attack() ，该方法返回法师的攻击对敌人造成的伤害值。 法师攻击伤害值为：魔法等级*魔法基本伤害值（固定为5）
2）战士Soldier 属性：攻击伤害值 方法： public int attack() ，该方法返回战士的攻击对敌人造成的伤害值。 战士的攻击伤害值为：其攻击伤害属性值 注意：上述的三个类所有属性都应当作为私有，并提供相应的get/set 方法。
再设计一个Team 类，表示一个组队。具有如下方法
1）addMember，表示组队增加一个成员。注意：组队成员最多为6 人 
提示：应当利用一个数组属性，保存所有成员
2）attackSum，表示组队所有成员进行攻击时，对敌人造成的总伤害值 省略 get/set 方法后的类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5lzmpj30jp08hmy2.jpg)
根据类图和描述，创建相应的类。并编写相应的测试代码。
***
**代码**
* Magicer.java

```
package jichengshu;
//法师
class Magicer extends Role {
	//魔法等级，范围1~10
	private int level;

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	//返回法师的攻击对敌人造成的伤害值。 
	public int attack() {
		return level * 5;
	}
}
```
* Role.java

```
package jichengshu;
//所有职业的父类
public class Role {
	//角色的名字
	private String name;
	 public String getName() {
	  return name;
	 }
	 public void setName(String name) {
	  this.name = name;
	 }
	 //public int attack()
	 public int attack(){
	  return 0;
	 }
}
```
* Soldier.java

```
package jichengshu;
//战士
class Soldier extends Role {
	//攻击伤害值
	private int hurt;

	public int getHurt() {
		return hurt;
	}

	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
	//返回战士的攻击对敌人造成的伤害值
	public int attack() {
		return hurt;
	}
}
```
* Team.java

```
package jichengshu;

class Team {
	static int i = 0;
	//组队成员最多为6人
	static Role member[] = new Role[6];
	//添加成员
	void addMember(Role role) {
		member[i++] = role;
	}
	//对敌人造成的总伤害
	int attackSum() {
		int sum = 0;
		for (int j = 0; j < i; j++) {
			sum += member[j].attack();
		}
		return sum;
	}
}
```
* Test.java

```
package jichengshu;

public class Test {
	public static void main(String args[]) {
		//创建Role对象
		Role role = new Role();
		//创建Soldier对象
		Soldier soldier = new Soldier();
		//新建战士
		role = soldier;
		soldier.setName("少华");
		soldier.setHurt(5);
		System.out.println("战士" + soldier.getName() + "的攻击伤害值为：" + soldier.attack());
		//创建法师对象
		Magicer magicer = new Magicer();
		//新建法师
		role = magicer;
		role.setName("君艳法师");
		magicer.setLevel(7);
		System.out.println("战士" + magicer.getName() + "的攻击伤害值为：" + magicer.attack());
		//团队对象
		Team team = new Team();
		team.addMember(magicer);
		team.addMember(soldier);
		System.out.println("所有成员的伤害总值为：" + team.attackSum());
	}
}
```
####  问题2
在之前的游戏角色 Role 程序上进行修改。
```
1） 创建 Role 接口，包含两个方法：    
    a) int attack(); 表示攻击，返回值表示对敌人的伤害    
    b) void practise(); 表示练习。练习之后对敌人的伤害会增加。
2） 创建 NamedRole 类，该类为一个抽象类，实现了 Role 接口，并有两个属性：name 和 age， 表示角色的名字和年龄。
3） 增加 MagicStick 接口。该接口表示法师使用的法杖。接口中包含一个方法，方法为： int fire()
4） 为 MagicStick 类增加两个实现类，分别为 GreenStick 和 BlackStick。其中，对于这两个类的 fire 方法：
    a) GreenStick 平时返回 1，夏天（6~8 月）使用时返回 2 
    b) BlackStic 奇数月返回 1，偶数月返回 2
5） 修改 Magicer 类  
    a) 为法师类增加 MagicStick 类的属性 stick，表示法师使用的法杖。   
    b) 让其继承自 NamedRole 类，并实现 attack 和 practise 功能。其中 
        i. attack 返回值为法师的魔法等级(level) *每一级的固定伤害(5) 
        ii. practise()方法：    
            1. 当法师的 stick 属性为 null 时，调用 practise 则 level++    
            2. 当法师的 stick 不为 null 时，调用 practise 方法时，法师的等级 level 满足： level = level + 1 + stick.fire()；即：法师的    等级增加为 1+stick 属性的 fire 方法的返回值
6） 增加 Weapon 接口，表示战士使用的武器。Weapon 接口中定义了两个方法：void setSoldier(Soldier s); 该方法表示设置武器的使用者int fire(); 该方法的返回值表示战士使用该武器时，对敌人的伤害值
7） 为 Weapon 增加两个实现了，一个为 Bolo，表示大刀，一个为 Pike，表示长矛。对这两个实现类的描述如下：Bolo : 当 soldier 的年龄大于等于 18 岁时，fire 方法返回 100当 soldier 年龄小于 18 岁时，fire 方法返回 50Pike：Pike 类有一个属性：name，表示长矛的名字。当长矛的名字和战士的名字一致时，fire 方法返回 1000；当长矛的名字和战士的名字不一致时，fire 方法返回 25
8） 修改 Soldier 类    
    a) 为 Soldier 类增加一个 Weapon 属性，表示战士的武器    
    b) 让其继承自 NamedRole 类，并实现 attack 和 practise 功能。其中        
        i. Soldier 的 attack 返回值为战士的 hurt 值与武器的 fire 方法返回值的和，即 总攻击输出 = 战士的徒手伤害值 + 武器的伤害值        
        ii. practise()方法：每调用一次则战士的 hurt 值+10
9） 编写相应的测试代码。   要求：两个人一组合作完成。一个人负责把一个整数 n 拆分成两个整数的和，另一个人负责写一个函数，判断某一个整数 a 是否是质数
```
***
**代码**
* Role.java

```
package role;

import java.util.Date;

interface Role{
	int attack();
	void practise();
}

interface MagicStick{
	int fire();
}

class GreenStick implements MagicStick{
	public int fire(){
		Date d = new Date();
		if (d.getMonth() >=6 && d.getMonth() <= 8){
			return 2;
		}else return 1;
	}
}

class BlackStick implements MagicStick{
	public int fire(){
		Date d = new Date();
		if (d.getMonth() % 2 == 0){
			return 2;
		}else return 1;
	}
}

interface Weapon{
	int fire();
	void setSoldier(Soldier s);
}

class Bolo implements Weapon{
	private Soldier s;
	public void setSoldier(Soldier s){
		this.s = s;
	}
	public int fire(){
		if (s.getAge()>=18) return 100;
		else return 50;
	}
}

class Pike implements Weapon{
	private Soldier s;
	private String name;
	public Pike(){}
	public Pike(String name){this.name = name;}
	
	public int fire() {
		if (s.getName().equals(name)){
			return 1000;
		}else {
			return 25;
		}
	}
	public void setSoldier(Soldier s) {
		this.s = s;
	}
	
}

abstract class NamedRole implements Role{
	private String name;
	private int age;
	
	public NamedRole(){}
	
	public NamedRole(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
class Magicer extends NamedRole{
	private int level = 1;
	private MagicStick stick;
	public Magicer(){}
	
	public Magicer(String name, int age,  int level) {
		super(name, age);
		if (level > 10 || level < 1){
			System.out.println("level error!");
			return;
		}
		this.level = level;
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		if (level<1 || level > 10){
			System.out.println("level error!");
			return;
		}
		this.level = level;
	}

	public MagicStick getStick() {
		return stick;
	}

	public void setStick(MagicStick stick) {
		this.stick = stick;
	}

	public int attack(){
		return level * 5;
	}

	public void practise() {
		level ++;
		if (stick != null){
			level += stick.fire();
		}
	}
}

class Soldier extends NamedRole{
	private int hurt;
	private Weapon weapon;
	
	public Soldier(){}
	
	public Soldier(String name,int age,  int hurt) {
		super(name, age);
		this.hurt = hurt;
	}

	public Weapon getWeapon() {
		return weapon;
	}

	public void setWeapon(Weapon weapon) {
		this.weapon = weapon;
	}

	public int getHurt() {
		return hurt;
	}

	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
	
	public int attack(){
		int result = hurt;
		if (weapon != null){
			result += weapon.fire();
		}
		return result;
	}

	public void practise() {
		hurt += 10;
	}
}
```
* TestRole.java

```
package role;

public class TestRole {
	public static void main(String[] args) {
		MagicStick ms1 = new GreenStick();
		MagicStick ms2 = new BlackStick();
		Magicer m1 = new Magicer("John", 20, 5);
		Magicer m2 = new Magicer("Tom", 30, 8);
		m1.setStick(ms1);
		m2.setStick(ms2);
		
		System.out.println(m1.attack());
		System.out.println(m2.attack());
		
		m1.practise();
		m2.practise();
		
		System.out.println(m1.attack());
		System.out.println(m2.attack());
		
		
		Weapon w1 = new Bolo();
		Weapon w2 = new Pike("Jerry");
		Soldier s1 = new Soldier("Tom", 19, 100);
		Soldier s2 = new Soldier("Jerry", 25, 150);

		s1.setWeapon(w1);
		w1.setSoldier(s1);
		
		s2.setWeapon(w2);
		w2.setSoldier(s2);
		
		System.out.println(s1.attack());
		System.out.println(s2.attack());
		
		s1.practise();
		s2.practise();
		
		System.out.println(s1.attack());
		System.out.println(s2.attack());
	}
}
```
####  问题3
编写一个简单的客户类SimpleCustomer
要求：
```
1.	该类拥有四个属性：
	1）	int id  代表客户代码
	2）	String name 代表客户姓名
	3）	String address 代表客户住址
	4）	String phoneNumber 代表客户电话号码
2.	构造方法：
	1） SimpleCustomer()
	2)	SimpleCustomer(int id, String name, String address, String phoneNumber)
	3)	SimpleCustomer(SimpleCustomer sc)
3.	普通方法：
	1）	一系列get/set方法
		getId(), setId(int id), 
        getName(), setName(String name), 
        getAddress(), setAddress(String address), 
        getPhoneNumber(), setPhoneNumber(String phoneNumber)
	2）	public String toString() //返回客户的基本信息，格式为：
		The customer’s information is:
		id: 100
		name: Arthur
		address: China, Beijing, Xicheng District, Xidan Time Square Building, 100036
		phoneNumber: +861012345678
4.	编写一个测试类，对SimpleCustomer类进行测试
```
***
**代码**
* SimpleCustomer.java

```
package simplecustomer;

public class SimpleCustomer {
	//四个属性
	private int id;
	private String name;
	private String address;
	private String phoneNumber;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	//三个构造方法
	public SimpleCustomer() {
		
	}
	public SimpleCustomer(int id, String name, String address, String phoneNumber) {
		
	}
	public SimpleCustomer(SimpleCustomer sc) {
		
	}
	//toString方法
	public String toString() {
		return "The customer’s information is:"+"\n"+"id:"+id+"\n"+"name:"+name+"\n"+"address:"+address+"\n"+"phoneNumber:"+phoneNumber;	
	}
}
```
* Test.java

```
package simplecustomer;

public class Test {
public static void main(String[] args) {
	SimpleCustomer a=new SimpleCustomer();
	a.setId(10);
	a.setName("Arthur");
	a.setAddress("China, Beijing, Xicheng District, Xidan Time Square Building, 100036");
	a.setPhoneNumber("+861012345678");
	System.out.println(a.toString());
	}
}
```
####  问题4
改写SimpleCustomer类，编写一个增强的Customer类
要求：
```
1.	在SimpleCustomer类的基础上，将address部分剥离出来，编写一个单独的Address类
	Address类属性：
	1）	String country  //国家
	2）	String city  //城市
	3）	String district 	//区
	4）	String detailedAddress //详细住址
	5）	int postCode //邮编
	Address类方法：
	1）	构造方法 
    Address(String country, String city, String district, String detailedAddress, int postCode)
	2）	get/set方法
	3）	toString方法 //返回地址类的基本信息，将各属性用逗号连接在一起
2.	将Address对象作为一个属性，按照SimpleCustomer类的思路编写Customer类
```
***
**代码**
* Customer.java

```
package simplecustomer;

public class Customer {
	// 四个属性
	private int id;
	private String name;
	private String phoneNumber;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	//创建内部类
	class Address {
		// 5个属性
		private String country;//国家
		private String city;//城市
		private String district;//区
		private String detailedAddress;//详细地址
		private int postCode;//邮编

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getDistrict() {
			return district;
		}

		public void setDistrict(String district) {
			this.district = district;
		}

		public String getDetailedAddress() {
			return detailedAddress;
		}

		public void setDetailedAddress(String detailedAddress) {
			this.detailedAddress = detailedAddress;
		}

		public int getPostCode() {
			return postCode;
		}

		public void setPostCode(int postCode) {
			this.postCode = postCode;
		}

		// 构造方法
		public Address(String country, String city, String district, String detailedAddress, int postCode) {
		}

		// toString方法
		public String toString() {
			return country + "," + city + "," + district + "," + detailedAddress + "," + postCode;
		}
	}
}

```
####  问题5
（封装）已知一个类Student 代码如下
```
class Student {
    String name;
    int age;
    String address;
    String zipCode;
    String mobile;
}
```
a)把Student的属性都作为私有，并提供get/set方法以及适当的构造方法。
b)为Student类添加一个getPostAddress方法，要求返回Student对象的地址和邮编
***
**代码**
```
public class Student {
	private String name;
	private int age;
	private String address;
	private String zipCode;
	private String mobile;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String[] getPostAddress() {
		String[] array = new String[2];
		array[0] = this.address;
		array[1] = this.zipCode;
		return array;
	}
}
```
####  问题6
定义一个 Performer 接口，表示一个演员，接口中定义 perform 方法，表示表演。为这个接口提供若干实现类：Singer，表示歌手；Dancer，表示舞蹈演员；Player，表示演奏者。类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5s9frj309j06bq30.jpg)
定义一个 Program 类，表示一个节目。每一个节目需要多个演员配合，因此每一个 Program 类中都包含一个属性：Performer 数组，表示表演这个节目的所需要的演员。
给出 Program 的部分代码:
```
class Program {
    private Performer[] ps;
    public Program(){
        ps = new Performer[3];
        ps[0] = new Singer();
        ps[1] = new Dancer();
        ps[2] = new Player();
    }
}
```
在现有代码基础上，为 Program 增加一个 show 方法，在这个方法中，调用所有表演这个节目的所有 Performer 的 perform 方法。
Program 类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5wfvlj304e035t8j.jpg)
***
**代码**
* Performer.java

```
package performer;

public interface Performer {
	public void perform(); // 表演
}
```
* Dancer.java

```
package performer;

public class Dancer implements Performer {

	@Override
	public void perform() {
		// TODO Auto-generated method stub
		System.out.println("舞蹈演员跳舞");
	}

}

```
* Player.java

```
package performer;

public class Player implements Performer {

	@Override
	public void perform() {
		// TODO Auto-generated method stub
		System.out.println("演奏者演奏乐器");
	}

}

```
* Program.java

```
package performer;

public class Program {
	Performer []arr; // 表演者数组
	public void show(Performer []arr){ // 引入节目演员，并通过for循环调用里面成员的表演方法
		System.out.println("演出开始：");
		System.out.println("______________");
		for(int i=0;i<arr.length;i++){
			arr[i].perform();
		}
	}
	public void end(){
		System.out.println("______________");
		System.out.println("演出结束，谢谢观看");
	}
}

```
* Singer.java

```
package performer;

public class Singer implements Performer {

	@Override
	public void perform() {
		System.out.println("歌手唱歌");
	}

}

```
* TestAll.java

```
package performer;

public class TestAll {
	public static void main(String[] args) {
		Singer p1 = new Singer(); // 一个歌手
		Dancer p2 = new Dancer(); //一个舞蹈演员
		Player p3 = new Player(); //一个演奏者
		
		Program program = new Program(); //一个节目
		program.arr = new Performer[]{p1,p2,p3};//一个演员数组
		program.show(program.arr);//表演节目
		program.end(); // 演出结束
		
	}
}

```
####  问题7
设计一个类 MyClass，为 MyClass 增加一个 count 属性，用来统计总共创建了多少个对象。
***
**代码**
```
public class MyClass {
	//Java中如何统计某个类当前所生成的对象的个数？
	public static int num; // 静态变量
	public MyClass(){
		num++;  // 利用构造函数内来进行计数
	}
	
	public static void main(String[] args) {
		MyClass m = new MyClass(); // 每次创建对象都会调用构造函数
		System.out.println(num);  // 输出
	
	}
}
```

## java第八次课
本次课主要讲述代码块、内部类、java常用类
### 代码块（了解性内容）
+ **静态代码块**：最先被执行，只加载一次
+ **构造代码块**：优先于构造方法，每创建一次对象就执行一次
+ **普通代码块**：根据你声明的位置有关
***
看以下代码
```
public class TestCode {
	//代码块测试
	//静态代码块
	static {
		System.out.println("我是静态代码块");
	}
	{
		System.out.println("我是构造代码块");
	}
	//构造方法
	public TestCode() {
		System.out.println("我是构造方法");
	}
	//main方法
	public static void main(String[] args) {
		//创建两个对象
		TestCode tc1=new TestCode();
		TestCode tc2=new TestCode();
		{
			System.out.println("我是普通代码块");
		}
	}
}
```
控制台输出结果
```
我是静态代码块
我是构造代码块
我是构造方法
我是构造代码块
我是构造方法
我是普通代码块
```
### 内部类（了解性内容）
+ **成员内部类**：相当于成员变量

特点：不允许在内部类里面定义静态的成员和方法
创建对象方式 
内部类类型 对象名=外部类对象.new 内部类类型();
```
public class TestMemeberClass{
    //属性
    String name="a";
    int size;
    //可以添加静态属性
    static int height;
    //获取自身信息的功能
    public String getInfo(){
        return name+size;
    }
    //成员内部类
    class InnerClass{
        String name="b";
        int size;
        //此处不能添加静态属性
        public void m(){
            System.out.println(name);
            //name访问的是成员内部类里面的name
        }
    }
    //main函数测试name
    public static void main(Sting[] args){
        //内部类创建对象要依托外部类
        TestMemeber tm=new TestMemeberClass();
        //创建内部类对象
        InnerClass ic=tm.new InnerClass();
        //访问m方法
        ic.m();
    } 
}
```
控制台输出：b
+ **局部内部类**

特点：如果该类访问它所在方法的变量，此变量必须被final修饰
访问变量范围只在局部内部类有效
```
public class TestLocaltionClass{
    //属性
    String name="a";
    int size;
    //可以添加静态属性
    static int height;
    //获取自身信息的功能
    public String getInfo(final int s){
        //局部变量
        int w=10;
        //局部内部类
        class InCClass{
            String name;
            int size;
            public void m(){
            System.out.println(s);//这里不能访问public String getInfo(int s)中的s，添加final修饰即可以访问   
             System.out.println(size);//可以访问本类中的成员
            }
        }
        return name+size;
    }
}
```
+ **静态内部类**

特点：可以在这个类里面声明静态的成员
```
public class TestStaticClass{
    static int s;
    ststic class Sclass{
        int s;
        //可以声明静态变量
        static int w;
        public static void m(){

        }
    }
}
```
+ **匿名内部类**(重点)

当你想创建一个对象的时候，一般父类是抽象类或接口的时候，才可以用这个
```
public class TestNoNameClass{
//完成一个功能
//学校选上课老师 输入偶数，上java课，输入奇数，上html课
    //功能测试
    public static void main(String[] args){
        School s=new School();
        Teacher t=s.getT(12);//填数值进行判断
        t.teach();//多态
    }
}
class School{
    //选择老师
    public static Teacher getT(int i){
        if(i%2==0){
            //System.out.println("");
            Teacher t=new JavaT();
            return t;
        }
        else{
            //匿名内部类
            return new Teacher(){
                @Override
                public void teach(){
                     System.out.println("html课程");
                }
            };
        }
    }
}
//将老师定义为接口
interface Teacher{
    //教课
    void teach();
}
class JavaT implements Teacher{
    @Override
    //重写接口方法
    public void teach(){
         System.out.println("java课程");
    }
}
//将老师定义为接口
interface Teacher{
    //教课
    void teach();
}
class JavaT implements Teacher{
    @Override
    //重写接口方法
    public void teach(){
         System.out.println("java课程");
    }
}
```
### java常用类

+ **Object类**->java根基类（任何类的父类）
特点：任何一个自定义的类，如果没有显示继承某个类，那么默认继承Object类。所以大多数情况不写
讲解四个方法
a） toString()
返回该类以字符串形式表示的
b） equals()
比较两个对象的内容是否相等
c） getClass()
返回此obj运行时的类型
d） finalize()
释放资源（你不用的构造方法（对象））
比C语言先进的技术，有自动的垃圾回收机制 GC
    1. 没有引用指向这个对象
    2. 该收拾的就收拾了
***
```
public class Student{
	String name;
	int  age;
	public static void main(String[] args) {
		Student stu= new Student(10,"张子豪");
		Student stu1= new Student(10,"张子豪");
		Mouse  m=new Mouse();
			System.out.println(stu.toString());
			System.out.println(stu);
			System.out.println(stu1);
			System.out.println(stu.equals(m));//  false 地址不同
			System.out.println(stu.equals(stu1));//true
			System.out.println(stu.getClass());
			System.out.println(m.getClass());
			Student stu2=new SmallStu(1,"杨毅");
			System.out.println(stu2.getClass());
	}
	/*// 重写  toString
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return name+age;
	}*/
	//  构造方法
	public Student(int age,String name){
		this.age=age;
		this.name=name;
	}
	// 重写 equals方法
	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		//  我们先要判断 obj 是不是空的，如果是空的，就不比
		if(obj==null){
			return false;
		}else{
			//  判断 obj 是不是 学生类 
			if(obj instanceof Student){
				// 将父类 obj 强制转换成 stu
				Student  ostu=(Student)obj;
				//  判断  当前对象的名字和 传入的对象名 以及年龄都相等的时候，这才是真正的2个对象
				if(this.name.equals(ostu.name)&&this.age==ostu.age){
					return true;
				}
			}
		}
		return false;
	}
	
}


class  Mouse{}

class SmallStu extends Student{

	public SmallStu(int age, String name) {
		super(age, name);
		// TODO Auto-generated constructor stub
	}}

```
使用JDK API
1.提供我们方法，看参数列表，需要什么参数，就给什么参数
2.提供我们的方法，看返回值类型，，返回什么，就用什么类型接收
+ **String类**

a） String和StringBuffer区别？
String是不变的，StringBuffer可变的
b） ==与equals区别？
==比较的是地址，equals比较的是内容
String有单独的存储空间
```
public class StringTest{
    public static void main(String[] args){
        String str="abc";
        String str1="abc";
        String s=new String("abc");
        String s1=new String("abc");
        System.out.println(str==str1);//true
        System.out.println(str.equals(str1));//true
        System.out.println(s==s1);//false 地址不同
        System.out.println(s.equals(s1));//true
    }
}
```
c） String里面常用的方法
代码展示
```
//定义一个字符串
String strs="Hello World Java!"
//1.求出这个字符串的长度
int length=strs.length();
System.out.println(length);
//2.求出字符串共有几个字母o
for(int i=0;i<length;i++){
    int count=0;
    char o=strs.charAt(i);
    if("o"==o){
        count++;
    }
}
System.out.println(count);
//3.判断这个字符串是不是H开头？
System.out.println(strs.startWith("H"));//返回true和false
//4.把World单词换成61
System.out.println(strs.replace("World","61"));
//5.把Java单独输出来
System.out.println(strs.substring(12,16));//下标从0开始
//6.按照空格，把这个串分成三个字符串输出
String[] ss=strs.split(" ");
for(int i=0;i<ss.length;i++){
    System.out.println(ss[i]);
}
//7.把Java所有字母都转换成大写
System.out.println(strs.substring(12,16).toUpperCase());
//8.求数字的长度
int i=10;
String is=String.valueOf(i);
System.out.println(is.length());
//9.获取系统当前毫秒时间
long haoMiao=System.currentTimeMillis();
System.out.println(haoMiao);
```
+ **包装类**

八种基本数据类型，对应的都有一个包装类
a） 学包装类的目的？
基本数据类型不具备和String相互转换的功能
b） 在java web开发的时候，从前台获取的数据都是String类型
八种数据类型对应的包装类
int==>Integer
char==>Character
boolean==>Boolean
只有int和char不是首字母大写，其余与boolean类似，均是首字母大写
c） 要求会的3对转换
int<==>String 重点
int<==>Integer
String<==>Integer
代码实现
```
public class IntegerTest{
    //是针对int的一些常用方法的封装，所以叫包装类
    public static void main(String[] args){
        //int<==>String
        int i=100;
        String si=String.valueOf(i);
               si=i+"";
        
        String s="22";
        int is=Integer.parseInt(s);//非常重要

        //int<==>Integer
        int i1=121;
        Integer it1=new Integer(i1);

        int i2=it1.intValue();
        Integer i3=33;//jdk1.5特性

        //String<==>Integer
        String s2="444";
        Integer it5=new Integer(s2);

        String s3=it5.toString();
    }
}
```

## java第九次课
本次课主要内容：上节课知识补充、Math类、Date类、异常处理
### 补充
* int和Integer区别
int属于基本数据类型，默认值0
Integer属于引用数据类型，默认值null
内存分配不一样
Integer提供了很多与String互相转换的方法
### Math类
随机数，返回一个double类型，o~1之间的小数
```
public class TestMath{
	public static void main(String[] args){
		//随机数获取
		System.out.println(Math.random());
	}
}
/*控制台打印(不唯一)
0.4975789553898078*/
```
* 编写一个常用方法，求两个数之间的随机整数

```
import java.util.Scanner;

public class Random {
	public static void main(String[] args) {
		//输入流
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入第一个自然数：");
		int x = sc.nextInt();
		System.out.println("请输入第二个自然数：");
		int y = sc.nextInt();
		if (getRandom(x, y) < 0) {
			System.out.println("您输入的数字不合法！");
		} else {
			System.out.println("系统产生的随机数为：" + getRandom(x, y));
		}
	}

	// 封装方法
	private static int getRandom(int x, int y) {
		//创建对象
		Random random = new Random();
		//定义一个小于0的数
		int num = -1;
		//判断是否为自然数
		if (x < 0 || y < 0) {
			return num;
		} else {
			//获取最大值
			int max = x > y ? x : y;
			//获取最小值
			int min = x < y ? x : y;
			int mid = max - min;// 求差
			// 产生随机数
			num = (int) (Math.random()*(mid+1))+min;
		}
		return num;
	}
}
//封装另一种方法
public static int getRandomTwoNumber(int start,int end){//start小于end
	return (int)(Math.random()*(end-start+1)+start);
}
```
* Math.floor方法

返回最接近正无穷大的数，该值小于等于参数，并等于某个整数
```
double d=11.9;
double d1=-11.9;
System.out.println(Math.floor(d));
System.out.println(Math.floor(d1));
/*控制台输出
11.0
-12.0*/
```
* Math.max方法：比较两个数中最大的一个
* Math.min 比较两个数中最小的

### 日期类
* Date与String相互转换

```
import java.util.Date;
import java.text.SimpleDateFormat;
public class TestDate{
	public static void main(String[] args){
		Date d=new Date();
		//已过时方法
		/*System.out.println(d.getYear());
		System.out.println(d.getHours());*/
		//获取日期方法 y对应年，M对应月，d对应日
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd");
		String str=sdf.format(d);
		System.out.println(str);
		//字符串转日期（字符串格式必须与获取日期格式相同）
		String date="2018/4/5";
		//异常处理
		try {
			//字符串转为日期
			Date d1=sdf.parse(date);
			System.out.println(d1);//输出：Thu Apr 05 00:00:00 CST 2018
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
```
### 异常处理
掌握一个图，五个关键字，一个知识点
一个图
* Trowable(错误和异常的超类)
	* Error(错误)
	合理的应用程序 不能捕获的严重问题 例如断电、断网
	* Exception(异常) 程序里出现，必须要捕获处理的异常
		* RuntimeException(运行时异常，未检查异常) 程序员可以避免的
		* Exception(已检查异常)
***
五个关键字
* try 捕获，这里的代码可能会发现异常
* catch 处理异常，反馈回你是什么问题
* throw 声明异常
* throws 抛出异常
* finally 无论异常是否会发生，都执行的代码，一般情况下用于资源释放

```
public class TestException {
	public static void main(String[] args) {
		//调用方法
		police();
	}
	//网吧检测年龄，小于18禁止入内
	public static void checkAge(int age) throws Exception {//抛出异常
		if(age<18) {
			//System.out.println("年龄小于十八，禁止入内！");
			//声明异常
			throw new Exception("年龄小于十八，禁止入内！");
		}else {
			System.out.println("欢迎光临！");
		}
	}
	//公安调用检测年龄方法
	public static void police() {
		try {
			checkAge(20);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			System.out.println("无论是否发生异常，都执行");
		}
	}
}

```
一个知识点
* 异常和方法重写
父类方法没有异常,子类不能抛出Exception异常,可以是其子类异常
父类方法上有异常,子类可以抛出异常,也可以不抛异常,还可以抛出子集
父类方法上有多个异常,子类可以同时一样抛出,也可以用父类异常类
子类抛出的异常不能超过父类
自定义异常让自己声明的异常继承Exceptio或者RuntimeException
***
* 写出常见的五种异常
	* Java.lang.NullPointerException 程序遇上了空指针
	* java.lang.ClassNotFoundException 指定的类不存在
	* java.lang.ArithmeticException 数学运算异常
	* java.lang.ArrayIndexOutOfBoundsException 数组下标越界
	* java.lang.IllegalAccessException 没有访问权限
***
### 接口练习题
```
1. 定义Person(人员)抽象类， Person类包含以下成员变量：name、gender(性别)、birthDate(出生日期)等
方法：修改个人信息、显示个人信息等。
2. 定义Reader(读者)接口，在其中定义抽象方法，如：借书、还书、搜索书籍等。
3. 定义Student类。Student类是Person的子类，并实现Reader接口。类包含以下成员：
变量：学号、专业、借书的数量、借书数量限制等。
方法： 实现Reader接口的方法。
4. 定义Book(书籍)类，也可以定义Book类的子类。Book类及其子类的成员由学生自己思考并给出定义；
5. 定义Library（图书馆）类，包含以下成员：
变量：
 Name，图书馆名称
 students, Student[]，记录图书馆的学生信息；
 books, Books[]，记录图书馆的藏书的书名；
方法：添加新书、添加新的成员；
6. 定义测试(Test)类测试自己设计的系统，测试内容如下：
 创建Library对象，包括：至少2个Book对象和1个Student对象。
 使用创建的Student对象测试借书、还书、搜索书籍等方法，并将结果输出到屏幕。 
```
### 答案
答案不唯一
```
Book.java

public class Book {
	//属性
	private int bookId;//书籍号
	private String bookName;//书的姓名
	//构造方法
	public Book(int bookId,String bookName){
		this.bookId=bookId;
		this.bookName=bookName;
	}
	//重写equals
	public boolean equals(Object obj) {
		Book b = (Book)obj;
		//比较的是Book类
		if(obj instanceof Book){
			if(this.bookName.equals(b.bookName)){
				return true;
			}
		}
		return false;
	}
	//封装
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}		
}

Reader.java

public interface Reader {
	//借书
	public abstract void borrowBook(int number);
	//还书
	public abstract void takeBook(int number);
	//搜索书籍
	public abstract boolean findBook(Book book,Library lib);
}

Student.java

public class Student extends Person implements Reader{
	//属性
	private int studentNumber;//学号
	private String major;//专业
	private int bookNumberMax;//借书上限
	private static int bookNumber;//已借的数量 需要记录
	//构造方法
	public Student(int studentNumber,String major,int bookNumberMax,String name){
		this.setName(name);
		this.studentNumber=studentNumber;
		this.major=major;
		this.bookNumberMax=bookNumberMax;
		this.bookNumber=0;
	}
	//封装
	public int getStudentNumber() {
		return studentNumber;
	}
	public void setStudentNumber(int studentNumber) {
		this.studentNumber = studentNumber;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public int getBookNumberMax() {
		return bookNumberMax;
	}
	public void setBookNumberMax(int bookNumberMax) {
		this.bookNumberMax = bookNumberMax;
	}
	public int getBookNumber() {
		return bookNumber;
	}
	public void setBookNumber(int bookNumber) {
		this.bookNumber = bookNumber;
	}
	//方法重写
	//借书 number为接几本
	public void borrowBook(int number){
		//借书数量增加  如果没达到上限的话
		if(this.bookNumber+number<=this.bookNumberMax)
		{
			this.bookNumber+=number;
			System.out.println("借书成功");
			System.out.println(this.getName()+"借了"+bookNumber+"本");
		}
		else
		{
			System.out.println("借书失败超过上限");
			System.out.println(this.getName()+"借了"+bookNumber+"本");
		}	
	}
	//还书 number为借几本
	public void takeBook(int number){
		//书的数量减少 判断合不合条件
		if(this.bookNumber-number>=0)
		{
			this.bookNumber-=number;
			System.out.println("还书成功");
			System.out.println(this.getName()+"还了"+number+"本");
		}
		else
		{
			System.out.println("还书失败,没有这么多本");
			//System.out.println(this.getName()+"还了"+number+"本");
		}	
	}
	//搜索书籍
	public boolean findBook(Book book,Library lib){
		//获取数组
		Book [] b = lib.getBooks();
		//System.out.println(lib.getBookNumber());
		for(int i = 0;i < b.length ;i++)
		{
			if(b[i].getBookName().equals(book.getBookName()))
			{
			return true;
			}
		}
		return false;	
	}	
}

Book.java

public class Book {
	//属性
	private int bookId;//书籍号
	private String bookName;//书的姓名
	//构造方法
	public Book(int bookId,String bookName){
		this.bookId=bookId;
		this.bookName=bookName;
	}
	//重写equals
	public boolean equals(Object obj) {
		Book b = (Book)obj;
		//比较的是Book类
		if(obj instanceof Book){
			if(this.bookName.equals(b.bookName)){
				return true;
			}
		}
		return false;
	}
	//封装
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}	
}

Library.java

//static 变量可以 直接 在成员变量上初始化
public class Library {
	//属性
	private String name;//图书馆名字
	private Student [] student;//记录学生信息
	private static int studentNumber;//学生数量
	public Book [] books;//记录书籍
	private static int bookNumber;//书籍数量	
	//构造方法
	//Number 得为1 再写 Student [] student视为一个新数组 因为重新定义了 找了半天 傻了
	public Library(String name){
		this.name=name;
		this.studentNumber=1;
		student = new Student[10];
		this.bookNumber=1;
		books = new Book[10];
	}	
	//封装
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Student[] getStudent() {
		return student;
	}
	public void setStudent(Student[] student) {
		this.student = student;
	}
	public int getStudentNumber() {
		return studentNumber;
	}
	public void setStudentNumber(int studentNumber) {
		this.studentNumber = studentNumber;
	}
	public Book[] getBooks() {
		return books;
	}
	public void setBooks(Book[] books) {
		this.books = books;
	}
	public int getBookNumber() {
		return bookNumber;
	}
	public void setBookNumber(int bookNumber) {
		this.bookNumber = bookNumber;
	}	
	//方法 新加学生
	public void addStudent(Student student){
		//人数增加 数组纳入新的学生
		this.student[studentNumber-1] = student;
		studentNumber++;
		//this.student = new Student[studentNumber];
	}	
	//方法 新加入书籍
	//如果在构造函数里的话，大小一开始就定格了 所以出了溢出的错
	//但是如果重新声明的话 之前存的全没了 
	//解决方法 直接定义一个大的数组
	public void addBook(Book book){
		//书的数量增加 
		//System.out.println(bookNumber);
		this.books[bookNumber-1]=book;
		bookNumber++;
		//this.books = new Book[bookNumber];	
	}
}

Test.java

//测试
public class Test {
	public static void main(String[] args) {
		Library library = new Library("哈哈哈图书馆");
		Book book = new Book(1001,"1书");
		Book book2 = new Book(1002,"2书");
		Student stud = new Student(1,"软件",5,"王同学");	
		library.addBook(book);
		library.addBook(book2);
		library.addStudent(stud);	
		/*for(int i = 0;i<library.books.length;i++){
			System.out.println(library.books[i]);
		}*/	
		stud.borrowBook(2);
		stud.takeBook(2);
		System.out.println(stud.findBook(book, library));	
 	}
}
```

## java第十次课
本次课主要内容：集合Collection、Map，Collections的一些方法以及与集合相关的几个问题
### 集合（容器）
* 为什么学习集合
存对象的对象
* 集合掌握的一个图
    * Collection（接口） 存对象是一个一个存储
        * List（接口）
            * ArrayList(子类) 
            * LinkedList(子类)
        * Set（接口）
            * HashSet(子类) 
    * Map（接口）
        * HashMap（子类）
***
完成：用List存储学生对象，存储完再输出到控制台
```
import java.util.ArrayList;
import java.util.List;

public class Test {
	public static void main(String[] args) {
		Student stu1=new Student("张三", 21);
		Student stu2=new Student("李四", 22);
		Student stu3=new Student("王五", 22);
		Student stu4=new Student("阿六", 22);
		//用List存储对象
		List l=new ArrayList();//底层方法也是数组实现
		l.add(stu1);
		l.add(stu2);
		l.add(stu3);
		l.add(stu4);
		for(int i=0;i<l.size();i++) {
            //转换为Student对象
			Student s = (Student) l.get(i);
			//输出对象
			System.out.println(s);
		}
	}
}
class Student{
	private int age;
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String name;
	public Student(String name,int age) {
		this.name=name;
		this.age=age;
	}
	@Override
	public String toString() {
		return "姓名：" +name+ "年龄" +age;
	}
```
* List和Set区别
List可以放重复的，元素有顺序
Set不可以放重复的，元素没有顺序
```
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class TestSet {
	public static void main(String[] args) {
		Student stu1=new Student("123", 21);
		Student stu2=new Student("456", 22);
		Student stu3=new Student("123", 21);
		Student stu4=new Student("789", 23);
		Set s=new HashSet();
		s.add(stu4);
		s.add(stu3);
		s.add(stu2);
		s.add(stu1);
        //迭代器遍历输出
		Iterator it=s.iterator();
		while(it.hasNext()) {
			Student stu = (Student)it.next();
			System.out.println(stu.getName());
		}	
	}
}
class Student{
	private int age;
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String name;
	public Student(String name,int age) {
		this.name=name;
		this.age=age;
	}
    //重写toString方法
	@Override
	public String toString() {
		return "姓名：" +name+ "年龄" +age;
	}
    //重写equals方法
	@Override
	public boolean equals(Object obj) {
        //判断obj是否为空
		if(obj==null) {
			return false;
		}else if(this.getClass()==obj.getClass()) {
            //强转obj为Student
			Student stu=(Student) obj;
            //判断属性是否相同
			if(this.name.equals(stu.name)&&this.age==stu.age) {
				return true;
			}
			return false;
		}
		return false;
	}
    //重写hashCode方法
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return age;
	}
	
}
/*控制台输出
123
456
789*/
//需要重写hashCode方法和equals方法，这几个返回值相同，即认为重复
```
* Map添加与取出
```
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class TestMap {
	public static void main(String[] args) {
		Map m=new HashMap();
		//添加
		m.put(1, "张三");//jdk1.4之后可以这么用
		m.put(new Integer(2), "李四");//jdk1.4之前这么用
		//取出
		//调用keySet,返回的是key
		Set keys=m.keySet();//返回的是数组
		Iterator it=keys.iterator();//返回的是地址
		while(it.hasNext()) {
			Object key=it.next();
			Object value=m.get(key);
			System.out.println(key+" "+value);
		}
	}
}
```
### Collections的一些方法
```
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TestCollections {
	public static void main(String[] args) {
        //创建一个集合
		List l=new ArrayList();
		for(int i=0;i<10;i++) {
			l.add("a"+i);
		}
		System.out.println(l);
		//排序
		Collections.reverse(l);//逆序
		System.out.println(l);
		Collections.sort(l);//自然排序
		System.out.println(l);
		int i=Collections.binarySearch(l, "a5");//二分法搜索（须先进行自然排序）
		System.out.println(i);
	}
}
/*控制台输出
[a9, a8, a7, a6, a5, a4, a3, a2, a1, a0]
[a0, a1, a2, a3, a4, a5, a6, a7, a8, a9]
5
*/
```
### 集合相关问题
* ArrayList和LinkedList区别
1.ArrayList是实现了基于动态数组的数据结构，LinkedList是基于链表结构。
2.对于随机访问的get和set方法，ArrayList要优于LinkedList，因为LinkedList要移动指针。
3.对于新增和删除操作add和remove，LinkedList比较占优势，因为ArrayList要移动数据。
***
* ArrayList与Vector区别
ArrayList是线程不安全的，Vector是线程安全的，Vector是重量级的，从jdk1.2后Vector成为了java Collection Framework的成员
***
* HashSet和TreeSet区别
1、TreeSet 是二差树实现的,Treeset中的数据是自动排好序的，不允许放入null值。 
2、HashSet 是哈希表实现的,HashSet中的数据是无序的，可以放入null，但只能放入一个null，两者中的值都不能重复，就如数据库中唯一约束。 
3、HashSet要求放入的对象必须实现HashCode()方法，放入的对象，是以hashcode码作为标识的，而具有相同内容的 String对象，hashcode是一样，所以放入的内容不能重复。但是同一个类的对象可以放入不同的实例。
***
* HashMap和Hashtable区别
1.（同步性）HashTable的方法是同步的，HashMap不能同步。
2.（继承的父类不同)HashTable是继承自Dictionary类，而HashMap是继承自AbstractMap类。不过它们都实现了同时实现了map、Cloneable（可复制）、Serializable（可序列化）这三个接口。
3.（对null key和null value的支持不同）.HashTable不允许null值（key和value都不可以），HashMap允许使用null值（key和value）都可以。这样的键只有一个，可以有一个或多个键所对应的值为null。
Hashtable既不支持Null key也不支持Null value。Hashtable的put()方法的注释中有说明。 
当key为Null时，调用put() 方法，运行到下面这一步就会抛出空指针异常。因为拿一个Null值去调用方法了。 
当value为null值时，Hashtable对其做了限制，运行到下面这步也会抛出空指针异常。 
HashMap中，null可以作为键，这样的键只有一个；可以有一个或多个键所对应的值为null。当get()方法返回null值时，可能是 HashMap中没有该键，也可能使该键所对应的值为null。因此，在HashMap中不能由get()方法来判断HashMap中是否存在某个键， 而应该用containsKey()方法来判断。
4.（遍历方法不同）HashTable使用Enumeration遍历，HashMap使用Iterator进行遍历。
5.（初始化和扩容方式不同）HashTable中hash数组初始化大小及扩容方式不同。
Hashtable默认的初始大小为11，之后每次扩充，容量变为原来的2n+1。HashMap默认的初始化大小为16。之后每次扩充，容量变为原来的2倍。
创建时，如果给定了容量初始值，那么Hashtable会直接使用你给定的大小，而HashMap会将其扩充为2的幂次方大小。也就是说Hashtable会尽量使用素数、奇数。而HashMap则总是使用2的幂作为哈希表的大小。
6.计算hash值的方法不同。
***
* Collections与Collection区别
1、Collection 是一个集合接口。它提供了对集合对象进行基本操作的通用接口方法。Collection接口在Java 类库中有很多具体的实现。Collection接口的意义是为各种具体的集合提供了最大化的统一操作方式。
2、Collections 是一个包装类。它包含有各种有关集合操作的静态多态方法。此类不能实例化，就像一个工具类，服务于Java的Collection框架。
Collections 是一个包装类，Collection 表示一组对象，这些对象也称为 collection 的元素。一些 collection 允许有重复的元素，而另一些则不允许，一些 collection 是有序的，而另一些则是无序的。
### 本节课总结
Collection是存对象的
Map是存一对对象的
List是重复的
Set是无序，不重复的
Iterator是遍历Collection的接口
Collections是一个类，操作Collection的，完成各种排序

## java第十一次课
本节课主要内容：IO流、Buffered流、Data流、Object流、Print流、转换流
### IO流
I==》input
O==》output
完成文件和程序之间的传输
####  文件
文件由文件名和拓展名组成 如a.txt, b.doc, c.ppt
####  文件的创建 File
```
import java.io.File;
import java.io.IOException;

public class TestFile {
	public static void main(String[] args) {
		File f=new File("a.txt");//创建文件的一个对象，没有产生文件
		//在D盘创建 separator方法为自动选择路径
		File f1=new File("d:"+File.separator+"a.txt");
		try {
			//此时a.txt创建在当前项目下
			Boolean b=f.createNewFile();
			Boolean b1=f1.createNewFile();
			//此时a.txt创建在d盘
			System.out.println(b);
			System.out.println(b1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
```
####  在某盘下创建一个文件夹，在文件夹里创建文件和文件夹，判断此文件夹下有多少个文件和文件夹
```
import java.io.File;
import java.io.IOException;

public class TestFile {
	public static void main(String[] args) {
		/*File f=new File("a.txt");//创建文件的一个对象，没有产生文件
		//在D盘创建
		File f1=new File("d:"+File.separator+"a.txt");
		try {
			//此时a.txt创建在当前项目下
			Boolean b=f.createNewFile();
			Boolean b1=f1.createNewFile();
			//此时a.txt创建在d盘
			System.out.println(b);
			System.out.println(b1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		//设置文件夹名
		String dirname="d:/test";
		//创建文件夹对象
		File file=new File(dirname);
		//mkdir()方法 创建文件夹
		Boolean f=file.mkdir();
		//输出是否创建成功
		System.out.println(f);
		//在test文件夹下创建test.txt文件
		File file2= new File("d:/test/test.txt");
		//创建
		try {
			Boolean f1=file2.createNewFile();
			System.out.println(f1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//在test文件夹下创建test文件夹
		File file3=new File("d:/test/test");
		Boolean f3=file3.mkdirs();
		System.out.println(f3);
		//test文件夹遍历(直接调用文件夹对象file)
		//运用listFiles方法
		listFiles(file);
	}
	//封装listFiles方法
	public static void listFiles(File str) {
		//判断当前文件或目录是否存在
		if(str.exists()) {
			//如果是目录
			if(str.isDirectory()) {
				//打印当前目录的路径
				System.out.println(str);
				//获取该目录下的所有文件和目录组成的File数组
				File[] files=str.listFiles();
				//遍历每一个子文件
				for(File file:files) {
					listFiles(file);
				}
			}else {
				//如果是文件，则打印文件路径及名称
				System.out.println(str);
			}
		}
	}
}
/*控制台输出（创建成功为true,反之false）
true
true
true
d:\test
d:\test\test
d:\test\test.txt
*/
```
####  向文件里写东西或是从文件向程序读东西
### IO流分类
* 按方向分为 输入输出
* 按功能分 节点流和处理流
* 按单位分 字节流和字符流

####  四大抽象流
**字节流**
* InputStream
读数据 FileInputStream
读取26个英文字母
```
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public class TestInputStream {
	public static void main(String[] args) {
		//创建文件对象
		File f=new File("d://a.txt");
		//调用InputStream流
		InputStream is=null;
		try {
			is=new FileInputStream(f);
			//选择操作 读
			//第一种方法while循环
			 try {
				int r;
				while((r=is.read())!=-1) {
					System.out.print((char)r);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 
			//第二种方法
			/*for(int i=0;i<f.length();i++) {
				//输出字符
				try {
					//返回值为int，强转为char
					System.out.print((char)(is.read()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}*/
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				//关闭流
				is.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}

```
* OutputStream（不能添加字符）
写数据 FileOutputStream
写入26个英文字母
```
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class TestOutputStream {
	//需求 往记事本里写入内容
	public static void main(String[] args) {
		//创建文件对象
		File f=new File("d://a.txt");
		//调用OutputStream流
		OutputStream os=null;
		try {
			os=new FileOutputStream(f);
			//选择操作 写
			try {
				//写入26个英文字母
				for(int i=97;i<97+26;i++) {
				os.write(i);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			try {
				//关闭流
				os.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```

**字符流**
* Reader
读数据 FileReader
```
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class TestReader {
	public static void main(String[] args) {
		//文件地址
		File f=new File("d:"+File.separator+"a.txt");
		//选择流
		Reader r=null;
		try {
			r=new FileReader(f);
			//操作
			char c[]=new char[(int)f.length()];
			try {
				int result=r.read(c);
				String str=new String(c,0,(int)f.length());
				System.out.println(str);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			//关闭流
			try {
				r.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```
* Writer（可以添加字符）
写数据 FileWriter
```
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class TestWriter {
	public static void main(String[] args) {
		//文件地址
		File f=new File("d:"+File.separator+"a.txt");
		//选择流
		Writer w=null;
		try {
			//w=new FileWriter(f);
			//添加true后，不删除原来已有的内容，默认为false
			w=new FileWriter(f,true);
			//操作（删除原来已有的内容）
			//w.write("自己的命运自己掌握")
			w.write("好好努力");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				//关闭流
				w.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
}
```
### Buffered流
处理流又叫高级流，必须套接在其它节点之上
特点：对于字符的操作，可以读写一行，而且还可以减少对硬盘的刷新，因为它带有缓冲区

**子类**
* BufferedInputStream/OutputStream
* Reader/Writer
java设计模式 可以套接一串的对象
```
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
public class TestBuffered {
	public static void main(String[] args) {
		//选择文件
		File f=new File("d://a.txt");
		//选择流
		BufferedWriter bw=null;
		BufferedWriter bw1=null;
		Writer w;
		try {
			w = new FileWriter(f);
			bw=new BufferedWriter(w);
			bw.write("你好");
			//装饰模式方法
			bw1=new BufferedWriter(new FileWriter(new File("d://a.txt")));
			//换行
			bw.newLine();
			bw.write("java");
			bw.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				//关闭流
				bw.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}		
	}
}

```
### Data流
数据流
特点：能读写和机器无关的8种基本数据类型
```
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class TestData {
	public static void main(String[] args) {
		//装修模式
		DataOutputStream os=null;
		try {
			os=new DataOutputStream(new FileOutputStream(new File("d://a.txt")));
			try {
				//写入
				os.write(10);
				os.writeBoolean(true);
				os.writeDouble(5.5);
				os.flush();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				//关闭流
				os.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```
### Object流
特点：可以读写对象
但是读写的对象必须被序列化
```
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
public class TestObject {
	public static void main(String[] args) {
		Student stu = new Student();
		stu.name = "java61";
		stu.age = 1;
		// 把 stu 写入到记事本里面
		ObjectOutputStream oos = null;
		ObjectInputStream ois = null;
		try {
			oos = new ObjectOutputStream(new FileOutputStream(new File("d:\\a.txt")));
			oos.writeObject(stu);
			ois = new ObjectInputStream(new FileInputStream(new File("d:\\a.txt")));
			Object obj = ois.readObject();
			Student s = (Student) obj;
			System.out.println(s.name);
			System.out.println(s.age);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				oos.close();
				ois.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
class Student implements Serializable {
	String name;
	transient int age;// 透明的属性 不被写入
}
/*
控制台输出
java61
0
*/
```
### Print流
是java中唯一一个单向流，只有输出。可以写入8种基本数据类型，自带刷新功能
### 转换流
可以转换编码形式
```
import java.io.UnsupportedEncodingException;
public class TestBianMa {
	public static void main(String[] args) {
		System.out.println(System.getProperty("file.encoding"));
		String str=new String("我爱你中国");
		System.out.println(str);
		try {
			byte[] b= str.getBytes("Big5");
			String  str1=new String(b);
			System.out.println(str1);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
```
***
```
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
public class ChangeCharIO {
	public static void main(String[] args) {
		OutputStreamWriter os = null;
		try {
			os = new OutputStreamWriter(new FileOutputStream(new File("d:\\a.txt")), "Big5");
			os.write("我爱你中国");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				os.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```
### 总结
####  IO重点，知道操作流的步骤
* 选择文件路径
* 选择流
* 选择操作（读或者写）
* 关闭流

####  IO提供的四大抽象流
InputStream OutputStream
Reader Writer
####  IO分类
* 按功能：节点流（低级流）和处理流（高级流）
* 按方向：输入，输出（注意：是站在程序角度说的 入和出）
* 按单位：字节流和字符流（注意：用记事本正常打开可以看就是字符）

####  高级流
* Bufferer:能读写一行
* Data:能读写八种基本数据类型
* Object:能读写对象（但是对象必须被序列化）
* PrintWriter:单向流，没有输入
* 转换:从字节可以转换成字符，还可以改变编码

## java第十二次课
本次课主要内容：
jdk1.5新增特性和线程
### jdk1.5新增特性：jdk1.5是个转折点
####  新增for
for(数据类型 变量名:你要遍历的变量名){}
优点：可读性强，代码量少
缺点：不能单独操作某个元素
```
public class TestFor {
	public static void main(String[] args) {
		int [] a={3,5,2,6,3,45};
		System.out.println(a[1]);
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]);	
		}
		System.out.println();
        //新增for
		for(int ai:a){
			System.out.print(ai);
			System.out.println(a[3]);
		}
	}
}
```
####  可变参数
注意：每个方法中一个可变参数，而且放在后面
```
public class TestChangeArgs {
	public static void main(String[] args) {
		add(1,1,1);
	}
	//  求 2个数的和
	public static int add(int a,int b){
		return a+b;
	}
	//  等价于 int [] a 数组，但是这个数组长度你自己说了算，你给多少值，就多长
	public static void add(int ... a){
        return a[0]+a[1]+a[3];	
	}
	// 注意，可变参数，必须放在后面，而且就有一个
	public static void add(String str,int ... a){	
	}
}
```
####  泛型
出现泛型的目的：避免强制类型转换带来的风险
可以自定义泛型
泛型的通配符
super extends
***
```
import java.util.ArrayList;
import java.util.List;
//泛型
public class TestGener<T> {
	public static void main(String[] args) {
		ValueVar<String>  vv =new ValueVar<String>();
//		vv.setValue(11);
		vv.setValue("ss");
		List<ValueVar> l =new ArrayList<ValueVar>();
		List<Integer> l1=new ArrayList<Integer>();
//		l.add("aa");
//		l.add(1);
		l.add(vv);
		// 调用泛型的
		TestGener<Integer> tg1 =new TestGener<Integer>();
		TestGener<Byte> tg2 =new TestGener<Byte>();
		TestGener<String> tg3 =new TestGener<String>();
		TestGener<Object> tg4 =new TestGener<Object>();
		 m(tg1);
		 m(tg2);
		 m1(tg4);
		 m1(tg1);
	}
	
	// 定义一个方法，演示  泛型的通配符
	/**
	 * 
	 * @param tg 是代表的是？ 是 Nummber的子类
	 */
	public static void m(TestGener<? extends Number> tg){
		
	}
    /**
     * 
     * @param tg  tg 我们讲的是  泛型的通配符，这里面代表是  ？ 是 Iteger 的父类
     */
	public static void m1(TestGener<? super Integer> tg){
		
	}	
}
class  ValueVar<T>{ // T   type
	
	private T  value;
	public void setValue(T value) {
		this.value = value;
	}
	public T getValue() {
		return value;
	}
}
```
####  枚举
switch()里面能放什么类型？
能放int(byte,char,short)兼容的,jdk1.5能放枚举，jdk1.7能放String
枚举出现的目的：
当你要写一些特定值，不允许更改的特定值，就用枚举定义
例如：节日 星期 性别 季节
***
**注意：**
* java中的引用类型：
数组 class interface enum
* 枚举里面是否可以定义其它方法和属性
枚举里可以定义其它方法和属性，但必须在常量后面
* 枚举里面构造方法的规则
枚举里面的构造方法，必须是private，也必须放在常量的后面
***
```
public class TestEnum {
	public static void main(String[] args) {
		Color  c =new Color();
		c.setValue("粉色");
		Color  c1 =new Color();
		c1.setValue("蓝色");
		c1.setValue("香烟");
		System.out.println(c1.getValue());
		System.out.println(Color1.BLUE);
		System.out.println(Color1.PINK);
		// 遍历 枚举里面的所有数据
		for(Color1 cc:Color1.values()){
			System.out.println(cc);
			System.out.println(cc.ordinal());
//			System.out.println(cc.name());
		}
	}
}
class Color{
	private String value;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}	
}
//关键字enum
enum Color1{
	//  枚举定义，里面 属性都是  大写字母
	PINK("粉色") {
		@Override
		public void abM() {
			System.out.println("粉色的 抽象方法");
		}
	},BLUE("蓝色") {
		@Override
		public void abM() {
			// TODO Auto-generated method stub			
		}
	},GREEN("绿色") {
		@Override
		public void abM() {
			// TODO Auto-generated method stub			
		}
	};	
	public  void getValue(){		
	}
	public void m(){}
	private Color1(String info){
		System.out.println(info);
	}	
	public  abstract void  abM();
}
```
####  打包自己的代码，生成api
在代码上添加文档注释 观看泛型代码文档注释
步骤：export->java->javadoc->导入javadoc.exe->选择自己要打包的项目
* java的注释
`//`单行
`/* */`多行
`/** */`文档注释
### 线程
####  进程与线程
进程：操作系统上，一个流程上的任务
怎么执行的：由CPU分配时间片，看上去，就好像是宏观并行，微观串行
线程：跑在进程上的一个任务
java支持多线程
java跨平台，作用在操作系统上，有一个JVM虚拟机
####  线成的组成
* cpu分配的时间
* data数据：堆空间共享，栈空间独立
操作对象的
栈：局部变量
堆：实例变量，new创建对象
* code代码
####  线程的创建方式（共三种）
* 继承Thread
* 实现Runnable接口
```
public class TestThread {
	public static void main(String[] args) {
		Thread1 t1=new Thread1();
		Thread2  th =new Thread2();
		Thread   t2=new Thread(th);
		// 如何启动线程
		t2.start();
		t1.start();		
	}
}
//继承Thread创建线程
class Thread1 extends Thread{
	@Override
	public void run() {
		// 循环1000个
		for(int i=0;i<1000;i++){
			try {
				// 为什么没有throws 这个选项，因为 run方法没有抛出去异常，所以不允许抛出去
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("###......"+i);
		}
	}
}
//实现Runnable接口
class Thread2 implements Runnable{
	@Override
	public void run() {
		// 循环1000个
		for(int i=0;i<1000;i++){
			try {
				Thread.sleep(80);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("$$$$......"+i);
		}
	}	
}
```
* 使用Callable和Future创建线程
```
public class TestCode3 {
    public static void main(String[] args) {
        TestCode3 test = new TestCode3();
        FutureTask<Integer> task = new FutureTask<Integer>((Callable<Integer>)()->{
            int i=0;
            for(;i<100;i++){
                System.out.println(Thread.currentThread().getName()+"循环变量i的值："+i);
            }
            return i;
        });
        for(int i=0;i<100;i++){
            System.out.println(Thread.currentThread().getName()+"循环变量i的值："+i);
            if(i==20){
                new Thread(task,"有返回值的线程").start();
            }
            try{
                System.out.println("子线程的返回值："+task.get());
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```
####  线程的状态图
* 创建线程
继承和实现
* 可运行状态
start 跟操作系统有关
* 运行状态
CPU分配时间
* 灭亡
* 阻塞
    * 三种
    	1. 键盘输入 Scanner
    	2. sleep
    	3. join 让线程合并
***
```
public class ThreadJoin {
	public static void main(String[] args) {
		Thread3 t1 = new Thread3();
		Thread4 th = new Thread4(t1);
		Thread t2 = new Thread(th);
		// 如何启动线程
		t2.start();
		t1.start();
	}
}
class Thread3 extends Thread {
	@Override
	public void run() {
		// 循环1000个
		for (int i = 0; i < 1000; i++) {
			System.out.println("###......" + i);
		}
	}
}
class Thread4 implements Runnable {
	Thread t;
	public Thread4(Thread t) {
		this.t = t;
	}
	@Override
	public void run() {
		// 循环1000个
		for (int i = 0; i < 1000; i++) {
			// 判断
			if (i == 100) {
				try {
					t.join();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			System.out.println("$$$$......" + i);
		}
	}

}
```
* 锁池 对每个对象都有一个锁机制 synchronized
```
public class TestSync {
	public static void main(String[] args) {
		Stack0 s=new Stack0();
		ThreadOne to =new ThreadOne(s);
		Thread   t1=new Thread(to);
		ThreadTwo tt =new ThreadTwo(s);
		Thread   t2=new Thread(tt);
			t1.start();
		s.printChar();
		   t2.start();
		s.printChar();	
	}
}
class  Stack0{
	//  完成 的就是向 栈里面添加一个元素，移除一个元素
	private char [] data={'a','b',' '};
	// 给定一个下标
	int  index=2;
	//  添加元素的功能
	public  void  push(char c){
		data[index]=c;
		System.out.println("push 的元素是"+c);
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		index++;
	} 
	// 移除一个元素
	public  void  pop(){	
		index--;  
		System.out.println("pop 的元素是"+data[index]);
		data[index]=' ';		
	} 
	public void printChar(){
		for(char value:data){
			System.out.println(value);
		}
	}
}
class ThreadOne implements Runnable{
	// 引入 Stacke0 对象
	Stack0  s;
	public ThreadOne(Stack0 s){
		this.s=s;
	}
	@Override
	public void run() {
		synchronized(s){	
			s.push('c');
		}		
	}
}
class ThreadTwo implements Runnable{
	// 引入 Stacke0 对象
		Stack0  s;
		public ThreadTwo(Stack0 s){
			this.s=s;
		}
	@Override
	public void run() {
        //锁池
		synchronized (s) {
			s.pop();
		}
	}
}
```
####  线程同步
产生同步的前提：多个线程访问一个共有资源，破坏原子操作
####  死锁问题
这个对象，被好几个锁锁住了
####  解决办法
靠线程之间的通信
wait(线程等待)方法和notify(叫醒)
注意：它俩必须都放在同步代码块中
```
public class TestWaitAndNotify {
	/*
	 *  练习 wait 和notify 方法的使用
	 */
	public static void main(String[] args) {
		Object o= new Object();
		WaitNotifyTest a=new WaitNotifyTest(o);
		Thread  t=new Thread(a);
		t.start();
		try {
			synchronized (o) {
				System.out.println("main 1");
				o.wait();// 当前 o 处于让出 cpu的状态
				System.out.println("main 2");
			}	
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}	
}
class  WaitNotifyTest implements Runnable{
	// 传入一个 Object
	Object c;
	public  WaitNotifyTest(Object c){
		this.c=c;
	}
	@Override
	public void run() {
		synchronized (c) {
			System.out.println("wnf 1");
			c.notify();// 叫醒 刚刚 等着那个线程 
			System.out.println("wnf 2");
		}
	}	
}
```

**ArrayList 和Vector 的区别？**
Vector 线程 安全的->这里面所有的方法，都带有同步
### 总结
jdk1.5新增特性
* 增强for for(数据类型 变量名：你要遍历的变量名){}
* 可变参数
注意：那个点只能是3个，而且一个方法只能有一个可变参数，还必须放在最后
* 泛型
为了避免数据类型转换带来的风险
记住那两种通配符的用法
* 枚举
特定类型 用枚举声明
里面的属性书写，必须是大写字母
* 自动封装和解箱
Integer = 1
***
线程
* 线程的创建方式
extends Thread
implements Runnable
implements Callable
* 线程的状态
创建 可运行 运行 阻塞 消亡 锁池 等待
* 现成的组成
cpu分配时间
data 堆空间共享，栈空间独立
代码
* 线程的同步
为了 防止 破坏原子操作 ，每个对象都有一个锁标记 当这个对象持有锁的时候，其他线程访问不了
* 同步2种表示形式
一个是 同步代码块 
synchronized(对象){}
在方法上面加 同步修饰词
* 了解 死锁的产生和解决办法
多个 线程，公用一个对象，这个对象还加了好几个锁
解决办法，通信: wait 和 notify

## java第十三次课
本次课主要内容：
JDBC数据库操作
### JDBC
全称：Java database connection
* 数据库
* 服务器
服务器是 做数据存储，服务的总站
* 客户端
客户端是 各个 站点分布
1）创建数据库
2）创建表
3）sql语句（增删改查）
* 增加
`insert into 表名(字段1，字段2，字段3...) values(值1，值2，值3.。。)`
* 更新
`update 表名 set 字段名=改过后的值  where 根据什么改`
* 更改
`select * from 表名` 
`select stuname from 表名  也可以 加where 条件`
* 删除
`delete from 表名 where 条件`
`delete * from 表名`
### java连接数据库
每个数据库厂商，为了能让后台语言使用他们的数据库，他们自己都提供一个 数据jar 包
一个接口，这个接口里面提供了连接的服务
步骤：
1、导入 jar 就是那个 Driver 的驱动包
2、加载驱动 Class.forName
3、获得连接 DriverManger
4、关闭连接
### 操作 CRUD
步骤
1、获得连接
2、写sql
3、获得能处理sql 语句的对象
4、处理sql
5、关闭	 	
### 分层模式
vo：value object
dao：database object
创建四个包 名字分别为
conn 数据库连接
dao 数据库操作
vo 与数据库相关的类
main 测试

**分享一个数据库操作**
创建一个product表（MySQL数据库）
***
|名|类型|长度|
|:-:|:-:|:-:|
|id|int|11|
|name|varchar|255|
|value|int|11|

id为主键，自动递增
创建四个包 conn dao vo main
以下为代码

**conn包 TestConnection.java**
```
package conn;
import java.sql.*;
public class TestConnection {
	// 连接数据库
	//  第一步 ：  导入 jar包  ，在工程下面创建一个文件夹，里面放入那个jar包，然后 bulidpath 添加成 瓶子
	public static void main(String[] args) {	
	}
	// 就获得连接
	public Connection  getCon(){
		Connection con =null;
		try {
			// 加载驱动
			Class.forName("com.mysql.jdbc.Driver");
			// 获得连接
			con=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3308/product", "root", "");
		System.out.println(con);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  con;
	}
}
```

**dao包 ProductDAO.java**
```
package dao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import conn.TestConnection;
import vo.Product;
//操作数据库
public class ProductDAO {
	// 向数据库插入数据
	public boolean insertPro(Product pro) {
		// 声明一个boolean 类型 变量，作为 返回值的标识
		boolean b = false;
		Connection con = null;
		PreparedStatement pst = null;
		// 获得连接
		TestConnection tc = new TestConnection();
		con = tc.getCon();
		// 写 一条sql 语句
		String sql = "insert into product(name,value) values(?,?)";
		// 获得 一个 能 处理sql 语句的对象
		try {
			pst = con.prepareStatement(sql);
			// 给？ 赋值
			pst.setString(1, pro.getName());
			pst.setDouble(2, pro.getValue());

			// 利用pst 处理sql
			int i = pst.executeUpdate();
			// 如果 i 大于0就证明我们插入成了
			if (i > 0) {
				b = true;
			}
			System.out.println(b);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				pst.close();
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return b;
	}
	// 数据库删除数据
	public boolean deletePro(Product pro) {
		// 声明一个boolean 类型 变量，作为 返回值的标识
		boolean b = false;
		Connection con = null;
		PreparedStatement pst = null;
		// 获得连接
		TestConnection tc = new TestConnection();
		con = tc.getCon();
		// 写 一条sql 语句
		String sql = "delete from product where id=?";
		// 获得 一个 能 处理sql 语句的对象
		try {
			pst = con.prepareStatement(sql);
			// 给？ 赋值
			pst.setInt(1, pro.getID());
			// 利用st 处理sql
			int i = pst.executeUpdate();
			// 如果 i 大于0就证明我们删除成功
			if (i > 0) {
				b = true;
			}
			System.out.println(b);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				pst.close();
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return b;
	}
	// 数据库修改数据
	public boolean updatePro(Product pro) {
		// 声明一个boolean 类型 变量，作为 返回值的标识
		boolean b = false;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		// 获得连接
		TestConnection tc = new TestConnection();
		con = tc.getCon();
		// 修改name 语句
		String sql = "update product set name=? where id=?";
		// 修改value语句
		String sql1 = "update product set value=? where id=?";
		// 获得 一个 能 处理sql 语句的对象
		try {
			pst = con.prepareStatement(sql);
			pst1 = con.prepareStatement(sql1);
			// 判断执行语句
			if (pro.getName() != null) {
				// name给？ 赋值
				pst.setString(1, pro.getName());
				pst.setInt(2, pro.getID());
				int i = pst.executeUpdate();
				// 如果 i 大于0就证明我们修改成功
				if (i > 0) {
					b = true;
				}
				System.out.println(b);
			} else {
				// value给？ 赋值
				pst1.setInt(1, pro.getValue());
				pst.setInt(2, pro.getID());
				int i = pst.executeUpdate();
				// 如果 i 大于0就证明我们修改成功
				if (i > 0) {
					b = true;
				}
				System.out.println(b);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				pst.close();
				pst1.close();
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return b;
	}
	// 查询数据库
	/*
	 * 暂时只支持查询所有内容
	 */
	public List<Product> selectProduct() {
		// 创建一个集合，因为 是查询操作所以选择的是 ArrayList
		List<Product> l=new ArrayList<Product>();
		// 获得连接
		Connection con = null;
		TestConnection tc = new TestConnection();
		con = tc.getCon();
		ResultSet rs=null;
		//sql语句
		String sql="select * from product";
		// 创建查询请求
		PreparedStatement ps = null;
		try {
			ps = con.prepareStatement(sql);
			// 返回查询结果
			rs = ps.executeQuery();
			// 遍历结果
			while (rs.next()) {
				Product pro=new Product();
				pro.setID(rs.getInt("id"));
				pro.setName(rs.getString("name"));
				pro.setValue(rs.getInt("value"));
				//把对象存入集合
				l.add(pro);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return l;
	}
}
```

**vo包 Product.java**
```
package vo;
public class Product {
	private int ID;
	private String name;
	private int value;
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
}
```

**main包 TestProduct.java**
```
package main;

import java.util.List;

import dao.ProductDAO;
import vo.Product;

public class TestProduct {
	public static void main(String[] args) {
		ProductDAO  prod=new ProductDAO();
		Product pro =new Product();
		//增加数据
		pro.setName("苹果");
		pro.setValue(10);
		prod.insertPro(pro);
		//删除数据
		/*pro.setID(1);
		prod.deletePro(pro);*/
		//修改数据
		/*pro.setID(2);
		pro.setName("香蕉");
		prod.updatePro(pro);*/
		//查询数据
		List<Product> l=prod.selectProduct();
		for(Product pro1:l) {
			System.out.print("id:"+pro1.getID()+" ");
			System.out.print("name:"+pro1.getName()+" ");
			System.out.println("value:"+pro1.getValue()+" ");
		}
	}
}
```
### 总结
* 连接数据库的步骤
	1. a）导入jar包
	2. b）加载驱动
	3. c）获得Connection
	4. d）关闭连接
* 操作 sql 的步骤
	1. a）获取连接
	2. b）定义sql
	3. c）处理sql语句的对象
	4. d）处理sql语句
	5. e）关闭连接 和 处理对象

## java第十四次课
本次课主要内容：
单例模式 事务 网络编程
### 单例模式
将数据库的连接定义为一个不需要创建对象就可以被调用的方法
```
package conn;
import java.sql.*;
public class SingleCon {
	// 有3个 获得连接的参数
	private String url = "jdbc:mysql://localhost:3308/color";
	private String user = "root";
	private String pwd = "";
	private static SingleCon sc = null;// 静态的本类类型
	// 加载驱动
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	// 获得连接
	public Connection getConn() throws SQLException {
		return DriverManager.getConnection(url, user, pwd);
	}
	// 只能本类创建对象
	private SingleCon() {
	}
	// 获得 一个对象
	public static SingleCon getSC() {
		if (sc == null) {
			// 同步代码块 绑定当前对象
			synchronized (SingleCon.class) {
				if (sc == null) {
					sc = new SingleCon();
				}
			}
		}
		return sc;
	}
	// 关闭所有连接，操作的对象
	public void closeAll(Connection con,Statement st,ResultSet rs){
		if(rs!=null){
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally{
				if(st!=null){
					try {
						st.close();
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}finally{
						if(con!=null){
							try {
								con.close();
							} catch (SQLException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
				}
			}
		}
	}
}
```
数据库操作（以添加、查询为例）
```
package dao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import conn.SingleCon;

public class ColorDAO {
	//添加
	public boolean insertColor(Color c) {
		boolean b=false;
		//获得连接
		Connection con =null;
		PreparedStatement pst=null;
		//sql语句
		String sql = "insert into color(Chinese,English) values(?,?)";
		try {
			con=SingleCon.getSC().getConn();
			pst = con.prepareStatement(sql);
			// 给？ 赋值
			pst.setString(1, c.getChinese());
			pst.setString(2, c.getEnglish());

			// 利用pst 处理sql
			int i = pst.executeUpdate();
			// 如果 i 大于0就证明我们插入成了
			if (i > 0) {
				b = true;
			}
			System.out.println(b);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			SingleCon.getSC().closeAll(con, pst, null);
		}
		return b;
	}
	// 查询
	public List<Color> getColor(){
		List<Color> l=new ArrayList<Color>();
		 // 获得连接
		Connection con =null;
		PreparedStatement pst=null;
		ResultSet rs=null;
		try {
			con=SingleCon.getSC().getConn();
			String sql ="select * from color";
			pst=con.prepareStatement(sql);
			rs=pst.executeQuery();
			while(rs.next()){
				Color c=new Color();
				c.setId(rs.getInt("id"));
				c.setChinese(rs.getString("Chinese"));
				c.setEnglish(rs.getString("English"));
				l.add(c);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			SingleCon.getSC().closeAll(con, pst, rs);
		}
		return l;
	} 
```
### 事务
特点：一致性，原子性，持久性 
中心思想：就是要么都操作，要么都不操作
案例：转钱
A向B转钱，由于系统原因，A钱转出去了，但是B没有收到钱
事务 解决这个问题
```
// 转账
		public boolean updateMoney(){
			// boolean 类型标识
			boolean b=false;
			// 获得连接
			Connection con =null;
			PreparedStatement pst=null;
			PreparedStatement pst1=null;
			try {
				con=SingleCon.getSC().getConn();
				// 设置 手动提交
				con.setAutoCommit(false);
				//  id 是 5号的人， 给别人汇款 10 元
				String sql ="update color set num=num-10 where id=1";
				pst=con.prepareStatement(sql);
				int i =pst.executeUpdate();
                //数据库错误，id是2的人没有收到钱
				String sql1 ="update color1 set num=num+10 where id=2";
				pst1=con.prepareStatement(sql1);
				int i1=pst1.executeUpdate();
				// 提交
				con.commit();
				if(i>0&&i1>0){
					b=true;
					System.out.println(b);
				}
				
			} catch (SQLException e) {
				try {
                    //检测数据库连接
					if(con!=null){
                        //发生错误，对数据库的操作都不执行（事务）
						con.rollback();
						System.out.println("false");
					}			
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}finally{
				SingleCon.getSC().closeAll(null, pst,null);
				SingleCon.getSC().closeAll(con, pst1,null);
			}
			return b;
		}
    }
```
### 网络编程
* 什么是IP: 是一个 逻辑地址
* 什么是 mac地址：这个是 一个物理地址
* 什么是端口号：单纯的根据ip 是找不到你这个准确的 应用，相当于 电话的分机号
0到 65536个 ，但是 1024以下 尽量不要用，因为已经被占用了
* 什么是协议：网络传输中，互相遵守的一个约定，规范
网络编程，主要就是 传输信息， 通信
通信 一般 采用的技术 就是分层 
物理层-》数据层=》网络层=》传输层=会话层=》表示层=》应用层
####  TCP
* 服务器端
* 客户端
* 主要应用 Socket 编程
特点： 面向连接的，可靠的，字节流的传输方式
类似于我们现实中的打电话，必须等到对方的回应

**服务器**
```
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
public class TesTCPServer {
	public static void main(String[] args) {
		// 创建连接
		ServerSocket ss =null;
		Socket s=null;
		try {
			ss =new ServerSocket(9999);
			// 等待 回应，正在阻塞
			s=ss.accept();
			//  这个s 可以 获得 输出流 
			OutputStream os = s.getOutputStream();
			// 通过 输出流，我们可以  创建 PrintWriter 流，
			PrintWriter pw =new PrintWriter(os);
			// 这个流 具有打印功能，我们打印 30个Hello
			for(int i=1;i<=30;i++){
				String str="hello";
				pw.println(str+i);
				Thread.sleep(600);
				// 一定要刷新
				pw.flush();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			try {
				s.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
```

**客户端**
```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
public class TestTCPClient {
	public static void main(String[] args) {
		Socket s =null;
		try {
			//创建连接
			s=new Socket("127.0.0.1",9999);
			//  通过 s 对象可以 获得  输入流 read 
			InputStream is= s.getInputStream();
			// 读取 那边的 信息  读一行
			BufferedReader br =new BufferedReader(new InputStreamReader(is));			
		  
			for(int i=1;i<=30;i++){
				String str=br.readLine();
				System.out.println(str);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			try {
				s.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
/*先启动服务器，再启动客户端
控制台输出
hello1
hello2
...(此处省略)
hello50*/
```
####  UDP

**服务器**
```
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
public class UDPServer {
	public static void main(String[] args) {
		// 数据传输包  创建一个油桶
		DatagramSocket  ds =null;
		try {
			ds=new DatagramSocket(9999); // 
			// 创建那个 数据包，装的信 
			DatagramPacket  dp =new DatagramPacket(new byte[100], 0, 100);
			// 准备接受
			ds.receive(dp);
			// 信的内容，数据
			byte[] buf=dp.getData();
			// 多长的信
			 int length= dp.getLength();
			 //    从哪开始读
			 int  off=dp.getOffset();
			 String str=new String(buf,off,length);
			 System.out.println(str);
		} catch (SocketException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ds.close();
		}	
	}
}
```

**客户端**
```
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
public class UDPClient {
	public static void main(String[] args) {
		// 油桶
		DatagramSocket  ds=null;
		try {
			ds =new DatagramSocket();
			// 信的内容
		String str="学习使我快乐";
		byte[] buf=str.getBytes();
		DatagramPacket  dp =new DatagramPacket(buf, 0,buf.length, InetAddress.getLocalHost(),9999);
		ds.send(dp);
		} catch (SocketException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ds.close();
		}	
	}
}
/*先启动服务器，再启动客户端
控制台输出
学习使我快乐
*/
```
***
**java基础到此告一段落，一共十四次课**