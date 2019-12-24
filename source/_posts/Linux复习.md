---
title: Linux复习
date: 2019-12-09 09:17:37
tags: linux
---
鸟哥的Linux私房菜 基础学习篇（第四版）
Linux的内核版本（p47~p48）
```
3.10.0-123.e17.x86-64
主版本.次版本.发布版本-修改版本
```
奇数、偶数版本分类
主、次版本为奇数：开发中版本（development）
主、次版本为偶数：稳定版本（stable）
<!--more-->
重点回顾（p146）
```
在X Window 的环境下想要强制启动X的组合按键为：[Alt]+[Ctrl]+[Backspace]；
在默认情况下，Linux提供tty1~tty6的终端界面；
在终端环境中，可依据提示字符为$或#判断为一般账号或root账号；
取得终端支持的语系数据可执行【echo $LANG】或【locale】命令；
组合按键中，[Tab]按键可作为：（1）命令补全或（2）文件名补全或（3）参数选项补全，[Ctrl]-[c]可以中断目前正在运行中的程序；
Linux系统上的英文大小写为不同的内容；
联机帮助系统有man及info两个常见的命令；
```

Linux文件权限概率
切换身份命令：
```
su -
```
文件属性
```
-rw-r--r--. 1 root root 1864 May 4 18:01 test.txt

第一栏代表这个文件的类型和权限
第一个字符代表这个文件是目录、文件或链接文件等
[d]代表的是目录，[-]是文件，[|]是链接文件，[b]表示可供存储的周边设备，[c]表示设备文件里面的串行端口设备
接下来的字符中，以三个为一组，且均为【rwx】的三个参数的组合。其中，【r】代表可读，【w】代表可写，【x】代表可执行，如果没有权限，就会出现【-】。
第一组为文件拥有者可具备的权限，第二组为加入此用户组之账号的权限，第三组为非本人且没有加入用户组的其他账号的权限

第二栏 连接数
第三栏 文件拥有者
第三栏 文件所属用户组
第四栏 文件大小
第五栏 文件最后被修改的时间 May 4 18:01
第六栏 文件名
```

例题（p153）
若有一个文件的类型与权限数据为【-rwxr-xr--】，请说明其意义是什么？
答：将十个字符整理成如下所示：
```
【-】【rwx】【r-x】【r--】
1     234   456    789
```
1：代表文件；
234：拥有者权限，可读、可写、可执行；
567：用户组的用户权限，可读可执行；
890：其他用户权限，可读

例题（p155）
如果我的目录为下面的格式，请问testgroup这个用户组的成员与其他人（others）是否可以进入本目录？
```
drwxr-xr-- 1 test1 testgroup 5238 Jun 19 10:25 groups/
```
答：
文件拥有者test1【rwx】可以在本目录中进行任何操作；
而testgroup这个用户组【r-x】的账号，例如test2、test3亦可进入本目录进行操作，但是不能在本目录进行写入的操作；
至于other的权限中【r--】虽然有r，但是由于没有x的权限，因此others的用户，并不能进入此目录。

如何修改文件属性与权限（p156）
chgrp：修改文件所属用户组；
chown：修改文件拥有者；
chomd：修改文件的权限，SUID、SGID、SBIT等的特性。
例题：
将test.txt文件的拥有者改为bin这个账号
```
chown bin test.txt
```
将test.txt文件的拥有者与用户组改回为root
```
chown root:root test.txt
```

例题：（p158）
将.bashrc文件权限改回`-rw-r--r--`
答：`-rw-r--r--`的分数是644，所以命令为
```
chmod 644 .bashrc
```
rwx所对应的数字为，每三个为一组
r：4；w：2；x；1；
符号法修改命令
```
chmod u=rwx,go=rx .bashrc
```

例题（p160）
有个目录的权限如下所示：
```
drwxr--r-- 3 root root 4096 Jun 25 08:35 .ssh
```
系统有个账号名称为vbird，这个账号并没有支持root用户组，请问vbird对这个目录有何权限？是否可切换到此目录中？
答：vbird对此目录仅有r的权限，因此vbird可以查询此目录下的文件名列表，因为vbird不具备有x的权限，亦即vbird没有这个抽屉的钥匙，因此并不能切换到此目录内。

假设有个账号名称为dmtsai，它的家目录在/home/dmtsai/，dmtsai对此目录具有【rwx】的权限。若在此目录下有个名为the_root.data的文件，该文件的权限如下：
```
-rwx------ 1 root root 4365 Sep 19 23:20 the_root.data
```
请问dmtsai对此文件的权限是什么？可否删除此文件？
答：如上所示，由于dmtsai对此文件来说是others身份，因此这个文件它无法读、无法编辑也无法执行，也就是说，它无法变动这个文件的内容。
但是由于这个文件是在它的家目录下，它在此目录下具有rwx的完整权限，因此对于the_root.data这个文件名来说，它是能够删除的。结论就是，dmtsai这个用户能够删除the_root.data这个文件。

