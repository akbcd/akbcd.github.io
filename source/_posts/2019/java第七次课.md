---
title: java第七次课
date: 2019-08-13 12:00:31
tags: java基础
---
本次课主要是Java基础知识回顾以及部分习题及答案
<!--more-->
## Java基础知识回顾
1. **类里面有什么？**
    1. 属性和方法
2. **如何创建对象？**
    1. **无参构造方法**
        1. 类名 对象名=new 类名()
    2. **有参构造方法**
        1. 类名 对象名=new 类名(参数列表)
3. **如何访问类里面的成员？**
    1. 对象名.成员
    2. 私有成员利用 get/set 方法
    3. 有参构造方法 创建对象时直接访问并修改
4. **构造方法的规则？**
    1. 没有返回值类型
    2. 方法名与类名相同
    3. 系统在创建对象时自动调用，没有显式声明，系统默认提供一个无参的构造
    4. 不能被static、final、synchronized、abstract和native修饰
    5. 构造方法不能被子类继承，所以用final和abstract修饰没有意义
5. **构造方法的作用？**
    1. 初始化对象
    2. 给成员变量赋初始值，创建对象
6. **方法重载的定义，方法重写的定义? 构造方法是否能重载？是否能重写？**
    1. 重载发生在一个类中，方法名字必须相同，参数列表必须不同（顺序，个数，类型不同），返回值类型是否相同不影响
    2. 重写：子类不能满足父类的实现。方法声明部分一样，方法内容不同
    3. 构造方法能重载不能重写
7. **this的意义？super的意义？**
    1. this代表当前对象，可以区分成员变量与局部变量重名问题
    2. super代表父类对象，可以调用父类成员
8. **一个类能创建几个对象？**
    1. 正常的一个类可以创建多个对象
    2. 抽象类无法实例化，不能创建对象
9. **类和对象的关系？**
    1. 类是对象的模板
    2. 对象是类的实例
10. **面向对象的特征？**
    1. 封装 继承 多态 抽象
11. **封装的含义，写法**
    1. 把属性私有化，目的是保护属性不被外界访问，通过set和get方法操作属性
12. **变量的分类？**
    1. 以数据类型分类
        - 基本数据类型 引用数据类型
    2. 以声明位置分类 
        - 局部变量和成员变量
    3. 实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null
    4. 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用
13. **静态成员和非静态成员的区别？**
    1. 静态成员 
	    - 随着类的加载而加载
	    - 优先于对象存在
	    - 被所有对象所共享
	    - 可以直接被类名调用
    2. 区别	
        - 两个变量的生命周期不同
	    	1. 成员变量随着对象的创建而存在，随着对象的回收而释放
	    	2. 静态变量随着类的加载而存在，随着类的消失而消失
        - 调用方式不同
	    	1. 成员变量只能被对象调用
	    	2. 静态变量可以被对象调用，还可以被类名调用
        - 别名不同 
	    	1. 成员变量也称为实例变量 
	    	2. 静态变量称为类变量
        - 数据存储位置不同 
	    	1. 成员变量数据存储在堆内存的对象中，所以也叫对象特有数据
	    	2. 静态变量数据：存储在方法区(的静态区)，所以也叫对象的共享数据
        - 静态成员可以直接访问，非静态成员需要分配内存后才能进行访问
        - 静态成员不能访问非静态成员
14. **继承的关键字？继承的意义？**
    1. 关键字
        - extends
    2. 减少代码量
    3. 意义 
        - 新类具有继承类的数据属性和行为，并可以扩展新的能力
        - 子类可以继承父类除了private的其他成员
15. **继承中的构造规则？**
    1. 子类的构造过程中必须调用父类的构造方法
    2. 子类可以在自己的构造方法中使用super(argumentList)来调用父类的构造方法;
    3. 使用this（argumentList）调用本类的其他构造方法
    4. 如果使用super(argumentList)来调用父类的构造方法，必须写在子类构造方法的第一行。
    5. 如果子类的构造方法中没有明确地调用父类的构造方法，则默认调用无参的构造方法。相当于在子类构造方法中默认执行super()
    6. 如果子类构造方法中，即没有显示地调用父类的构造方法，而基类中也没有无参的构造方法，则编译不通过。
