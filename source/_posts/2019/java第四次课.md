---
title: java第四次课
date: 2019-06-04 21:34:09
tags: java基础
---
## 回顾
1.类里面有什么？
属性 和 功能
属性：变量    功能：方法
2.变量声明格式？（变量三要素）
数据类型 变量名 初始值
3.方法的格式？
public 返回值类型 方法名(参数列表){
    return 语句;
}
<!--more-->
## 本次课主要内容
### 变量的分类
局部变量：在方法内，语句块内的变量是局部变量
全局变量（成员变量）：在方法外，类体内是成员变量
区别：局部变量使用前，必须赋初始值
成员变量，如果没有赋初始值，系统默认提供初始值，和数组的元素一样
整形是0 浮点是0.0 String是null
局部变量作用域只在临近大括号内有效
### 创建对象方法？
类名 对象名=new 类名();
### 调用类里面的成员
对象名.成员(属性和功能)
### 构造方法
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
### 关键字 this
代表当前对象，区分成员变量和局部变量重名的问题
## 面向对象的三（四）大特征
封装 继承 多态 （抽象）
### 封装
把一样东西，包装起来，目的是为了保证里面的东西安全
总结：就是把属性私有化，然后通过get set 方法 操作属性
### 继承
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