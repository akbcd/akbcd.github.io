---
title: Linux复习
date: 2019-12-09 09:17:37
tags: [linux,大学]
excerpt: false
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

第四章重点回顾
```
在Xwindow的环境下想要强制重新启动X的组合键为：【Alt】+【Ctrl】+【backspace】；
默认情况下，Linux提供tty1~tty6的终端界面；
在终端环境中，可依据提示字符为$或#判断为一般账号或root账号
取得终端支持的语系数据可执行【echo$LANG】或【locale】命令；
data可显示日期，cal可显示日历，bc可以作为计算器；
组合键中，【tab】按键可做为：（1）命令补齐或（2）文件名补齐或（3）参数选项补齐，【crtl】-【c】可以终止目前正在运行的程序；
Linux系统上的英文大小写为不同内容
联合帮助系统有man及info两个常见命令；
```

第五章重点回顾
```
Linux的每个文件中，可分别给予使用者、群组与其他人三种身份个别的 rwx 权限；
群组最有用的功能之一，就是当你在团队开发资源的时候，且每个帐号都可以有多个群组的支持；
利用ls -l显示的文件属性中，第一个字段是文件的权限，共有十个位，第一个位是文件类型， 接下来三个为一组共三组，为使用者、群组、其他人的权限，权限有r,w,x三种；
如果文件名之前多一个“ . ”，则代表这个文件为“隐藏文件”；
若需要root的权限时，可以使用 su - 这个指令来切换身份。处理完毕则使用 exit 离开 su 的指令环境。
更改文件的群组支持可用chgrp，修改文件的拥有者可用chown，修改文件的权限可用chmod
chmod修改权限的方法有两种，分别是符号法与数字法，数字法中r,w,x分数为4,2,1；
对文件来讲，权限的性能为：
	r：可读取此一文件的实际内容，如读取文本文件的文字内容等；
	w：可以编辑、新增或者是修改该文件的内容（但不含删除该文件）；
	x：该文件具有可以被系统执行的权限。
对目录来说，权限的性能为：
	r （read contents in directory）
	w （modify contents of directory）
	x （access directory）
要开放目录给任何人浏览时，应该至少也要给予r及x的权限，但w权限不可随便给；
能否读取到某个文件内容，跟该文件所在的目录权限也有关系 （目录至少需要有 x 的权限）。
Linux文件名的限制为：单一文件或目录的最大容许文件名为 255 个英文字符或 128 个中文字符；
根据FHS的官方文件指出， 他们的主要目的是希望让使用者可以了解到已安装软件通常放置于那个目录下
FHS订定出来的四种目录特色为：shareable, unshareable, static, variable等四类；
FHS所定义的三层主目录为：/, /var, /usr三层而已；
绝对路径文件名为从根目录 / 开始写起，否则都是相对路径的文件名。
```

第六章重点回顾
```
绝对路径：『一定由根目录 / 写起』；相对路径：『不由 / 写起，而是由相对当前目录写起』
特殊目录有： ., …, -, ~, ~account 需要注意；
与目录相关的指令有： cd, mkdir, rmdir, pwd 等重要指令；
rmdir 仅能删除空目录，要删除非空目录需使用『rm -r 』指令；
用户能使用的指令是依据 PATH 变量所规定的目录去搜寻的；
ls 可以检视文件的属性，尤其 -d, -a, -l 等选项特别重要！
文件的复制、删除、移动可以分别使用： cp, rm , mv 等指令来操作；
检查文件的内容(读文件)可使用的指令包括有： cat, tac, nl, more, less, head, tail, od 等
cat -n 与 nl 均可显示行号，但默认的情况下，空白行会不会编号并不相同；
touch 的目的在修改文件的时间参数，但亦可用来建立空文件；
一个文件记录的时间参数有三种，分别是 access time(atime), status time (ctime), modification time(mtime)， ls默认显示的是 mtime。
观察文件的类型可以使用 file 指令来观察；
搜寻指令的完整文件名可用 which 或 type ，这两个指令都是透过 PATH 变量来搜寻文件名；
搜寻文件的完整档名可以使用 whereis 找特定目录或 locate 到数据库去搜寻，而不实际搜寻文件系统；
利用 find 可以加入许多选项来直接查询文件系统，以获得自己想要知道的档名。
```