16. **抽象类和接口的区别？**
    1. 接口里面有常量和抽象方法，有abstract关键字
    2. Java抽象类可以提供某些方法的部分实现，而Java接口不可以（就是interface中只能定义方法，而不能有方法的实现，而在abstract class中则可以既有方法的具体实现，又有没有具体实现的抽象方法）
    3. 相同点：
        - 都不能被实例化
        - 接口的实现类或抽象类的子类都只有实现了接口或抽象类中的方法后才能实例化。
    4. 不同点：
        - 接口只有定义，不能有方法的实现，java 1.8中可以定义default方法体，而抽象类可以有定义与实现，方法可在抽象类中实现。
        - 实现接口的关键字为implements，继承抽象类的关键字为extends。一个类可以实现多个接口，但一个类只能继承一个抽象类。所以，使用接口可以间接地实现多重继承。
        - 接口强调特定功能的实现，而抽象类强调所属关系。
        - 接口成员变量默认为public static final，必须赋初值，不能被修改；其所有的成员方法都是public、abstract的。抽象类中成员变量默认default，可在子类中被重新定义，也可被重新赋值；抽象方法被abstract修饰，不能被private、static、synchronized和native等修饰，必须以分号结尾，不带花括号。
        - 接口被用于常用的功能，便于日后维护和添加删除，而抽象类更倾向于充当公共类的角色，不适用于日后重新对立面的代码修改。功能需要累积时用抽象类，不需要累积时用接口。
17. **final的作用！** 
    1. final可以修饰类，这样的类不能被继承。
    2. final可以修饰方法，这样的方法不能被重写。 
    3. final可以修饰变量，这样的变量的值不能被修改，是常量。
18. **定义接口的关键字，实现接口的关键字，接口是否可以继承接口？**
    1. 定义接口 interface 
    2. 实现接口 implements
    3. 接口可以继承接口 
19. **代码块的种类，执行顺序？**
    1. 普通代码块：普通方法体中的代码,方法被调用时执行
    2. 静态代码块：用static修饰的代码 例如  static{},类加载的时候支持，只执行一次
    3. 构造代码块：直接用大括号括起来的代码块，没有方法名，没有返回类型，例如{}，对象被new的时候调用，构造对象时，先执行构造代码块里的代码，再执行构造函数里的代码，每次new对象的时候，构造代码块里的代码都会被执行
    4. 同步代码块：用synchronize注释的代码，例如synchronized{}
    5. 初始化子类的执行顺序：父类静态代码块——子类静态代码块——父类构造函数和变量初始化（按编码顺序执行）,构造代码块在构造函数前面执行——子类构造函数和变量初始化（按编码顺序执行）,构造代码块在构造函数前面执行
20. **内部类有几种？**
    1. **常规内部类**：常规内部类没有用static修饰且定义在在外部类类体中。
        - 常规内部类中的方法可以直接使用外部类的实例变量和实例方法。在常规内部类中可以直接用内部类创建对象。
    2. **静态内部类**：与类的其他成员相似，可以用static修饰内部类，这样的类称为静态内部类。静态内部类与静态内部方法相似，只能访问外部类的static成员，不能直接访问外部类的实例变量，与实例方法，只有通过对象引用才能访问。
        - 由于static内部类不具有任何对外部类实例的引用，因此static内部类中不能使用this关键字来访问外部类中的实例成员，但是可以访问外部类中的static成员。这与一般类的static方法相通。
    3. **局部内部类**：在方法体或语句块（包括方法、构造方法、局部块或静态初始化块）内部定义的类成为局部内部类。局部内部类不能加任何访问修饰符，因为它只对局部块有效。
        - 局部内部类只在方法体中有效，就想定义的局部变量一样，在定义的方法体外不能创建局部内部类的对象
            * 在方法内部定义类时，应注意以下问题：
                - 方法定义局部内部类同方法定义局部变量一样，不能使用private、protected、public等访问修饰说明符修饰，也不能使用static修饰，但可以使用final和abstract修饰
                - 方法中的内部类可以访问外部类成员。对于方法的参数和局部变量，必须有final修饰才可以访问。
                - static方法中定义的内部类可以访问外部类定义的static成员
    4. **匿名内部类**：定义类的最终目的是创建一个类的实例，但是如果某个类的实例只是用一次，则可以将类的定义与类的创建，放到与一起完成，或者说在定义类的同时就创建一个类。以这种方法定义的没有名字的类成为匿名内部类。
