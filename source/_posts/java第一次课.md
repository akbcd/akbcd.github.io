---
title: java第一次课
date: 2019-05-21 21:08:30
tags: java基础
---
java基础内容，总共十四次课，这是第一次课
## java
### 什么是Java语言？
是计算机语言，比如：c、c++、python、c#等等
<!--more-->
### 为什么学Java？
应用广，就业快，好！目前十五年内，Java还是前三名
### 如何创建Java文件？
* jdk==《Java软件安装包》
在官网下载jdk,安装好jdk和jre,配置环境变量path值
jdk文件安装目录复制一个到bin的路径
计算机->属性->高级系统设置->环境变量->在path中编辑->新建->值就是你复制的路径
* 如何验证环境变量是否配置成功？
在cmd中输入
java -version
出现jdk版本号即为成功
### 学习Java
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
### eclipse编译快捷键
main alt+? `---` 快速创建main方法
运行 ctrl+f11、右键run as、绿色按钮
syso alt+? `---` 快速创建System.out.println()
### 正式进入Java基本语法
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
### 注意：
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
### 数据类型转换
数据类型的大小 byte-short-char,int,long,float,double
1.表数范围小的向大的转换是 自动转换
2.表数范围大的向小的转换是 强制转换
3.short,byte,char在做运算的时候，自身先转换成int再运算
4.混合运算时，结果为最大的数据类型
5.boolean不参加运算
### Java的运算符
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
### 程序设计结构
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