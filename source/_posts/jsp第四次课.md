---
title: jsp第四次课
date: 2019-11-07 16:02:00
tags: jsp
---
本次课主要内容：
tomcat目录介绍、创建servlet
doGet、doPost、service区别
servlet生命周期、request、response、servlet里面连接数据库、过滤器
<!--more-->
## tomcat目录介绍
bin:可执行文件（启动服务、关闭服务等）
conf：配置文件（web.xml等）
lib：依赖库
logs:日志文件
temp：临时文件
webapps：发布项目
work：jsp转成java及class文件
## 创建servlet
### 方法1
src下创建包
包下创建servlet（包->右键->servlet->起名->Finish）
Dynamic Web Project 3.0及以上版本创建servlet时自动添加注释
项目中不会自动生成web.xml文件
项目创建的servlet源码
```
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Servlet
 */
@WebServlet("/Servlet")
public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
启动tomcat直接访问注解中的路径
### 方法2
src下创建包
包下创建servlet（包->右键->servlet->起名->Finish）
注解删除
web.xml中配置servlet、servlet-mapping（3.0版本之前会创建web.xml）
```
<servlet>
<!--名字-->
<servlet-name>TestServlet</servlet-name>
<!--类路径-->
<servlet-class>com.aly.test.TestServlet</servlet-class>
</servlet>
<servlet-mapping>
<!--名字-->
<servlet-name>TestServlet</servlet-name>
<!--访问路径-->
<url-pattern>/TestServlet</url-pattern>
</servlet-mapping>
```
### 方法3
创建一个普通的java文件
继承HttpServlet
重写里面的doGet、doPost、service方法
配置注解@WebServlet("/TestServ")
启动服务测试
## doGet、doPost、service区别
service：如果重写了，请求一定是service处理
doGet：若果没有重写service，那么请求的方式是get的
doPost：若果没有重写service，那么请求的方式是post的
## servlet生命周期
1.init():初始化时候调用一次
2.第一次访问servlet时，对servlet进行初始化
3.destroy():销毁的时候调用一次
4.关闭服务器
5.`web.xml`配置servlet时添加`<load-on-startup>1</load-on-startup>`：可以使servlet在服务启动时加载
## request
### 携带参数
`request.setAttribute("uname", uname);`
### 获取参数的类型`--`Object 需要强制类型转换
`request.getAttribute("uname");`
### 服务器端跳转（请求转发、类似post）`--------`跳转的页面或servlet
`request.getRequestDispatcher("success.jsp").forward(request, response);`
`<jsp:forward page="success.jsp"></jsp:forward>`
### 中文乱码问题
所有的乱码都是由字符编码格式不匹配，统一编码格式
解决乱码的方法（servlet里添加）

post方式提交的乱码问题
`request.setCharacterEncoding("utf-8");`

get方式提交的乱码，或者直接在地址栏提交的乱码
`String uname = request.getParameter("uname");`
`uname = new String(uname.getBytes("iso-8859-1"),"utf-8");`
## response
客户端跳转（请求重定向、get）
`response.sendRedirect("fail.jsp");`
## servlet里面连接数据库
1.依赖包复制到WebContent下的WEB-INF的下面
2.JDBC的工具类复制到工程中
3.获取查询时所需要的参数
4.编写sql
5.JDBC工具类创建对象连接数据路查询
```
import java.io.IOException;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.aly.po.Student;
import com.aly.tool.JdbcUtil;

@WebServlet("/LoginServ")
public class LoginServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public LoginServ() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //接收post表单值
		String uname = request.getParameter("uname");
		System.out.println(uname);
		String pwd = request.getParameter("pwd");
        //创建表的vo包对象
		Student stu = new Student();
        //往对象里赋值
		stu.setName(uname);
        //sql语句
		String sql = "SELECT * FROM USER_INFO WHERE username = '"+uname+"' and password='"+pwd+"'";
        //创建数据库连接的类
		JdbcUtil ju = new JdbcUtil();
        //调用sql语句
		LinkedList<Map<String, Object>> list = ju.queryByList(sql);
        //判断跳转
		if(list.size() > 0){
			request.getSession().setAttribute("uname", uname);
			request.getRequestDispatcher("success.jsp").forward(request, response);
		}else{
			request.setAttribute("mess", "登录失败");
			request.getRequestDispatcher("login.jsp").forward(request, response);
		}
	}
}
```
## 过滤器
### 创建方法
右键Filter，起名字，Finish
注解部分需要改成@WebFilter("/*")
在doFilter方法里面
request.setCharacterEncoding("utf-8");
chain.doFilter(request, response);（必须添加，不然会在过滤器卡住）
主要解决乱码问题，@WebFilter("/*")表示项目中所有的访问都要经过这个过滤器
```
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

/**
 * Servlet Filter implementation class EncodingFilter
 */
@WebFilter("/*")
public class EncodingFilter implements Filter {

    public EncodingFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding("utf-8");
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
```
## 在servlet里面获取session
HttpServletRequest
`request.getSession()`
## 补充
这里附上一个JdbcUtil，数据库的增删改查操作类
JdbcUtil.java
```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.Map;
import java.util.TreeMap;

public class JdbcUtil {

	String url = "jdbc:mysql://localhost:3308/employee";
	String user = "root";
	String password = "";
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;

	//加载驱动
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	}
	
	// 获取连接对象
	public Connection getConn(){
		try {

			conn = DriverManager.getConnection(url, user, password);
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} 
		
	}

	// 获取语句对象
	public Statement getStmt() {
		try {

			conn = DriverManager.getConnection(url, user, password);
			stmt = conn.createStatement();
			return stmt;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			//release();
		}
	}


	// 更新并返回被影响行数
	public int update(String sql) {
		int num;
		try {
			num = getStmt().executeUpdate(sql);
			return num;
		} catch (SQLException e) {

			e.printStackTrace();
			return -1;
		} finally {
			release();
		}

	}
	

	// 查询返回ResultSet
	public ResultSet query(String sql) {
		try {
			rs = getStmt().executeQuery(sql);
			return rs;
		} catch (SQLException e) {

			e.printStackTrace();
			return null;
		}

	}
	//通过RSMD将结果集保存在list中，最终释放资源
	public LinkedList<Map<String, Object>> queryByList(String sql) {
		LinkedList<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		try {
			rs = getStmt().executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			//获取列数
			int columnCount = rsmd.getColumnCount();
			while (rs.next()) {
				Map<String, Object> map = new TreeMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					String key = rsmd.getColumnName(i+1);
					String value = rs.getString(key);
					map.put(key, value);
				}
				list.add(map);

			}
			return list;

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} finally {
			//释放资源
			release();
		}
	}
	
	/**批量更新*/
	public void  updateBatch(String[] sqls){
		stmt = getStmt();
		
		/**设置不自动提交*/
		try {
			conn.setAutoCommit(false);
			for(String sql : sqls){
				stmt.addBatch(sql);
			}
			stmt.executeBatch();
			
			/**事务提交*/
			conn.commit(); 
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void release() {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
```