Linux文件种类与扩展名（p164）
单一文件或目录的最大容许文件名为255字节，以一个ASCII英文占用一个字节来说，则大约可达255个字符长度。若是以每个汉字占2字节来说，最大文件名就是大约在在128个汉字之间。

Linux目录配置（p166~p167）
```
/etc
系统主要的配置文件几乎都放置在这个目录内，例如人员的账号密码文件、各种服务的启动文件等。
一般来说，这个目录下的各文件属性是可以让一般用户查看的，但是只有root有权利修改。FHS建议不要放置可执行文件（binary）在这个目录中

/opt
这是给第三方辅助软件放置的目录

/sbin
Linux有非常多命令是用来设置系统环境的，这些命令只有root才能够用来设置系统，其他用户最多只能用来查询而已。
放在/sbin下面的为启动过程中所需要的，里面包括了启动、修复、还原系统所需要的命令。

/usr
第二层FHS设置

/var
第二层FHS设置，主要为放置变动性的数据。

/home
这是系统默认的用户家目录（home directory）。在你新增一个一般用户账号时，默认的用户家目录都会被规范到这里来，比较重要的是家目录有两种代号：
~：代表目前这个用户的家目录；
~dmtsai：则代表dmtsai的家目录；

/root
系统管理员（root）的家目录，之所以放在这里，是因为如果进入单人维护模式而仅挂载根目录时，该目录就能够拥有root的家目录，所以我们希望root的家目录与根目录放置在同一个分区中

/proc
这个目录本身就是一个虚拟文件系统（virtual filesystem），它放置的数据都是在内存当中，例如系统内核、进程信息（process）、外接设备的状态及网络状态等。
因为这个目录下的数据都是在内存当中，所以本身不占任何硬盘空间。

/sys
这个目录跟/proc非常相似，也是一个虚拟的文件系统，主要也是记录内核与系统硬件信息相关的内容。
包括目前已加载的内核模块与内核检测到的硬件设备信息等，这个目录同样不占硬盘容量
```
p168
```
/usr/bin
所有一般用户能够使用的命令都放在这里。
目前最新的CentOS7已经将全部的用户命令放置于此，而使用链接文件的方式将/bin链接于此。
也就是说，/usr/bin与/bin是一摸一样的。另外，FHS要求在此目录下不应该有子目录。

/usr/sbin
非系统正常运行所需要的系统命令，最常见的就是某些网络服务器软件的服务命令（daemon）。
不过基本功能与/sbin也差不多，因此目前的/sbin就是链接到此目录中的。
```

CentOS观察（p172）
通过uname检查Linux内核与操作系统的架构版本。
```
查看内核版本
uname -r

查看操作系统的架构版本
uname -m
```

重点回顾（p173~p178）
```
Linux的每个文件中，可分别给予用户、用户组与其他人三种身份的rwx权限；
利用ls -l显示的文件属性中，第一个字段是文件的权限，共十个位，第一个位是文件类型，接下来三个为一组共三组，为用户、用户组、其他人的权限，权限有r、w、x三种；
如果文件名之前多一个“.”，则代表这个文件为隐藏文件；
若需要root的权限时，可使用su -这个命令来切换身份，操作完毕则使用exit离开su的命令环境；
更改文件的用户组支持可用chgrp，修改文件的拥有者可用chown，修改文件的权限可用chmod；
chmod修改权限的方法有两种，分别是符号法与数字法，数字法中r、w、x数字分别为4、2、1；
对文件来讲，权限的性能为：
r：可读取此一文件的实际内容，如读取文本文件的实际内容等；
w：可以编辑、新增或是修改该文件的内容（但不包含删除该文件）；
x：该文件具有可以被系统执行的权限；
对目录来说，权限的功能为：
r：读取目录中的内容；
w：修改目录中的内容；
x：访问目录；
Linux文件名的限制为：单一文件或目录最大容许文件名为255个英文字符或128个中文字符；
FHS所定义的三层主目录为：/、/var、/usr三层；
绝对路径为从根目录/开始写起，否则就是相对路径。
```

目录与路径
常见的处理目录的命令：（p177）
cd：切换目录
pwd：显示当前目录
mkdir：建立一个新目录
rmdir：删除一个空目录

mkdir（建立新目录）（p178）
```
mkdir [-mp] 目录名称
选项与参数：
-m：设置文件权限。直接设置，不使用默认权限（umask）。
-p：帮助你直接将所需要的目录（包含上层目录）递归创建。

范例：建立权限为rwx--x--x的目录。
mkdir -m 711 test2
```

