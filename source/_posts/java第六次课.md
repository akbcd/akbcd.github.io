---
title: java第六次课
date: 2019-06-26 19:21:42
tags: java基础
---
## 回顾
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
<!--more-->
## 本次课主要内容
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
### 接口
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