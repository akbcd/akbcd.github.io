---
title: 用js实现购物车功能
date: 2021-02-12 16:28:59
tags: [html,js]
---
用js简单实现了一下前端的购物车功能，在这里记录一下
<!--more-->
基本要求：
添加商品部分：
1.商品名称2-8个字
2.库存数量不能为负数
3.商品单价不能为负数
4.表单数据要做空值验证
商品列表部分：
1.商品列表默认为空，在表单中添加商品信息，将商品加入商品列表
2.购物车列表默认为空，点击加入购物车，将商品信息加入
3.商品及购物车列表实现隔行变色功能
4.点击添加购物车及删除操作时要有确认提示
我的购物车部分：
1.点击购物车删除按钮删除整行数据
2.点击全选，全部选中，并统计合计金额
3.点击反选，实现反选功能，并统计金额
4.点击数量增减按钮，数量随之变化，小计及总计随之变化

以下是效果图
![购物车](https://i.loli.net/2021/02/12/komAxKjf4hq8LdZ.png)

源码：
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>购物车</title>
        <link rel="stylesheet" type="text/css" href="css/index.css"/>
        <style>
            .left,.right{
                width: 45%;
            }
            .left,.right,.shopCarList{
                border: 1px solid black;
                margin: 10px;
            }
            .float-left{
                float: left;
            }
            .clear-both{
                clear: both;
            }
            .bottom{
                padding-top: 10px;
            }
            .shopCarList{
                width: 65%;
                margin: 0 auto;
            }
            .text-align,th,td{
                text-align: center;
            }
            .text-right{
                text-align: right;
                padding: 10px;
            }
            .left div{
                margin: 20px;
            }
            .left .wrong,.left .null{
                color: red;
                display: none;
            }
            table{
                border-spacing: 0;
                border-collapse: collapse;
                margin: 10px;
            }
            .right table{
                width: 90%;
            }
            .bottom table{
                width: 96%;
            }
            th,td{
                border: #ccc 1px solid;
            }
            tbody tr:nth-child(even){
                background: #cccccc70;
            }
            button{
                cursor: pointer;
                border-radius: 3px;
                background: #2196f3;
                border-width: 0;
                height: 30px;
                width: 80px;
                line-height: 30px;
                color: white;
            }
            .button,.backbutton{
                background: white;
                border: 1px solid black;
                color: black;
            }
            .button{
                width: 20px;
                height: 20px;
                line-height: 20px;
            }
            input{
                height: 20px;
            }
        </style>
    </head>
    <body>
        <div class="left float-left text-align">
            <form action="" method="post">
                <div>
                    <span>商品编号：</span><input id="goodinfo" type="text" oninput="value=value.replace(/[^\d]/g,'')" onblur='isNull(this)' placeholder="请输入商品编号"/>
                    <br/>
                    <span class="wrong">商品编号不能为空</span>
                </div>
                <div>
                    <span>商品名称：</span><input id="goodname" type="text" maxlength="8" onblur='isNull(this)' placeholder="请输入商品名称"/>
                    <br/>
                    <span class="wrong">商品名称不能为空</span>
                </div>
                <div>
                    <span>库存数量：</span><input id="goodnum" type="text" oninput="value=value.replace(/[^\d]/g,'')" onblur='isNull(this)' placeholder="请输入库存数量"/>
                    <br/>
                    <span class="wrong">商品数量不能为空</span>
                </div>
                <div>
                    <span>商品单价：</span><input id="goodprice" type="text" oninput="value=value.replace(/[^\d]/g,'')" onblur='isNull(this)' placeholder="请输入商品单价"/>
                    <br/>
                    <span class="wrong">商品单价不能为空</span>
                </div>
                <div><button id="save" type="button">添加商品</button></div>
            </form>
        </div>
        <div class="right float-left">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>商品编号</th>
                        <th>商品名称</th>
                        <th>商品单价</th>
                        <th>库存数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="goodList"></tbody>
            </table>
        </div>
        <div class="bottom clear-both">
            <p class="text-align">我的购物车</p>
            <div class="shopCarList">
                <table>
                    <thead>
                        <tr>
                            <th><button onclick="allChecked()">全选</button></th>
                            <th>序号</th>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            <th>价格</th>
                            <th>数量</th>
                            <th>小计</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="shopList"></tbody>
                    <tfoot>
                        <tr>
                            <td><button onclick="backChecked()" class="backbutton">反选</button></td>
                            <td colspan="7">总计: ￥<span id="sumPrice"></span></td>
                        </tr>
                    </tfoot>
                </table>
                <div class="text-right">
                    <button type="button" onclick="total()">去结算</button>
                </div>
            </div>
        </div>
        <script>
            //判断是否为空
            function isNull(para) {
                var value=para.value;
                if (value=="") {
                    var name=para.parentNode.children[0].innerText.substring(0,4);
                    para.parentNode.children[3].innerHTML=name+'不能为空';
                    para.parentNode.children[3].style.display="block";
                }else{
                    para.parentNode.children[3].style.display="none";
                }
            }
            //添加商品
            document.getElementById("save").onclick=function(){
                //商品编号
                var goodinfo=document.getElementById("goodinfo").value;
                //商品名称
                var goodname=document.getElementById("goodname").value;
                //商品数量
                var goodnum=document.getElementById("goodnum").value;
                //商品价格
                var goodprice=document.getElementById("goodprice").value;
                if(goodinfo=="") {
                    document.getElementById("goodinfo").parentNode.children[3].style.display="block";
                    return false;
                }
                if(goodname==''){
                    document.getElementById("goodname").parentNode.children[3].style.display="block";
                    return false;
                }else if(goodname.length<2){
                    document.getElementById("goodname").parentNode.children[3].innerText="商品名称2-8个字";
                    document.getElementById("goodname").parentNode.children[3].style.display="block";
                    return false;
                }
                if(goodnum=="") {
                    document.getElementById("goodnum").parentNode.children[3].style.display="block";
                    return false;
                }
                if(goodprice=="") {
                    document.getElementById("goodprice").parentNode.children[3].style.display="block";
                    return false;
                }else if(goodprice==0){
                    document.getElementById("goodprice").parentNode.children[3].innerText="请输入正确的价格";
                    document.getElementById("goodprice").parentNode.children[3].style.display="block";
                    return false;
                }
                //获取已添加商品的编号
                var $ginfo=document.querySelectorAll('#goodList .ginfo');
                //遍历
                function getSameGinfo(value){
                    var num=0;
                    for(var i=0;i<$ginfo.length;i++){
                        if($ginfo[i].innerText==value){
                            num=i+1;
                            break;
                        }
                    } 
                    return num;
                }
                //判断添加的商品是否存在
                if(getSameGinfo(goodinfo)){
                    //获取存在的商品所在位置
                    var num=getSameGinfo(goodinfo)-1;
                    var gocar_goodnum=document.getElementById('gc_goodnum');
                    if(gocar_goodnum){
                        gocar_goodnum.innerText=goodnum;
                    }
                    //修改名称
                    document.querySelectorAll('#goodList .gname')[num].innerHTML="<span class='gname'>"+goodname+"</span>";
                    //价格
                    document.querySelectorAll('#goodList .gprice')[num].innerHTML="<span class='gprice'>"+'￥ '+goodprice+"</span>";
                    //库存
                    document.querySelectorAll('#goodList .gnum')[num].innerHTML="<span class='gnum'>"+goodnum+"</span>";
                }else{
                    //符合以上要求,执行插入
                    var tr=document.createElement("tr");
                    //tr行共6列
                    var td1=document.createElement("td");
                    var td2=document.createElement("td");
                    var td3=document.createElement("td");
                    var td4=document.createElement("td");
                    var td5=document.createElement("td");
                    var td6=document.createElement("td");
                    td2.innerHTML="<span class='ginfo'>"+goodinfo+"</span>";
                    td3.innerHTML="<span class='gname'>"+goodname+"</span>";
                    td4.innerHTML="<span class='gprice'>"+'￥ '+goodprice+"</span>";
                    td5.innerHTML="<span class='gnum'>"+goodnum+"</span>";
                    td6.innerHTML="<button type='button' onclick='addToCar(this)'>加入购物车</button>";
                    //获取当前行数
                    var trcount=document.getElementById("goodList").rows.length;
                    //计算行号
                    if(trcount==0){
                        td1.innerText=1;
                    }else{
                        td1.innerText=trcount+1;
                    }
                    //将列加入到行中
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    //将行加入到列表中
                    document.getElementById("goodList").appendChild(tr);
                }
            }
            //添加购物车
            function addToCar(info) {
                var flag=confirm('确认加入购物车?');
                if(flag){
                    //编号
                    var goodinfo=info.parentNode.parentNode.children[1].innerText;
                    //名称
                    var goodname=info.parentNode.parentNode.children[2].innerText;
                    //价格
                    var goodprice=info.parentNode.parentNode.children[3].innerText.substr(2);
                    //库存
                    var goodnum=info.parentNode.parentNode.children[4].innerText;
                    //添加购物车函数
                    function add(){
                        //将信息加入到购物车
                        var tr=document.createElement("tr");
                        //创建td
                        var td1=document.createElement("td");
                        var td2=document.createElement("td");
                        var td3=document.createElement("td");
                        var td4=document.createElement("td");
                        var td5=document.createElement("td");
                        var td6=document.createElement("td");
                        var td7=document.createElement("td");
                        var td8=document.createElement("td");
                        //td赋值
                        td1.innerHTML="<input type='checkbox' class='checkbox' onclick='checkOnclick(this)'/>";
                        td3.innerText=goodinfo;
                        td4.innerText=goodname;
                        td5.innerText="￥ " + goodprice;
                        td6.innerHTML="<button type='button' class='button' onclick='cutCount(this)'>-</button><span>1</span><button type='button' class='button' onclick='addCount(this)'>+</button>"+"<span id='gc_goodnum' style='display:none'>"+goodnum+"</span>";
                        td7.innerText="￥ " + goodprice;
                        td8.innerHTML="<button type='button' onclick='del(this)'>删除</button>";
                        //获取当前行数
                        var trcount=document.getElementById("shopList").rows.length;
                        //计算序号
                        if(trcount==0){
                            td2.innerText=1;
                        }else{
                            td2.innerText=trcount+1;
                        }
                        //将创建的列加入到行中
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        //将创建的行加入到列表中
                        document.getElementById("shopList").appendChild(tr);
                    }
                    //编号是否存在
                    var trrows=document.getElementById("shopList").rows;
                    if(trrows.length!=0) {
                        var num=0;
                        for (var i=0;i<trrows.length;i++) {
                            var value=trrows[i].children[2].innerText;
                            if (goodinfo==value) {
                                num=1;
                                //获取当前商品数量
                                var count=parseInt(trrows[i].children[5].children[1].innerText);
                                //判断当前商品数量与库存大小
                                if(parseInt(goodnum)>count){
                                    //修改数量,在原有基础加1
                                    trrows[i].children[5].children[1].innerText=++count;
                                    //商品单价
                                    var goodprice=trrows[i].children[4].innerText.substr(2);
                                    //计算小计
                                    var smallPrice=goodprice * count;
                                    //赋值到指定节点
                                    trrows[i].children[6].innerText="￥ " + smallPrice;
                                }
                                break;
                            }
                        }
                        //编号不存在
                        if (num==0)add();
                    }else{
                        add();
                    }
                }
            }
            //cutCount 数量减少
            function cutCount(num) {
                //获取当前数量
                var count=parseInt(num.nextSibling.innerText);
                if (count>1) {
                    num.nextSibling.innerText=--count;
                    //重新获取商品数量
                    count=num.nextSibling.innerText;
                    //获取价格
                    var goodprice=num.parentNode.previousSibling.innerText.substr(2);
                    //计算小计
                    var smallTotla=count*goodprice;
                    num.parentNode.nextSibling.innerText="￥ "+smallTotla;
                    //计算总计
                    getTotal();
                }
            }
            //addCount 数量添加
            function addCount(num) {
                var count=parseInt(num.previousSibling.innerText);
                if(count<parseInt(num.nextSibling.innerText)){
                    num.previousSibling.innerText=++count;
                    count=num.previousSibling.innerText;
                    var goodprice=num.parentNode.previousSibling.innerText.substr(2);
                    var smallTotla=count*goodprice;
                    num.parentNode.nextSibling.innerText="￥ "+smallTotla;
                    getTotal();
                }
            }
            //checkbox 事件
            function checkOnclick(para){
                getTotal();
            }
            //总计计算
            function getTotal() {
                totalAmount=0;
                var checkbox=document.querySelectorAll("input[type='checkbox'][class='checkbox']:checked");
                checkbox.forEach(function(ele){
                    //找到小计节点,累加
                    totalAmount+=parseInt((ele.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText.substr(2)));
                })
                //赋值结果给总计
                document.getElementById('sumPrice').innerText=totalAmount;
            }
            //allChecked 全选
            function allChecked(){
                //获取全部行节点
                var trrows=document.getElementById("shopList").rows;
                for (var i=0;i<trrows.length;i++) {
                    trrows[i].children[0].children[0].checked=true;
                }
                //计算总计
                getTotal();
            }
            //backChecked 反选
            function backChecked(){
                var trrows=document.getElementById("shopList").rows;    
                for (var i=0;i<trrows.length;i++) {
                    if(trrows[i].children[0].children[0].checked==true){
                        trrows[i].children[0].children[0].checked=false;            
                    }else{
                        trrows[i].children[0].children[0].checked=true;    
                    }
                }
                getTotal();
            }
            //del 删除
            function del(para){
                var flag=confirm('确认删除此商品?');
                if(flag){
                    para.parentNode.parentNode.remove();
                    //商品重新排序
                    var checkbox=document.querySelectorAll("input[type='checkbox'][class='checkbox']");
                    for(var i=0;i<checkbox.length;i++){
                        checkbox[i].parentNode.nextSibling.innerText=i+1;
                    }
                    getTotal();
                } 
            }
            //total 结算
            function total(){
                //alter显示总计
                var $sumPrice=document.getElementById('sumPrice').innerText;
                if($sumPrice!=''&&$sumPrice!=0){
                    alert('总计金额为: '+$sumPrice)
                }
            }
        </script>
    </body>
</html>
```
大部分功能已经实现，可以根据自己需要进行添加修改。本篇文章就记录到这里啦。