第七章重点回顾
```
一个可以被挂载的数据通常称为“文件系统, filesystem”而不是分区 （partition） 喔！
基本上 Linux 的传统文件系统为 Ext2 ，该文件系统内的信息主要有：	
	superblock：记录此 filesystem 的整体信息，包括inode/block的总量、使用量、剩余量， 以及文件系统的格式与相关信息等；
	inode：记录文件的属性，一个文件占用一个inode，同时记录此文件的数据所在的 block 号码；
	block：实际记录文件的内容，若文件太大时，会占用多个 block 。
Ext2 文件系统的数据存取为索引式文件系统（indexed allocation）
需要磁盘重组的原因就是文件写入的 block 太过于离散了，此时文件读取的性能将会变的很差所致。 这个时候可以通过磁盘重组将同一个文件所属的 blocks 汇整在一起。
Ext2文件系统主要有：boot sector, superblock, inode bitmap, block bitmap, inode table, data block 等六大部分。
data block 是用来放置文件内容数据地方，在 Ext2 文件系统中所支持的 block 大小有 1K, 2K 及 4K 三种而已
inode 记录文件的属性/权限等数据，其他重要项目为： 每个 inode 大小均为固定，有 128/256Bytes 两种基本容量。每个文件都仅会占用一个 inode 而已；因此文件系统能够创建的文件数量与 inode 的数量有关；
文件的 block 在记录文件的实际数据，目录的 block 则在记录该目录下面文件名与其 inode 号码的对照表；
日志式文件系统 （journal） 会多出一块记录区，随时记载文件系统的主要活动，可加快系统复原时间；
Linux 文件系统为增加性能，会让内存作为大量的磁盘高速缓存；
实体链接只是多了一个文件名对该 inode 号码的链接而已；
符号链接就类似Windows的捷径功能。
磁盘的使用必需要经过：分区、格式化与挂载，分别惯用的指令为：gdisk, mkfs, mount三个指令
分区时，应使用 parted 检查分区表格式，再判断使用 fdisk/gdisk 来分区，或直接使用 parted 分区
为了考虑性能，XFS 文件系统格式化时，可以考虑加上 agcount/su/sw/extsize 等参数较佳
如果磁盘已无未分区的容量，可以考虑使用大型文件取代磁盘设备的处理方式，通过 dd 与格式化功能。
开机自动挂载可参考/etc/fstab之设置，设置完毕务必使用 mount -a 测试语法正确否；
```

第八章重点回顾
```
压缩指令为通过一些运算方法去将原本的文件进行压缩，以减少文件所占用的磁盘容量。 压缩前与压缩后的文件所占用的磁盘容量比值， 就可以被称为是“压缩比”
压缩的好处是可以减少磁盘容量的浪费，在 WWW 网站也可以利用文件压缩的技术来进行数据的传送，好让网站带宽的可利用率上升喔
压缩文件的扩展名大多是：“.gz, .bz2, .xz, .tar, .tar.gz, .tar.bz2, *.tar.xz”
常见的压缩指令有 gzip, bzip2, xz。压缩率最佳的是 xz，若可以不计时间成本，建议使用 xz 进行压缩。
tar 可以用来进行文件打包，并可支持 gzip, bzip2, xz 的压缩。
压　缩：tar -Jcv -f filename.tar.xz 要被压缩的文件或目录名称
查　询：tar -Jtv -f filename.tar.xz
解压缩：tar -Jxv -f filename.tar.xz -C 欲解压缩的目录
xfsdump 指令可备份文件系统或单一目录
xfsdump 的备份若针对文件系统时，可进行 0-9 的 level 差异备份！其中 level 0 为完整备份；
xfsrestore 指令可还原被 xfsdump 创建的备份文件；
要创建光盘烧录数据时，可通过 mkisofs 指令来创建；
可通过 wodim 来写入 CD 或 DVD 烧录机
dd 可备份完整的 partition 或 disk ，因为 dd 可读取磁盘的 sector 表面数据
cpio 为相当优秀的备份指令，不过必须要搭配类似 find 指令来读入欲备份的文件名数据，方可进行备份动作。
```

