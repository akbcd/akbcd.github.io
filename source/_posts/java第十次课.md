---
title: java第十次课
date: 2019-08-20 11:08:34
tags: java
---
本次课主要内容：集合Collection、Map，Collections的一些方法以及与集合相关的几个问题
<!--more-->
## 集合（容器）
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
## Collections的一些方法
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
## 集合相关问题
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
## 本节课总结
Collection是存对象的
Map是存一对对象的
List是重复的
Set是无序，不重复的
Iterator是遍历Collection的接口
Collections是一个类，操作Collection的，完成各种排序