---
title: springMVC
date: 2020-05-22 20:36:36
tags: [springMVC,文献]
toc: true
---
本篇文章对springMVC进行简单介绍
<!--more-->
## spring介绍
spring是一个开源的控制反转(Inversion of Control ,IoC)和面向切面(AOP)的容器框架.它的主要目的是简化企业开发.

所谓控制反转就是应用本身不负责依赖对象的创建及维护，依赖对象的创建及维护是由外部容器负责的。这样控制权就由应用转移到了外部容器，控制权的转移就是所谓反转。

面向切面，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术.利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

## 创建工程
创建工程，引入jar包
创建各目录，并创建配置文件
SqlConfigMap.xml
applicationContext.xml
在applicationContext.xml中配置数据源
在applicationContext.xml中配置sqlSessionFactory
## SqlConfigMap.xml配置
```
typeAliases为别名配置，可省略domain的包名
<!--别名配置  -->
 	<typeAliases>
 		<package name="com.aly.domain"/>
 	</typeAliases>
mappers中package为扫描配置
<!-- 加载映射文件 -->
  	<mappers>
  		<package name=”com.aly.mapper”/>
  	</mappers>


<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration 
PUBLIC "-//mybatis.org//DTD Config 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-config.dtd"> 


<configuration> 
	<settings>
   		<setting name="lazyLoadingEnabled" value="true"/>
   		<setting name="aggressiveLazyLoading" value="false"/>
   </settings>
   
  	<!-- 加载映射文件 -->
  	<mappers>
  		<mapper resource="com/aly/mapper/UserMapper.xml"/>
  		<mapper resource="com/aly/mapper/OrdersMapper.xml"/>
  		<mapper resource="com/aly/mapper/OrderdetailMapper.xml"/>
  	</mappers>
</configuration>
```

## applicationContext.xml配置
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
		http://www.springframework.org/schema/beans/spring-beans-3.2.xsd 
		http://www.springframework.org/schema/mvc 
		http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd 
		http://www.springframework.org/schema/context 
		http://www.springframework.org/schema/context/spring-context-3.2.xsd 
		http://www.springframework.org/schema/aop 
		http://www.springframework.org/schema/aop/spring-aop-3.2.xsd 
		http://www.springframework.org/schema/tx 
		http://www.springframework.org/schema/tx/spring-tx-3.2.xsd ">

</beans>

数据源的配置，需要放在beans里面
destroy-method为是否自动销毁连接
maxActive为最大活跃连接数
maxIdle最大空闲连接数

<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource"
		destroy-method="close">
			<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
			<property name="url" value="jdbc:mysql://localhost:3306/ssm"/>
			<property name="username" value="root"/>
			<property name="password" value=""/>
			<!-- 连接活跃最大值（最大连接数） -->
			<property name="maxActive" value="10"/>
			<!-- 最大空闲连接数 -->
			<property name="maxIdle" value="5"/>
		</bean>


配置sqlSessionFactory
交给spring管理的过程为控制反转
配置文件中直接传入参数为依赖注入（控制反转的一种方式）
两个必要参数mybatis核心配置文件和数据源
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
			<property name="configLocation" value="SqlMapConfig.xml"/>
			<property name="dataSource" ref="dataSource"/>
		</bean>
```

## 整合后mybatis的使用
```
原始dao方式
配置mapper映射文件
编写dao接口
编写dao实现类（需要实现SqlSessionDaoSupport类）
配置spring中bean，需要指定sqlSessionFactory
<bean id="userdao" class="com.aly.dao.impl.UserDaoImpl">
			<property name="sqlSessionFactory" ref="sqlSessionFactory"/>
		</bean>

mapper接口动态代理方式
配置mapper映射文件
编写dao接口
配置spring中bean，需要指定sqlSessionFactory，mapperInterface属性
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
			<property name="mapperInterface" value="com.aly.mapper.UserMapper"/>
			<property name="sqlSessionFactory" ref="sqlSessionFactory"/>
		</bean>

ApplicationContext applicationContext = new 
				ClassPathXmlApplicationContext("applicationContext.xml");
		
		UserMapper userMapper = (UserMapper)applicationContext.getBean("userMapper");

mapper接口动态代理（扫描方式）
配置mapper映射文件
编写dao接口
配置spring中bean（只需要一次），需要指定basePackage，sqlSessionFactoryBeanName
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
			<property name="basePackage" value="com.aly.mapper"/>
			<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
		</bean>
