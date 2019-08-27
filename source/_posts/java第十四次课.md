---
title: java第十四次课
date: 2019-08-24 09:57:53
tags: java基础
---
本次课主要内容：
单例模式 事务 网络编程
<!--more-->
## 单例模式
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
## 事务
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
## 网络编程
* 什么是IP: 是一个 逻辑地址
* 什么是 mac地址：这个是 一个物理地址
* 什么是端口号：单纯的根据ip 是找不到你这个准确的 应用，相当于 电话的分机号
0到 65536个 ，但是 1024以下 尽量不要用，因为已经被占用了
* 什么是协议：网络传输中，互相遵守的一个约定，规范
网络编程，主要就是 传输信息， 通信
通信 一般 采用的技术 就是分层 
物理层-》数据层=》网络层=》传输层=会话层=》表示层=》应用层
### TCP
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
### UDP
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
java基础到此告一段落，一共十四次课