第九章重点回顾
```
Linux 下面的配置文件多为文本文件，故使用 vim 即可进行设置编辑；
vim 可视为程序编辑器，可用以编辑 shell script, 配置文件等，避免打错字；
vi 为所有 unix like 的操作系统都会存在的编辑器，且执行速度快速；
vi 有三种模式，一般指令模式可变换到编辑与命令行界面，但编辑模式与命令行界面不能互换；
常用的按键有i, [Esc], :wq 等；
vi 的画面大略可分为两部份，（1）上半部的本文与（2）最后一行的状态+命令行界面；
数字是有意义的，用来说明重复进行几次动作的意思，如 5yy 为复制 5 列之意；
光标的移动中，大写的 G 经常使用，尤其是 1G, G 移动到文章的头/尾功能！
vi 的取代功能也很棒！ :n1,n2s/old/new/g 要特别注意学习起来；
小数点“ . ”为重复进行前一次动作，也是经常使用的按键功能！
进入编辑模式几乎只要记住： i, o, R 三个按钮即可！尤其是新增一列的 o 与取代的 R
vim 会主动的创建 swap 暂存盘，所以不要随意断线！
如果在文章内有对齐的区块，可以使用 [ctrl]-v 进行复制/贴上/删除的行为
使用 :sp 功能可以分区窗口
若使用 vim 来撰写网页，若需要 CSS 元素数据，可通过 [crtl]+x, [crtl]+o 这两个连续组合按键来取得关键字
vim 的环境设置可以写入在 ~/.vimrc 文件中；
可以使用 iconv 进行文件语系编码的转换
使用 dos2unix 及 unix2dos 可以变更文件每一列的行尾断行字符。
```

第十章重点回顾
```
由于核心在内存中是受保护的区块，因此我们必须要通过“ Shell ”将我们输入的指令与 Kernel 沟通，好让 Kernel 可以控制硬件来正确无误的工作
学习 shell 的原因主要有：命令行的 shell 在各大 distribution 都一样；远端管理时命令行速度较快； shell 是管理 Linux 系统非常重要的一环，因为 Linux 内很多控制都是以 shell 撰写的。
系统合法的 shell 均写在 /etc/shells 文件中；
使用者默认登陆取得的 shell 记录于 /etc/passwd 的最后一个字段；
bash 的功能主要有：命令编修能力；命令与文件补全功能；命令别名设置功能；工作控制、前景背景控制；程序化脚本；万用字符
type 可以用来找到执行指令为何种类型，亦可用于与 which 相同的功能；
变量就是以一组文字或符号等，来取代一些设置或者是一串保留的数据
变量主要有环境变量与自订变量，或称为全域变量与区域变量
使用 env 与 export 可观察环境变量，其中 export 可以将自订变量转成环境变量；
set 可以观察目前 bash 环境下的所有变量；
$? 亦为变量，是前一个指令执行完毕后的回传值。在 Linux 回传值为 0 代表执行成功；
locale 可用于观察语系数据；
可用 read 让使用者由键盘输入变量的值
ulimit 可用以限制使用者使用系统的资源情况
bash 的配置文件主要分为 login shell 与 non-login shell。login shell 主要读取 /etc/profile 与 ~/.bash_profile， non-login shell 则仅读取 ~/.bashrc
在使用 vim 时，若不小心按了 [crtl]+s 则画面会被冻结。你可以使用 [ctrl]+q 来解除冻结
万用字符主要有： *, ?, [] 等等
数据流重导向通过 >, 2>, < 之类的符号将输出的信息转到其他文件或设备去；
连续命令的下达可通过 ; && || 等符号来处理
管线命令的重点是：“管线命令仅会处理 standard output，对于 standard error output 会予以忽略” “管线命令必须要能够接受来自前一个指令的数据成为 standard input 继续处理才行。”
本章介绍的管线命令主要有：cut, grep, sort, wc, uniq, tee, tr, col, join, paste, expand, split, xargs 等。
```