21. **如何给对象的属性赋值？有几种？**
    1. 对象名.属性
    2. set方法
    3. 构造方法
22. **如何判断一个引用类型是不是 另外一个引用类型？** 
    1. instanceof
23. **你所学过的修饰符，以及用法？**
    1. 权限修饰符
        - public：整个项目下
        - private：私有的，只能在本类中使用
        - 缺省的：同包中使用
        - protected：不同包中，有继承关系的
    2. final  修饰符  
        - final的意思是不可变，他可以修饰类、字段、方法。
        - 修饰类后类不能被扩展（extends），也就是不能被继承。
        - 修饰字段后字段的值不能被改变，因此如果有final修饰字段，应该对字段进行手动初始化。
        - 修饰方法后该方法不能被改变，也就是重写。 
    3. abstract修饰符 
        - abstract是抽象的意思，用来修饰类和方法，修饰类后，该类为抽象类
        - 不能被实例化，必需进行扩展。修饰方法后，该方法为抽象方法必须被子类重写（override）。 
    4. static修饰符 
        - static用来修饰内部类，方法，字段。
        - 修饰内部类说明该内部类属于外部类而不属于外部类的某个实例。
        - 修饰字段说明该字段属于类而不属于类实例。
24. **java中包的意义？**
	1. 包是便于管理项目，区分项目里面的类重名问题
25. **目前所学的书写规范？**
    1. class名字必须首字母大写，驼峰标识
    2. 变量名和方法名必须首字母小写，驼峰标识
    3. 包名所有字母都是小写，用点管理
    4. 每一行语句，前面要有tab缩进
    5. 每一个功能、属性都要加注释
***
## 部分习题及答案
### 问题1
（封装、继承、多态）创建三个类，组成一个继承树，表示游戏中的角色。
描述如下：
父类：Role。是所有职业的父类。 属性： name，表示角色的名字。 
方法：public int attack() ，该方法返回值为角色的攻击对敌人的伤害。
Role 有两个子类：
1）法师Magicer 属性：魔法等级（范围为1 ~ 10） 方法： public int attack() ，该方法返回法师的攻击对敌人造成的伤害值。 法师攻击伤害值为：魔法等级*魔法基本伤害值（固定为5）
2）战士Soldier 属性：攻击伤害值 方法： public int attack() ，该方法返回战士的攻击对敌人造成的伤害值。 战士的攻击伤害值为：其攻击伤害属性值 注意：上述的三个类所有属性都应当作为私有，并提供相应的get/set 方法。
再设计一个Team 类，表示一个组队。具有如下方法
1）addMember，表示组队增加一个成员。注意：组队成员最多为6 人 
提示：应当利用一个数组属性，保存所有成员
2）attackSum，表示组队所有成员进行攻击时，对敌人造成的总伤害值 省略 get/set 方法后的类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5lzmpj30jp08hmy2.jpg)
根据类图和描述，创建相应的类。并编写相应的测试代码。
***
**代码**
* Magicer.java

```
package jichengshu;
//法师
class Magicer extends Role {
	//魔法等级，范围1~10
	private int level;

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	//返回法师的攻击对敌人造成的伤害值。 
	public int attack() {
		return level * 5;
	}
}
```
* Role.java

