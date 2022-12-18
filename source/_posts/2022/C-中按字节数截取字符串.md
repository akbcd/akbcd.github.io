---
title: C#中按字节数截取字符串
date: 2022-12-18 17:25:42
tags: [笔记]
---
开发中可能会有按照字节数截取字符串的需求。
当字符串超过指定字节，保留指定字节数长度的字符串，超过部分舍掉。
C#中的`GetString(Byte[], Int32, Int32)`方法是可以直接截取指定字节，将字节转为字符串，但是此方法会有一个问题：
<!--more-->
如果一个全角字符占据两个字节，被裁剪字符串时，下剪的位置恰好将一个全角字符减成两半，那显示出来的字符串的最后面会出现一个问号（？）。
这里提供一个解决方案，仅供参考（以UTF8编码为例）
```C#
/*需要截取的字符串*/
string test = "需要截取的字符串"; //UTF8编码，一个汉字三个字节
/*需要截取的字节长度*/
int spitLength = 20;
/*截取后的字符串*/
string testResult = string.Empty;
/*截取的字符串字节长度大于需要截取的字节长度*/
if (Encoding.UTF8.GetBytes(test).Length > spitLength)
{
    /*字符串字节长度初期化（0）*/
    int len = 0;
    /*字符串StringBuilder*/
    StringBuilder strTmp= new StringBuilder();
    /*对要截取的字符串遍历，累加每个字符的字节长度*/
    foreach (char item in test)
    {
        /*累加每个字符的字节长度*/
        len = len + Encoding.UTF8.GetBytes(item.ToString()).Length;
        /*累加的长度大于截取的长度时，跳出循环*/
        if (len > spitLength)
        {
            break;
        }
        else
        {
            /*将当前的字符追加到字符串StringBuilder*/
            strTmp.Append(item);
        }
    }
    /*将字符串StringBuilder赋值给截取后的字符串*/
    testResult = strTmp.ToString();
}
Console.WriteLine(testResult);
/*输出：需要截取的字*/
```
原理就是反向将要截取的字符串逐个字符累加，算字节数，与要截取的字节数比较，如果累加完当前字符的字节数大于要截取的字节数时，舍弃当前字符，跳出累加，将累加的字符赋值给要截取的字符。

想着另起一篇文章，但是想想，还是写在一起吧，以下内容与标题无关。
C#中`StreamReader.ReadLine`中的ReadLine如何初期化？
StreamReader.ReadLine 方法：从当前流中读取一行字符并将数据作为字符串返回
我打开了一个文件流，但是我想对这个文件用`ReadLine`连续读取两遍，第一遍判断文件是否满足所要求的行数，第二遍则对每行数据进行处理。
```C#
/*读取的文件路径*/
string path = @"c:\temp\MyTest.txt";
/*读取文件*/
StreamReader sr = new StreamReader(path);
/*行数初期化*/
int rowCounts = 0;
/*最大行数*/
int maxCounts = 2;
/*遍历文件行数*/
while (sr.ReadLine() != null)
{
    /*行数加算*/
    rowCounts ++;
    if (rowCounts > maxCounts)
    {
        /*行数大于最大行数时结束循环*/
        break;
    }
}
/*第二次读取文件*/
/*清除内部缓冲区*/
sr.DiscardBufferedData(); //初期化ReadLine
/*文件重新读取*/
sr.BaseStream.Position = 0; //初期化ReadLine
string line = string.Empty;
while ((line = sr.ReadLine()) != null)
{
    /*从第一行开始按行处理文件*/
}
/*文件读取完成后请关闭StreamReader*/
sr.Close();
```
如果不加上中间的两步初期化ReadLine，在下一次循环时，则按照第一次循环结束的位置继续读取，导致第二次循环时缺少了第一次循环所用到的数据。
微软文档说清除内部缓冲区会影响性能，不到万不得已时不建议使用，所以还有一种方法：
第一次循环完成后，关闭StreamReader，第二次循环开始前，重新打开StreamReader，貌似有点费劲，看自己的需求吧。
如果不使用清除内部缓冲区，直接使用`Position = 0`则会造成数据重读，即在第一次读完的基础上继续读取，读取完成后，再次从第一行开始读取，读至最后。