第十一章重点回顾
```
正则表达式就是处理字串的方法，他是以行为单位来进行字串的处理行为；
正则表达式通过一些特殊符号的辅助，可以让使用者轻易的达到“搜寻/删除/取代”某特定字串的处理程序；
只要工具程序支持正则表达式，那么该工具程序就可以用来作为正则表达式的字串处理之用；
正则表达式与万用字符是完全不一样的东西！万用字符 （wildcard） 代表的是 bash 操作接口的一个功能， 但正则表达式则是一种字串处理的表示方式！
使用 grep 或其他工具进行正则表达式的字串比对时，因为编码的问题会有不同的状态，因此， 你最好将 LANG 等变量设置为 C 或者是 en 等英文语系！
grep 与 egrep 在正则表达式里面是很常见的两支程序，其中， egrep 支持更严谨的正则表达式的语法；
由于编码系统的不同，不同的语系 （LANG） 会造成正则表达式撷取数据的差异。因此可利用特殊符号如 [ ] 来替代编码范围较佳；
由于严谨度的不同，正则表达式之上还有更严谨的延伸正则表达式；
基础正则表达式的特殊字符有： *, ., [], [-], [^], ^, $ 等！
常见的支持正则表达式的工具软件有： grep , sed, vim 等等
printf 可以通过一些特殊符号来将数据进行格式化输出；
awk 可以使用“字段”为依据，进行数据的重新整理与输出；
文件的比对中，可利用 diff 及 cmp 进行比对，其中 diff 主要用在纯文本方面的新旧版本比对
patch 指令可以将旧版数据更新到新版 （主要亦由 diff 创建 patch 的补丁来源文件）
```

第十二章重点回顾
```
shell script 是利用 shell 的功能所写的一个“程序 （program）”，这个程序是使用纯文本文件，将一些 shell 的语法与指令（含外部指令）写在里面， 搭配正则表达式、管线命令与数据流重导向等功能，以达到我们所想要的处理目的
shell script 用在系统管理上面是很好的一项工具，但是用在处理大量数值运算上， 就不够好了，因为 Shell scripts 的速度较慢，且使用的 CPU 资源较多，造成主机资源的分配不良。
在 Shell script 的文件中，指令的执行是从上而下、从左而右的分析与执行；
shell script 的执行，至少需要有 r 的权限，若需要直接指令下达，则需要拥有 r 与 x 的权限；
良好的程序撰写习惯中，第一行要宣告 shell （#!/bin/bash） ，第二行以后则宣告程序用途、版本、作者等
对谈式脚本可用 read 指令达成；
要创建每次执行脚本都有不同结果的数据，可使用 date 指令利用日期达成；
script 的执行若以 source 来执行时，代表在父程序的 bash 内执行之意！
若需要进行判断式，可使用 test 或中括号 （ [] ） 来处理；
在 script 内，$0, $1, $2…, $@ 是有特殊意义的！
条件判断式可使用 if…then 来判断，若是固定变量内容的情况下，可使用 case $var in … esac 来处理
循环主要分为不定循环 （while, until） 以及固定循环 （for） ，配合 do, done 来达成所需任务！
我们可使用 sh -x script.sh 来进行程序的 debug
```

