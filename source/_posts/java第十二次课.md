---
title: java第十二次课
date: 2019-08-22 07:10:00
tags: java基础
---
本次课主要内容：
jdk1.5新增特性和线程
<!--more-->
## jdk1.5新增特性：jdk1.5是个转折点
### 新增for
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
### 可变参数
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
### 泛型
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
### 枚举
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
### 打包自己的代码，生成api
在代码上添加文档注释 观看泛型代码文档注释
步骤：export->java->javadoc->导入javadoc.exe->选择自己要打包的项目
* java的注释
`//`单行
`/* */`多行
`/** */`文档注释
## 线程
### 进程与线程
进程：操作系统上，一个流程上的任务
怎么执行的：由CPU分配时间片，看上去，就好像是宏观并行，微观串行
线程：跑在进程上的一个任务
java支持多线程
java跨平台，作用在操作系统上，有一个JVM虚拟机
### 线成的组成
* cpu分配的时间
* data数据：堆空间共享，栈空间独立
操作对象的
栈：局部变量
堆：实例变量，new创建对象
* code代码
### 线程的创建方式（共三种）
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
### 线程的状态图
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
### 线程同步
产生同步的前提：多个线程访问一个共有资源，破坏原子操作
### 死锁问题
这个对象，被好几个锁锁住了
### 解决办法
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
## 总结
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