```

## Spring MVC介绍
spring MVC是spring框架的一个模块，spring MVC和spring之间无需通过中间整合层进行整合（spring与mybatis需要mybatis-spring-1.2.2.jar）

spring MVC 框架并不知道使用的视图，所以不会强迫您只使用 JSP 技术。Spring MVC 分离了控制器、模型对象、分派器以及处理程序对象的角色，这种分离让它们更容易进行定制。

它是一个典型的教科书式的mvc构架，而不像struts等都是变种或者不是完全基于mvc系统的框架，对于初学者或者想了解mvc的人来说我觉得 spring是最好的，它的实现就是教科书！第二它和tapestry一样是一个纯正的servlet系统，这也是它和tapestry相比 struts所没有的优势。而且框架本身有代码，看起来容易理解。

## 工作原理
用户request请求前端控制器DispatcherServlet

前端控制器通过处理器映射器HandlerMapping查找使哪一个处理器适配器HandlerAdapter（返回一个执行链）

前端控制器通过执行链请求处理器适配器HandlerAdapter

处理器适配器HandlerAdapter执行Handler处理器得到一个ModelAndView

将ModelAndView返回给前端控制器

前端控制器将ModelAndView发给视图解析器View resolver

view resolver解析后会返回一个纯view

将view返回给用户

## springmvc配置文件
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop" 
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
		http://www.springframework.org/schema/beans/spring-beans-3.2.xsd 
		http://www.springframework.org/schema/mvc 
		http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd 
		http://www.springframework.org/schema/context 
		http://www.springframework.org/schema/context/spring-context-3.2.xsd 
		http://www.springframework.org/schema/aop 
		http://www.springframework.org/schema/aop/spring-aop-3.2.xsd 
		http://www.springframework.org/schema/tx 
		http://www.springframework.org/schema/tx/spring-tx-3.2.xsd ">
</beans>
```

## 配置前端控制器
该配置信息在web.xml下配置
```
<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>	
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springmvc.xml</param-value>
		</init-param>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>*.action</url-pattern>
	</servlet-mapping>
```

## 配置处理器适配器
```
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
通过上面代码，可在springmvc.xml中配置处理器适配器
此适配器能执行实现 Controller接口的Handler。
包在spring-webmvc-3.2.0.RELEASE.jar下
```

## 配置处理器映射器
```
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
通过上面代码，可在springmvc.xml中配置处理器映射器
该配置可以将bean的name属性作为url进行查找，需要在配置Handler时指定name属性
包在spring-webmvc-3.2.0.RELEASE.jar下
```

## 配置视图解析器
```
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"/>
通过上面代码，可在springmvc.xml中配置视图解析器
该配置可以解析jsp，默认使用jstl标签，需要引入jstl的jar包
包在spring-webmvc-3.2.0.RELEASE.jar下
```

## 配置处理器
```
编写处理器，必须实现Controller接口
必须实现接口里面handleRequest方法
并指定返回的modelandview
在springmvc中配置处理器，指
定name属性用来访问，class属性
文件位置
<bean name="/test.action" class="com.aly.controller.TestController"/>
```

## 非注解的处理器映射器
```
第一种org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping
第二种org.springframework.web.servlet.handler.SimpleUrlHandlerMapping
多个处理器映射器可以并存，前端控制器判断url能被哪个处理器映射器映射，就让正确的处理器映射器映射。（了解）
处理器映射器
	<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
		处理器映射器  两个可以同时存在
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/test.action">testCon</prop>
			</props>
		</property>
	</bean> 
```

## 非注解的处理器适配器
```
第一种org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter要求编写的Handler实现 Controller接口。
第二种org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter要求编写的Handler实现HttpRequestHandler接口。（方法里面实现和servlet一样）

 处理器适配器
	<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
 处理器适配器
	<bean class="org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter"/>
```

## 注解方式
```
在spring3.1之前使用
处理器映射器org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping
处理器适配器org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter

在spring3.1之后使用
处理器映射器org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping
处理器适配器org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter
可由<mvc:annotation-driven></mvc:annotation-driven>代替（实际开发中也是应用此配置）
```

## 注解方式handler（处理器）的开发
```
@Controller//使用Controller标识 它是一个控制器
@RequestMapping("/test")//url映射可以与方法名不同（一般相同，规范）

@Controller
public class Test2Con {
	
	@RequestMapping("/test.action")
	public ModelAndView test(){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index.jsp");
		System.out.println(1111);
		return mav;
	}
```