第十三章重点回顾
```
Linux 操作系统上面，关于帐号与群组，其实记录的是 UID/GID 的数字而已；
使用者的帐号/群组与 UID/GID 的对应，参考 /etc/passwd 及 /etc/group 两个文件
/etc/passwd 文件结构以冒号隔开，共分为七个字段，分别是“帐号名称、密码、UID、GID、全名、主文件夹、shell”
UID 只有 0 与非为 0 两种，非为 0 则为一般帐号。一般帐号又分为系统帐号 （1~999） 及可登陆者帐号 （大于 1000）
帐号的密码已经移动到 /etc/shadow 文件中，该文件权限为仅有 root 可以更动。该文件分为九个字段，内容为“ 帐号名称、加密密码、密码更动日期、密码最小可变动日期、密码最大需变动日期、密码过期前警告日数、密码失效天数、 帐号失效日、保留未使用”
使用者可以支持多个群组，其中在新建文件时会影响新文件群组者，为有效群组。而写入 /etc/passwd 的第四个字段者， 称为初始群组。
与使用者创建、更改参数、删除有关的指令为：useradd, usermod, userdel等，密码创建则为 passwd；
与群组创建、修改、删除有关的指令为：groupadd, groupmod, groupdel 等；
群组的观察与有效群组的切换分别为：groups 及 newgrp 指令；
useradd 指令作用参考的文件有： /etc/default/useradd, /etc/login.defs, /etc/skel/ 等等
观察使用者详细的密码参数，可以使用“ chage -l 帐号 ”来处理；
使用者自行修改参数的指令有： chsh, chfn 等，观察指令则有： id, finger 等
ACL 的功能需要文件系统有支持，CentOS 7 默认的 XFS 确实有支持 ACL 功能！
ACL 可进行单一个人或群组的权限管理，但 ACL 的启动需要有文件系统的支持；
ACL 的设置可使用 setfacl ，查阅则使用 getfacl ；
身份切换可使用 su ，亦可使用 sudo ，但使用 sudo 者，必须先以 visudo 设置可使用的指令；
PAM 模块可进行某些程序的验证程序！与 PAM 模块有关的配置文件位于 /etc/pam.d/ 及 /etc/security/
系统上面帐号登陆情况的查询，可使用 w, who, last, lastlog 等；
线上与使用者交谈可使用 write, wall，离线状态下可使用 mail 传送邮件！
```

第十四章重点回顾
```
Quota 可公平的分配系统上面的磁盘容量给使用者；分配的资源可以是磁盘容量（block）或可创建文件数量（inode）；
Quota 的限制可以有 soft/hard/grace time 等重要项目；
Quota 是针对整个 filesystem 进行限制，XFS 文件系统可以限制目录！
Quota 的使用必须要核心与文件系统均支持。文件系统的参数必须含有 usrquota, grpquota, prjquota
Quota 的 xfs_quota 实作的指令有 report, print, limit, timer… 等指令；
磁盘阵列 （RAID） 有硬件与软件之分，Linux 操作系统可支持软件磁盘阵列，通过 mdadm 套件来达成；
磁盘阵列创建的考虑依据为“容量”、“性能”、“数据可靠性”等；
磁盘阵列所创建的等级常见有的 raid0, raid1, raid1+0, raid5 及 raid6
硬件磁盘阵列的设备文件名与 SCSI 相同，至于 software RAID 则为 /dev/md[0-9]
软件磁盘阵列的状态可借由 /proc/mdstat 文件来了解；
LVM 强调的是“弹性的变化文件系统的容量”；
与 LVM 有关的元件有： PV/VG/PE/LV 等元件，可以被格式化者为 LV
新的 LVM 拥有 LVM thin volume 的功能，能够动态调整磁盘的使用率！
LVM 拥有快照功能，快照可以记录 LV 的数据内容，并与原有的 LV 共享未更动的数据，备份与还原就变的很简单；
XFS 通过 xfs_growfs 指令，可以弹性的调整文件系统的大小
```

