---
title: java第十三次课
date: 2019-08-23 09:15:40
tags: java基础
---
本次课主要内容：
JDBC数据库操作
<!--more-->
## JDBC
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
## java连接数据库
每个数据库厂商，为了能让后台语言使用他们的数据库，他们自己都提供一个 数据jar 包
一个接口，这个接口里面提供了连接的服务
步骤：
1、导入 jar 就是那个 Driver 的驱动包
2、加载驱动 Class.forName
3、获得连接 DriverManger
4、关闭连接
## 操作 CRUD
步骤
1、获得连接
2、写sql
3、获得能处理sql 语句的对象
4、处理sql
5、关闭	 	
## 分层模式
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
## 总结
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