```
package jichengshu;
//所有职业的父类
public class Role {
	//角色的名字
	private String name;
	 public String getName() {
	  return name;
	 }
	 public void setName(String name) {
	  this.name = name;
	 }
	 //public int attack()
	 public int attack(){
	  return 0;
	 }
}
```
* Soldier.java

```
package jichengshu;
//战士
class Soldier extends Role {
	//攻击伤害值
	private int hurt;

	public int getHurt() {
		return hurt;
	}

	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
	//返回战士的攻击对敌人造成的伤害值
	public int attack() {
		return hurt;
	}
}
```
* Team.java

```
package jichengshu;

class Team {
	static int i = 0;
	//组队成员最多为6人
	static Role member[] = new Role[6];
	//添加成员
	void addMember(Role role) {
		member[i++] = role;
	}
	//对敌人造成的总伤害
	int attackSum() {
		int sum = 0;
		for (int j = 0; j < i; j++) {
			sum += member[j].attack();
		}
		return sum;
	}
}
```
* Test.java

```
package jichengshu;

public class Test {
	public static void main(String args[]) {
		//创建Role对象
		Role role = new Role();
		//创建Soldier对象
		Soldier soldier = new Soldier();
		//新建战士
		role = soldier;
		soldier.setName("少华");
		soldier.setHurt(5);
		System.out.println("战士" + soldier.getName() + "的攻击伤害值为：" + soldier.attack());
		//创建法师对象
		Magicer magicer = new Magicer();
		//新建法师
		role = magicer;
		role.setName("君艳法师");
		magicer.setLevel(7);
		System.out.println("战士" + magicer.getName() + "的攻击伤害值为：" + magicer.attack());
		//团队对象
		Team team = new Team();
		team.addMember(magicer);
		team.addMember(soldier);
		System.out.println("所有成员的伤害总值为：" + team.attackSum());
	}
}
```
### 问题2
在之前的游戏角色 Role 程序上进行修改。
```
1） 创建 Role 接口，包含两个方法：    
    a) int attack(); 表示攻击，返回值表示对敌人的伤害    
    b) void practise(); 表示练习。练习之后对敌人的伤害会增加。
2） 创建 NamedRole 类，该类为一个抽象类，实现了 Role 接口，并有两个属性：name 和 age， 表示角色的名字和年龄。
3） 增加 MagicStick 接口。该接口表示法师使用的法杖。接口中包含一个方法，方法为： int fire()
4） 为 MagicStick 类增加两个实现类，分别为 GreenStick 和 BlackStick。其中，对于这两个类的 fire 方法：
    a) GreenStick 平时返回 1，夏天（6~8 月）使用时返回 2 
    b) BlackStic 奇数月返回 1，偶数月返回 2
5） 修改 Magicer 类  
    a) 为法师类增加 MagicStick 类的属性 stick，表示法师使用的法杖。   
    b) 让其继承自 NamedRole 类，并实现 attack 和 practise 功能。其中 
        i. attack 返回值为法师的魔法等级(level) *每一级的固定伤害(5) 
        ii. practise()方法：    
            1. 当法师的 stick 属性为 null 时，调用 practise 则 level++    
            2. 当法师的 stick 不为 null 时，调用 practise 方法时，法师的等级 level 满足： level = level + 1 + stick.fire()；即：法师的    等级增加为 1+stick 属性的 fire 方法的返回值
6） 增加 Weapon 接口，表示战士使用的武器。Weapon 接口中定义了两个方法：void setSoldier(Soldier s); 该方法表示设置武器的使用者int fire(); 该方法的返回值表示战士使用该武器时，对敌人的伤害值
7） 为 Weapon 增加两个实现了，一个为 Bolo，表示大刀，一个为 Pike，表示长矛。对这两个实现类的描述如下：Bolo : 当 soldier 的年龄大于等于 18 岁时，fire 方法返回 100当 soldier 年龄小于 18 岁时，fire 方法返回 50Pike：Pike 类有一个属性：name，表示长矛的名字。当长矛的名字和战士的名字一致时，fire 方法返回 1000；当长矛的名字和战士的名字不一致时，fire 方法返回 25
8） 修改 Soldier 类    
    a) 为 Soldier 类增加一个 Weapon 属性，表示战士的武器    
    b) 让其继承自 NamedRole 类，并实现 attack 和 practise 功能。其中        
        i. Soldier 的 attack 返回值为战士的 hurt 值与武器的 fire 方法返回值的和，即 总攻击输出 = 战士的徒手伤害值 + 武器的伤害值        
        ii. practise()方法：每调用一次则战士的 hurt 值+10
9） 编写相应的测试代码。   要求：两个人一组合作完成。一个人负责把一个整数 n 拆分成两个整数的和，另一个人负责写一个函数，判断某一个整数 a 是否是质数
```
***
**代码**
* Role.java