第十五章重点回顾
```
系统可以通过 at 这个指令来调度单一工作的任务！“at TIME”为指令下达的方法，当 at 进入调度后， 系统执行该调度工作时，会到下达时的目录进行任务；
at 的执行必须要有 atd 服务的支持，且 /etc/at.deny 为控制是否能够执行的使用者帐号；
通过 atq, atrm 可以查询与删除 at 的工作调度；
batch 与 at 相同，不过 batch 可在 CPU 工作负载小于 0.8 时才进行后续的工作调度；
系统的循环例行性工作调度使用 crond 这个服务，同时利用 crontab -e 及 /etc/crontab 进行调度的安排；
crontab -e 设置项目分为六栏，“分、时、日、月、周、指令”为其设置依据；
/etc/crontab 设置分为七栏，“分、时、日、月、周、执行者、指令”为其设置依据；
anacron 配合 /etc/anacrontab 的设置，可以唤醒停机期间系统未进行的 crontab 任务！
```

第十六章重点回顾
```
程序 （program）：通常为 binary program ，放置在储存媒体中 （如硬盘、光盘、软盘、磁带等），为实体文件的型态存在；
程序 （process）：程序被触发后，执行者的权限与属性、程序的程序码与所需数据等都会被载入内存中， 操作系统并给予这个内存内的单元一个识别码 （PID），可以说，程序就是一个正在运行中的程序。
程序彼此之间是有相关性的，故有父程序与子程序之分。而 Linux 系统所有程序的父程序就是 init 这个 PID 为 1 号的程序。
在 Linux 的程序调用通常称为 fork-and-exec 的流程！程序都会借由父程序以复制 （fork） 的方式产生一个一模一样的子程序， 然后被复制出来的子程序再以 exec 的方式来执行实际要进行的程序，最终就成为一个子程序的存在。
常驻在内存当中的程序通常都是负责一些系统所提供的功能以服务使用者各项任务，因此这些常驻程序就会被我们称为：服务 （daemon）。
在工作管理 （job control） 中，可以出现提示字符让你操作的环境就称为前景 （foreground），至于其他工作就可以让你放入背景 （background） 去暂停或运行。
与 job control 有关的按键与关键字有： &, [ctrl]-z, jobs, fg, bg, kill %n 等；
程序管理的观察指令有： ps, top, pstree 等等；
程序之间是可以互相控制的，传递的讯息 （signal） 主要通过 kill 这个指令在处理；
程序是有优先顺序的，该项目为 Priority，但 PRI 是核心动态调整的，使用者只能使用 nice 值去微调 PRI
nice 的给予可以有： nice, renice, top 等指令；
vmstat 为相当好用的系统资源使用情况观察指令；
SELinux 当初的设计是为了避免使用者资源的误用，而 SELinux 使用的是 MAC 委任式存取设置；
SELinux 的运行中，重点在于主体程序 （Subject） 能否存取目标文件资源 （Object） ，这中间牵涉到政策 （Policy） 内的规则， 以及实际的安全性本文类别 （type）；
安全性本文的一般设置为：“Identify type”其中又以 type 最重要；
SELinux 的模式有： enforcing, permissive, disabled 三种，而启动的政策 （Policy） 主要是 targeted
SELinux 启动与关闭的配置文件在： /etc/selinux/config
SELinux 的启动与观察： getenforce, sestatus 等指令
重设 SELinux 的安全性本文可使用 restorecon 与 chcon
在 SELinux 有启动时，必备的服务至少要启动 auditd 这个！
若要管理默认的 SELinux 布林值，可使用 getsebool, setsebool 来管理！
```

第十七章重点回顾
```
早期的服务管理使用 systemV 的机制，通过 /etc/init.d/*, service, chkconfig, setup 等指令来管理服务的启动/关闭/默认启动；
从 CentOS 7.x 开始，采用 systemd 的机制，此机制最大功能为平行处理，并采单一指令管理 （systemctl），开机速度加快！
systemd 将各服务定义为 unit，而 unit 又分类为 service, socket, target, path, timer 等不同的类别，方便管理与维护
启动/关闭/重新启动的方式为： systemctl [start|stop|restart] unit.service
设置默认启动/默认不启动的方式为： systemctl [enable|disable] unit.service
查询系统所有启动的服务用 systemctl list-units —type=service 而查询所有的服务 （含不启动） 使用 systemctl list-unit-files —type=service
systemd 取消了以前的 runlevel 概念 （虽然还是有相容的 target），转而使用不同的 target 操作环境。常见操作环境为 multi-user.targer 与 graphical.target。 不重新开机而转不同的操作环境使用 systemctl isolate unit.target，而设置默认环境则使用 systemctl set-default unit.target
systemctl 系统默认的配置文件主要放在 /usr/lib/systemd/system，管理员若要修改或自行设计时，则建议放在 /etc/systemd/system/ 目录下。
管理员应使用 man systemd.unit, man systemd.service, man systemd.timer 查询 /etc/systemd/system/ 下面配置文件的语法， 并使用 systemctl daemon-reload 载入后，才能自行撰写服务与管理服务喔！
除了 atd 与 crond 之外，可以 通过 systemd.timer 亦即 timers.target 的功能，来使用 systemd 的时间管理功能。
一些不需要的服务可以关闭喔！
```