PATH的变量说明（p181）
不同身份用户的PATH不同，默认能够执行的命令也不同（如root与dmtsai）；
PATH是可以修改的；
使用绝对路径或相对路径直接指定某个命令的文件名来执行，会比查找PATH来的正确；
命令应该要放置到正确的目录下，执行才会比较方便；
本目录（.）最好不要放到PATH当中。

文件与目录的查看（p182）
```
范例一：将家目录下的所有文件列出来（含属性与隐藏文件）
ls -al ~

范例三：完整的显示文件的修改时间（modification time）
ls -al --full-time ~
```

p183
```
范例一：用root身份，将家目录下的.bashrc复制到/tmp下，并更名为bashrc。
cp ~/.bashrc /tmp/bashrc
cp -i ~/.bashrc /tmp/bashrc
cp：overwrite '/tmp/bashrc'? n <==n不覆盖，y为覆盖
重复做两次操作，由于/tmp下面已经存在bashrc了，加上-i选项后，则在覆盖前会询问使用者是否确定，可以按下n或y来二次确认。

范例二：切换目录到/tmp，并将/var/log/wtmp复制到/tmp且观察属性。
cd /tmp
cp /var/log/wtmp . <==想要复制到目前的目录，最后的.不要忘。
在不加任何选项的情况下，文件的某些属性/权限会改变。注意，文件建立的时间也不一样。
如果你想要将文件的所有特性都一起复制过来，可以加上-a
cp -a /var/log/wtmp .
查看命令
ls -l /var/log/wtmp wtmp
你会看到/var/log/wtmp的数据特性与wtmp的数据特性完全一模一样。
```

rm（删除文件或目录）（p185）
```
rm [-fir] 文件或目录
-f：就是force的意思，忽略不存在的文件，不会出现警告信息。
-i：交互模式，在删除前会询问是否操作。
-r：递归删除，最常用于目录的删除，这是非常危险的选项。

无提示强制递归删除文件
rm -rf
删除空目录命令
rmdir /tmp/etc
```

数据截取（p190）
head（取出前面几行）
```
head /etc/man_db.conf
默认的情况中，显示前面十行，若要显示前20行，就得要这样：
head -n 20 /etc/man_db.conf
不显示后面的100行，前面的都显示
head -n -100 /etc/man_db.conf
```

tail（取出后面几行）
```
tail /etc/man_db.conf
默认情况中，显示最后的十行，若要显示最后的20行，就得要这样：
tail -n 20 /etc/man_db.conf
如果不想知道有几行，却只想列出100行以后的数据
tail -n +100 /etc/man_db.conf
持续检测/var/log/messages的内容
tail -f /var/log/messages
<==要等到输入[ctrl]-c之后才会结束执行tail这个命令。
```

例题：（p191）
```
假如我想显示/etc/man_db.conf的第11到第20行？
head -n 20 /etc/man_db.conf | tail -n 10

列出正确的行号
答：通过cat -n来显示行号，再用上面的命令截取即可
cat -n /etc/man_db.conf | head -n 20 | tail -n 10
```

修改文件事件或创建新文件：touch（p193）
```
范例一：新建一个空文件并观察时间。
cd /tmp
touch testtouch
ls -l testtouch

范例二：将~/.bashrc复制成为bashrc，假设复制完全的属性，检查日期。
cp -a ~/.bashrc bashrc
date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
共显示四行信息
第一行：目前的时间；第二行：mtime时间；第三行：atime时间；第四行：ctime时间；

范例三：修改范例二的bashrc文件，将日期调整为两天前。
touch -d "2 days ago" bashrc
date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
```
文件与目录的默认权限与隐藏权限
```
例题（p196）
假设你的umask为003，请问该umask情况下，建立的文件与目录权限是什么？
答：umask为003，所以拿掉的权限为--------wx，因此：
文件：（-rw-rw-rw-）-（--------wx）=-rw-rw-r--
目录：（drwxrwxrwx）-（--------wx）=drwxrwxr--

文件隐藏属性（p197）
chattr（配置文件隐藏属性）
范例：请尝试到/tmp下面建立文件夹，并加入i的参数，尝试删除看看。
cd /tmp
touch attrtest
chattr +i attrtest
删除该文件夹
rm attrtest
删除失败，root也没有办法将这个文件删除

范例：将该文件的i属性取消。
chattr -i attrtest

lsattr（显示文件隐藏属性）
chattr +aiS attrtest
lsattr attrtest
显示结果
--S-ia---------- attrtest
```
命令与文件的查找
find（p203） 实践操作/填空
```
范例一：将过去系统上面24小时内有修改过内容（mtime）的文件列出。
find / -mtime 0
0是重点，代表目前的时间，从现在到24小时前。

-mtime n：n为数字，意义为在n天之前的【一天之内】被修改过内容的文件；
-mtime +n：列出在n天之前（不含n天本身）被修改过内容的文件；
-mtime -n：列出在n天之后（含n天本身）被修改过内容的文件；
-newer file：file为一个存在的文件，列出比file还要新的文件

范例二：寻找/etc下面的文件，如果文件日期比/etc/passwd新就列出。
find /etc -newer /etc/passwd

范例三：查找/home下面属于dmtsai的文件。
find /home -user dmtsai

范例四：查找系统中不属于任何人的文件。
find / -nouser

范例五：找出文件名为passwd这个文件
find / -name passwd
找出文件名包含了passwd这个关键字的文件
find / -name "*passwd*"

范例六：找出/run目录下，文件类型为socket的文件名有哪些？
find /run -type s

范例七：查找文件当中含有SGID、SUID或SBIT的属性。
find / -perm /7000
```
重点回顾（p206～p207）