```
package role;

import java.util.Date;

interface Role{
	int attack();
	void practise();
}

interface MagicStick{
	int fire();
}

class GreenStick implements MagicStick{
	public int fire(){
		Date d = new Date();
		if (d.getMonth() >=6 && d.getMonth() <= 8){
			return 2;
		}else return 1;
	}
}

class BlackStick implements MagicStick{
	public int fire(){
		Date d = new Date();
		if (d.getMonth() % 2 == 0){
			return 2;
		}else return 1;
	}
}

interface Weapon{
	int fire();
	void setSoldier(Soldier s);
}

class Bolo implements Weapon{
	private Soldier s;
	public void setSoldier(Soldier s){
		this.s = s;
	}
	public int fire(){
		if (s.getAge()>=18) return 100;
		else return 50;
	}
}

class Pike implements Weapon{
	private Soldier s;
	private String name;
	public Pike(){}
	public Pike(String name){this.name = name;}
	
	public int fire() {
		if (s.getName().equals(name)){
			return 1000;
		}else {
			return 25;
		}
	}
	public void setSoldier(Soldier s) {
		this.s = s;
	}
	
}

abstract class NamedRole implements Role{
	private String name;
	private int age;
	
	public NamedRole(){}
	
	public NamedRole(String name, int age) {
		this.name = name;
		this.age = age;
	}

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
}
class Magicer extends NamedRole{
	private int level = 1;
	private MagicStick stick;
	public Magicer(){}
	
	public Magicer(String name, int age,  int level) {
		super(name, age);
		if (level > 10 || level < 1){
			System.out.println("level error!");
			return;
		}
		this.level = level;
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		if (level<1 || level > 10){
			System.out.println("level error!");
			return;
		}
		this.level = level;
	}

	public MagicStick getStick() {
		return stick;
	}

	public void setStick(MagicStick stick) {
		this.stick = stick;
	}

	public int attack(){
		return level * 5;
	}

	public void practise() {
		level ++;
		if (stick != null){
			level += stick.fire();
		}
	}
}

class Soldier extends NamedRole{
	private int hurt;
	private Weapon weapon;
	
	public Soldier(){}
	
	public Soldier(String name,int age,  int hurt) {
		super(name, age);
		this.hurt = hurt;
	}

	public Weapon getWeapon() {
		return weapon;
	}

	public void setWeapon(Weapon weapon) {
		this.weapon = weapon;
	}

	public int getHurt() {
		return hurt;
	}

	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
	
	public int attack(){
		int result = hurt;
		if (weapon != null){
			result += weapon.fire();
		}
		return result;
	}

	public void practise() {
		hurt += 10;
	}
}
```
* TestRole.java

