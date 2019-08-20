---
title: java第九次课
date: 2019-08-16 10:10:19
tags: java
---
本次课主要内容：上节课知识补充、Math类、Date类、异常处理
<!--more-->
## 补充
* int和Integer区别
int属于基本数据类型，默认值0
Integer属于引用数据类型，默认值null
内存分配不一样
Integer提供了很多与String互相转换的方法
## Math类
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
## 日期类
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
## 异常处理
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
## 接口练习题
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
## 答案
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