第二十一章重点回顾
```
源代码其实大多是纯文本文件，需要通过编译器的编译动作后，才能够制作出 Linux 系统能够认识的可执行的 binary file ；
开放源代码可以加速软件的更新速度，让软件性能更快、漏洞修补更实时；
在 Linux 系统当中，最标准的 C 语言编译器为 gcc ；
在编译的过程当中，可以借由其他软件提供的函数库来使用该软件的相关机制与功能；
为了简化编译过程当中的复杂的指令输入，可以借由 make 与 makefile 规则定义，来简化程序的更新、编译与链接等动作；
Tarball 为使用 tar 与 gzip/bzip2/xz 压缩功能所打包与压缩的，具有源代码的文件；
一般而言，要使用 Tarball 管理 Linux 系统上的软件，最好需要 gcc, make, autoconfig, kernel source, kernel header 等前驱软件才行，所以在安装 Linux 之初，最好就能够选择 Software development 以及 kernel development 之类的群组；
函数库有动态函数库与静态函数库，动态函数库在升级上具有较佳的优势。动态函数库的扩展名为 .so 而静态则是 .a ；
patch 的主要功能在更新源代码，所以更新源代码之后，还需要进行重新编译的动作才行；
可以利用 ldconfig 与 /etc/ld.so.conf /etc/ld.so.conf.d/*.conf 来制作动态函数库的链接与高速缓存！
通过 MD5/SHA1/SHA256 的编码可以判断下载的文件是否为原本厂商所释出的文件。
```

第二十二章重点回顾
```
为了避免使用者自行编译的困扰，开发商自行在特定的硬件与操作系统平台上面预先编译好软件， 并将软件以特殊格式封包成文件，提供终端用户直接安装到固定的操作系统上，并提供简单的查询/安装/移除等流程。 此称为软件管理员。常见的软件管理员有 RPM 与 DPKG 两大主流。
RPM 的全名是 RedHat Package Manager，原本是由 Red Hat 公司所发展的，流传甚广；
RPM 类型的软件中，所含有的软件是经过编译后的 binary program ，所以可以直接安装在使用者端的系统上， 不过，也由于如此，所以 RPM 对于安装者的环境要求相当严格；
RPM 除了将软件安装至使用者的系统上之外，还会将该软件的版本、名称、文件与目录配置、系统需求等等均记录于数据库 （/var/lib/rpm） 当中，方便未来的查询与升级、移除；
RPM 可针对不同的硬件等级来加以编译，制作出来的文件可于扩展名 （i386, i586, i686, x86_64, noarch） 来分辨；
RPM 最大的问题为软件之间的相依性问题；
SRPM 为 Source RPM ，内含的文件为 Source code 而非为 binary file ，所以安装 SRPM 时还需要经过 compile ，不过，SRPM 最大的优点就是可以让使用者自行修改设置参数 （makefile/configure 的参数） ，以符合使用者自己的 Linux 环境；
RPM 软件的属性相依问题，已经可以借由 yum 或者是 APT 等方式加以克服。 CentOS 使用的就是 yum 机制。
yum 服务器提供多个不同的软件库放置个别的软件，以提供用户端分别管理软件类别。
```