```
package role;

public class TestRole {
	public static void main(String[] args) {
		MagicStick ms1 = new GreenStick();
		MagicStick ms2 = new BlackStick();
		Magicer m1 = new Magicer("John", 20, 5);
		Magicer m2 = new Magicer("Tom", 30, 8);
		m1.setStick(ms1);
		m2.setStick(ms2);
		
		System.out.println(m1.attack());
		System.out.println(m2.attack());
		
		m1.practise();
		m2.practise();
		
		System.out.println(m1.attack());
		System.out.println(m2.attack());
		
		
		Weapon w1 = new Bolo();
		Weapon w2 = new Pike("Jerry");
		Soldier s1 = new Soldier("Tom", 19, 100);
		Soldier s2 = new Soldier("Jerry", 25, 150);

		s1.setWeapon(w1);
		w1.setSoldier(s1);
		
		s2.setWeapon(w2);
		w2.setSoldier(s2);
		
		System.out.println(s1.attack());
		System.out.println(s2.attack());
		
		s1.practise();
		s2.practise();
		
		System.out.println(s1.attack());
		System.out.println(s2.attack());
	}
}
```
### 问题3
编写一个简单的客户类SimpleCustomer
要求：
```
1.	该类拥有四个属性：
	1）	int id  代表客户代码
	2）	String name 代表客户姓名
	3）	String address 代表客户住址
	4）	String phoneNumber 代表客户电话号码
2.	构造方法：
	1） SimpleCustomer()
	2)	SimpleCustomer(int id, String name, String address, String phoneNumber)
	3)	SimpleCustomer(SimpleCustomer sc)
3.	普通方法：
	1）	一系列get/set方法
		getId(), setId(int id), 
        getName(), setName(String name), 
        getAddress(), setAddress(String address), 
        getPhoneNumber(), setPhoneNumber(String phoneNumber)
	2）	public String toString() //返回客户的基本信息，格式为：
		The customer’s information is:
		id: 100
		name: Arthur
		address: China, Beijing, Xicheng District, Xidan Time Square Building, 100036
		phoneNumber: +861012345678
4.	编写一个测试类，对SimpleCustomer类进行测试
```
***
**代码**
* SimpleCustomer.java

```
package simplecustomer;

public class SimpleCustomer {
	//四个属性
	private int id;
	private String name;
	private String address;
	private String phoneNumber;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	//三个构造方法
	public SimpleCustomer() {
		
	}
	public SimpleCustomer(int id, String name, String address, String phoneNumber) {
		
	}
	public SimpleCustomer(SimpleCustomer sc) {
		
	}
	//toString方法
	public String toString() {
		return "The customer’s information is:"+"\n"+"id:"+id+"\n"+"name:"+name+"\n"+"address:"+address+"\n"+"phoneNumber:"+phoneNumber;	
	}
}
```
* Test.java

```
package simplecustomer;

public class Test {
public static void main(String[] args) {
	SimpleCustomer a=new SimpleCustomer();
	a.setId(10);
	a.setName("Arthur");
	a.setAddress("China, Beijing, Xicheng District, Xidan Time Square Building, 100036");
	a.setPhoneNumber("+861012345678");
	System.out.println(a.toString());
	}
}
```
### 问题4
改写SimpleCustomer类，编写一个增强的Customer类
要求：
```
1.	在SimpleCustomer类的基础上，将address部分剥离出来，编写一个单独的Address类
	Address类属性：
	1）	String country  //国家
	2）	String city  //城市
	3）	String district 	//区
	4）	String detailedAddress //详细住址
	5）	int postCode //邮编
	Address类方法：
	1）	构造方法 
    Address(String country, String city, String district, String detailedAddress, int postCode)
	2）	get/set方法
	3）	toString方法 //返回地址类的基本信息，将各属性用逗号连接在一起
2.	将Address对象作为一个属性，按照SimpleCustomer类的思路编写Customer类
```
***
**代码**
* Customer.java

