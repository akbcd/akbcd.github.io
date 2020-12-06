---
title: java第十一次课
date: 2019-08-20 14:46:16
tags: java基础
---
本节课主要内容：IO流、Buffered流、Data流、Object流、Print流、转换流
<!--more-->
## IO流
I==》input
O==》output
完成文件和程序之间的传输
### 文件
文件由文件名和拓展名组成 如a.txt, b.doc, c.ppt
### 文件的创建 File
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
### 在某盘下创建一个文件夹，在文件夹里创建文件和文件夹，判断此文件夹下有多少个文件和文件夹
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
### 向文件里写东西或是从文件向程序读东西
## IO流分类
* 按方向分为 输入输出
* 按功能分 节点流和处理流
* 按单位分 字节流和字符流

### 四大抽象流
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
## Buffered流
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
## Data流
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
## Object流
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
## Print流
是java中唯一一个单向流，只有输出。可以写入8种基本数据类型，自带刷新功能
## 转换流
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
## 总结
### IO重点，知道操作流的步骤
* 选择文件路径
* 选择流
* 选择操作（读或者写）
* 关闭流

### IO提供的四大抽象流
InputStream OutputStream
Reader Writer
### IO分类
* 按功能：节点流（低级流）和处理流（高级流）
* 按方向：输入，输出（注意：是站在程序角度说的 入和出）
* 按单位：字节流和字符流（注意：用记事本正常打开可以看就是字符）

### 高级流
* Bufferer:能读写一行
* Data:能读写八种基本数据类型
* Object:能读写对象（但是对象必须被序列化）
* PrintWriter:单向流，没有输入
* 转换:从字节可以转换成字符，还可以改变编码