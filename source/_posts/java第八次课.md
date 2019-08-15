---
title: java第八次课
date: 2019-08-14 14:27:05
tags: java
---
本次课主要讲述代码块、内部类、java常用类
<!--more-->
## 代码块（了解性内容）
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
## 内部类（了解性内容）
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
## java常用类
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