```
package simplecustomer;

public class Customer {
	// 四个属性
	private int id;
	private String name;
	private String phoneNumber;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	//创建内部类
	class Address {
		// 5个属性
		private String country;//国家
		private String city;//城市
		private String district;//区
		private String detailedAddress;//详细地址
		private int postCode;//邮编

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getDistrict() {
			return district;
		}

		public void setDistrict(String district) {
			this.district = district;
		}

		public String getDetailedAddress() {
			return detailedAddress;
		}

		public void setDetailedAddress(String detailedAddress) {
			this.detailedAddress = detailedAddress;
		}

		public int getPostCode() {
			return postCode;
		}

		public void setPostCode(int postCode) {
			this.postCode = postCode;
		}

		// 构造方法
		public Address(String country, String city, String district, String detailedAddress, int postCode) {
		}

		// toString方法
		public String toString() {
			return country + "," + city + "," + district + "," + detailedAddress + "," + postCode;
		}
	}
}

```
### 问题5
（封装）已知一个类Student 代码如下
```
class Student {
    String name;
    int age;
    String address;
    String zipCode;
    String mobile;
}
```
a)把Student的属性都作为私有，并提供get/set方法以及适当的构造方法。
b)为Student类添加一个getPostAddress方法，要求返回Student对象的地址和邮编
***
**代码**
```
public class Student {
	private String name;
	private int age;
	private String address;
	private String zipCode;
	private String mobile;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String[] getPostAddress() {
		String[] array = new String[2];
		array[0] = this.address;
		array[1] = this.zipCode;
		return array;
	}
}
```
### 问题6
定义一个 Performer 接口，表示一个演员，接口中定义 perform 方法，表示表演。为这个接口提供若干实现类：Singer，表示歌手；Dancer，表示舞蹈演员；Player，表示演奏者。类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5s9frj309j06bq30.jpg)
定义一个 Program 类，表示一个节目。每一个节目需要多个演员配合，因此每一个 Program 类中都包含一个属性：Performer 数组，表示表演这个节目的所需要的演员。
给出 Program 的部分代码:
```
class Program {
    private Performer[] ps;
    public Program(){
        ps = new Performer[3];
        ps[0] = new Singer();
        ps[1] = new Dancer();
        ps[2] = new Player();
    }
}
```
在现有代码基础上，为 Program 增加一个 show 方法，在这个方法中，调用所有表演这个节目的所有 Performer 的 perform 方法。
Program 类图如下：
![](http://tva1.sinaimg.cn/large/0060lm7Tly1g5yvv5wfvlj304e035t8j.jpg)
***
**代码**
* Performer.java

```
package performer;

public interface Performer {
	public void perform(); // 表演
}
```
* Dancer.java

```
package performer;

public class Dancer implements Performer {

	@Override
	public void perform() {
		// TODO Auto-generated method stub
		System.out.println("舞蹈演员跳舞");
	}

}

```
* Player.java

```
package performer;

public class Player implements Performer {

	@Override
	public void perform() {
		// TODO Auto-generated method stub
		System.out.println("演奏者演奏乐器");
	}

}

```
* Program.java

```
package performer;

public class Program {
	Performer []arr; // 表演者数组
	public void show(Performer []arr){ // 引入节目演员，并通过for循环调用里面成员的表演方法
		System.out.println("演出开始：");
		System.out.println("______________");
		for(int i=0;i<arr.length;i++){
			arr[i].perform();
		}
	}
	public void end(){
		System.out.println("______________");
		System.out.println("演出结束，谢谢观看");
	}
}

```
* Singer.java

```
package performer;

public class Singer implements Performer {

	@Override
	public void perform() {
		System.out.println("歌手唱歌");
	}

}

```
* TestAll.java

```
package performer;

public class TestAll {
	public static void main(String[] args) {
		Singer p1 = new Singer(); // 一个歌手
		Dancer p2 = new Dancer(); //一个舞蹈演员
		Player p3 = new Player(); //一个演奏者
		
		Program program = new Program(); //一个节目
		program.arr = new Performer[]{p1,p2,p3};//一个演员数组
		program.show(program.arr);//表演节目
		program.end(); // 演出结束
		
	}
}

```
### 问题7
设计一个类 MyClass，为 MyClass 增加一个 count 属性，用来统计总共创建了多少个对象。
***
**代码**
```
public class MyClass {
	//Java中如何统计某个类当前所生成的对象的个数？
	public static int num; // 静态变量
	public MyClass(){
		num++;  // 利用构造函数内来进行计数
	}
	
	public static void main(String[] args) {
		MyClass m = new MyClass(); // 每次创建对象都会调用构造函数
		System.out.println(num);  // 输出
	
	}
}
```