绝对路径：一定由根目录/写起；相对路径：不由/写起，而是由相对当前目录写起；
特殊目录有：.、..、-、～、～account需要注意；
rmdir仅能删除空目录，要删除非空目录需要使用【rm -r】命令；
ls可以查看文件属性，尤其-d、-a、-l等选项特别重要；
cat -n与nl均可显示行号，但默认情况下，空白行会不会编号并不相同；
touch的目的在修改文件的时间参数，但亦可用来建立空文件；
一个文件记录的时间参数有三种，分别是读取时间（access time，atime）、状态时间（status time，ctime）、修改时间（modification time，mtime），ls默认显示的是mtime；
观察文件的类型可以使用file命令来观察；
查找命令的完整文件名可用which或type，这两个命令都是通过PATH变量来查找文件名；
查找文件的完整文件名可以使用whereis找特定目录或locate到数据库去查找，而不实际查找文件系统。

文件系统的简单操作
磁盘与目录的容量
```
范例一：将系统内所有的文件系全列出来。
df
范例二：将容量结果以易读的格式显示出来。
df -h
不同于范例一，这里会以G/M等容量格式显示出来，比较容易看。

范例三：将系统内的所有特殊文件格式及名称都列出来。
df -aT
范例四：将/etc下面的可用的磁盘容量以易读的容量格式显示。
df -h /etc
范例五：将目前各个硬盘分区可用的inode数量列出。
df -ih
```
du（p227）
```
范例一：列出目前目录下的所有文件容量。
du
范例二：同范例一，但是将文件的容量也列出来。
du -a
范例三：检查根目录下面每个目录所占用的容量。
du -sm /*
```
硬链接与符号链接：ln（p230）
```
范例一：将/etc/passwd复制到/tmp下面，并且观察inode与区块。
cd /tmp
cp -a /etc/passwd
du -sb ; df -i

范例二：将/tmp/passwd制作硬链接成为passwd-hd文件，并查看文件与容量。
ln passwd passwd-hd
du -sb ; df -i
即使多了一个文件在/tmp下面，整个inode与区块的容量并没有变。

范例三：将/tmp/passwd建立一个符号链接。
ln -s passwd passwd-so
passwd-so指向的inode number不同了，这是一个新文件，这个文件的内容是指向passwd这个文件。
passwd-so这个文件的大小是6Bytes，因为【passwd】这个单词共有六个字符之故。
整个容量与inode使用数都改变
删除原始文件passwd，其它两个文件不能开启。
```
磁盘格式化（创建文件系统）（p238）
以XFS文件系统为例
将/dev/vda4格式化为xfs文件系统
mkfs.xfs /dev/vda4
查看文件系统
blkid /dev/vda4

文件系统挂载与卸载（p244）
挂载xfs/ext4/vfat等文件系统
```
范例：找出/dev/vda4的UUID后，用该UUID来挂载文件系统到/data/xfs内。
blkid /dev/vda4
记录UUID
创建目录
mkdir -p /data/xfs
挂载
mount UUID="" /data/xfs
查看挂载结果
df /data/xfs
```
挂载CD或DVD光盘
```
范例：将你用来安装Linux的CentOS安装光盘拿出来挂载到/data/cdrom。
查看光盘信息
blkid
创建挂载目录
mkdir /data/cdrom
挂载
mount /dev/sr0 /data/cdrom
显示挂载信息
df /data/cdrom
```
umount（将设备文件卸载）（p246）
查看已挂载的文件系统
mount
以/dev/vda4卸载为例
umount /dev/vda4