## 在spring中加载handler（处理器）
```
第一种方式
需要每个都加载一次
<bean class="com.aly.controller.Test2Con"/>
第二种方式组件扫描（常用方式）
统一加载一次性配置
<!-- 组件扫描方式加载控制器 -->
	<context:component-scan base-package="com.aly.controller" />
```
web工程加载spring配置文件
```
在web.xml文件加入如下代码，启动工程自动加载spring配置文件
<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>/WEB-INF/classes/applicationContext.xml</param-value>
	</context-param>
	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>


<!--加载mapper的，配置在spring配置文件中-->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
		<property name="basePackage" value="com.aly.mapper"/>
		<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
	</bean>
```

## 窄化请求路径
```
@RequestMapping（）不仅可以放在方法上使用，用来确定路径，也可以用作Controller类上，那么访问时需要在方法基础之上再加一层目录，这样的访问方式叫窄化请求路径。
访问路径：http://localhost:8080/test1/test3/test1.action
@Controller
@RequestMapping("/test3")
public class Test3Con {
	@Autowired
	UserMapper userMapper;
	@RequestMapping("/test1.action")
	public ModelAndView test(){
		ModelAndView mav = new ModelAndView();
		User user = userMapper.selectByPrimaryKey(2);
		//下一步操作等同于request.setAttribute();
		mav.addObject("user",user);
		mav.setViewName("/index.jsp");
		return mav;
	}
```

## 视图解析器配置前缀、后缀
```
为了简化jsp跳转url，视图解析器提供了两个参数，可以配置jsp访问url的前缀和后缀。
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<!-- 视图前缀 -->
		<property name="prefix" value=""/>
		<!-- 视图后缀 -->
		<property name="suffix" value="" />
	</bean>

其中，第一个property的name属性为prefix ，规定jsp访问url的前缀，value里面为前缀内容。
第二个property的name属性为suffix，规定jsp访问url的后缀，value里面为后缀内容，一般为.jsp。
```

## Controller里面方法的返回值
```
返回ModelAndView，需要在方法结束时，定义ModelAndView，将model和view分别进行设置。
返回String，直接加视图名，需要在方法参数里面定义Model，在视图名前面加redirect:/forward:相当于重定向或转发。
返回viod，需要在方法参数里面加HttpServletRequest或HttpServletResponse，也可一同时存在，相当于以前的servlet用法。
```

## 参数绑定
默认支持的类型
HttpServletRequest
HttpServletResponse
HttpSession
简单类型（基本数据类型）通过@RequestParam对简单类型进行绑定。如果不使用@RequestParam，要求request传入参数名称和controller方法的形参名称一致，才能绑定成功。如果使用@RequestParam，不用限制request传入参数名称和controller方法的形参名称一致。
domain类绑定参数需要页面中input的name和controller的pojo形参中的属性名称一致，才能将页面中数据绑定到domain对应的属性。（与简单类型互不影响）

## 字符集过滤器
```
Spring的字符集过滤通常用于处理项目中的post乱码问题，该过滤器位于org.springframework.web.filter包中，指向类CharacterEncodingFilter。
<filter>
		<filter-name>CharacterEncodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>CharacterEncodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```

## 文件上传
```
复制所需jar包到工程lib目录下commons-io-2.3.jar
在spring配置文件中加入如下代码
<bean id="multipartResolver"
        class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!-- 设置编码 -->
        <property name="defaultEncoding" value="UTF-8" />
        <!-- 设置上传文件总大小 -->
        <property name="maxUploadSize" value="10240000" />
        <!-- 设置单个上传文件大小 -->
        <property name="maxUploadSizePerFile" value="102400" />
    </bean>


创建上传页面
Method必须是post
必须配置enctype的值为multipart/form-data
<form action="test/upload.action" method="post"
        enctype="multipart/form-data">
        <input type="file" name="uploadFile" value="选择文件" /> 
        <input type="submit"value="提交" />
</form>

创建上传用的controller
@RequestMapping("/upload.action")
	public String upload(Model model,HttpSession session, MultipartFile uploadFile)
            throws Exception {
		
        String originalFilename = uploadFile.getOriginalFilename();
        System.out.println(originalFilename);
        
        String name = originalFilename.substring(originalFilename.lastIndexOf("."));
        UUID uuid = UUID.randomUUID();
        String url = session.getServletContext().getRealPath("/upload/")+uuid+name;
        System.out.println(uuid+name);
        if (uploadFile.getSize() > 0) {
                File realPath = new File("d:/",uuid+name);
                System.out.println(realPath.getPath());
                uploadFile.transferTo(realPath);
            }
        model.addAttribute("url",uuid+name);
        return "/index.jsp";
    }
```