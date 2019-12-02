---
title: js游戏之青蛙跳
date: 2019-12-01 21:54:59
tags: 游戏
---
分享一个网页游戏，纯js实现
青蛙跳
<!--more-->
这是青蛙跳游戏。如果你是手机访问此页面，可以尝试横屏游戏
玩法：左侧青蛙全部跳到右侧，右侧青蛙全部跳到左侧，闯关成功
如果失败了，可以点击重置按钮

<body>
<script type="text/javascript"> 
    function success(){
        var flag = true;
        for(var i = 1 ; i < 4 ; i++){
            if(document.getElementById(i).childNodes[0].getAttribute("value") == "left"){
                flag = false;
                break;
            }
        }
        if(document.getElementById("4").childNodes[0].getAttribute("value") != "null"){
            flag = false;	
        }   
        if(flag){
            alert("闯关成功");
        }
    }
    function jumpRight(div){
        var td = div.parentNode;
        if(td.id == "7"){
            return;
        }
        var nextTd = document.getElementById(td.id*1 + 1);
        if(nextTd.childNodes[0].getAttribute("value") == "null"){
            nextTd.appendChild(div);
            td.appendChild(nextTd.childNodes[0]);
            success();
            return;
        }
        if(td.id == "6"){
            return;
        }
        var next2Td = document.getElementById(td.id*1 + 2);
        if(next2Td.childNodes[0].getAttribute("value") == "null"){
            next2Td.appendChild(div);
            td.appendChild(next2Td.childNodes[0]);
            success();
            return;
        }
    }
    function jumpLeft(div){
        var td = div.parentNode;
        if(td.id == "1"){
            return;
        }
        var nextTd = document.getElementById(td.id*1 - 1);
        if(nextTd.childNodes[0].getAttribute("value") == "null"){
            nextTd.appendChild(div);
            td.appendChild(nextTd.childNodes[0]);
            success();
            return;
        }
        if(td.id == "2"){
            return;
        }
        var next2Td = document.getElementById(td.id*1 - 2);
        if(next2Td.childNodes[0].getAttribute("value") == "null"){
            next2Td.appendChild(div);
            td.appendChild(next2Td.childNodes[0]);
            success();
            return;
        }
    }
    function reset(){
        var tr=document.getElementById("tr");
        tr.innerHTML='<td style="border: 0;padding: 0;" id="1"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>'+
        '<td style="border: 0;padding: 0;" id="2"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>'+
        '<td style="border: 0;padding: 0;" id="3"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>'+
        '<td style="border: 0;padding: 0;" id="4"><div style="background:url(null.jpg);background-size:100% 100%; height:100px;width:100px;" value="null"></div></td>'+
        '<td style="border: 0;padding: 0;" id="5"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>'+
        '<td style="border: 0;padding: 0;" id="6"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>'+
        '<td style="border: 0;padding: 0;" id="7"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>';
    }
</script>
<a title="重置" style="cursor:pointer;" onclick="reset()">重置</a>
<table style="border-collapse:collapse;border:4px solid blue;;width:0;margin:0">
    <tr id="tr">
        <td style="border: 0;padding: 0;" id="1"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>
        <td style="border: 0;padding: 0;" id="2"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>
        <td style="border: 0;padding: 0;" id="3"><div style="background:url(left.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpRight(this);" value="left"></div></td>
        <td style="border: 0;padding: 0;" id="4"><div style="background:url(null.jpg);background-size:100% 100%; height:100px;width:100px;" value="null"></div></td>
        <td style="border: 0;padding: 0;" id="5"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>
        <td style="border: 0;padding: 0;" id="6"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>
        <td style="border: 0;padding: 0;" id="7"><div style="background:url(right.jpg);background-size:100% 100%; height:100px;width:100px;" onclick="jumpLeft(this);" value="right"></div></td>
    </tr>
</table>
<br>
</body>

下面是源代码，与上面的不太相同。源代码移动的是img标签，上面的用div标签代替，本主题中img标签有点击事件，游戏实现不了
运用了三个图片，需要的话自行点击下载（图片另存为）
<a href="left.jpg" target="_blank">left.jpg</a>
<a href="null.jpg" target="_blank">null.jpg</a>
<a href="right.jpg" target="_blank">right.jpg</a>

```
<html>
	<head>
		<title>青蛙跳</title>
		<script type="text/javascript"> 
			function success(){
				var flag = true;
				for(var i = 1 ; i < 4 ; i++){
					if(document.getElementById(i).childNodes[0].name == "left"){
						flag = false;
						break;
					}
				}
				if(document.getElementById("4").childNodes[0].name != "null"){
					flag = false;	
				}	
				if(flag){
					alert("闯关成功");
				}
			}			
			function jumpRight(img){
				var td = img.parentNode;
				if(td.id == "7"){
					return;
				}
				var nextTd = document.getElementById(td.id*1 + 1);
				if(nextTd.childNodes[0].name == "null"){
					nextTd.appendChild(img);
					td.appendChild(nextTd.childNodes[0]);
					success();
					return;
				}
				
				if(td.id == "6"){
					return;
				}
				var next2Td = document.getElementById(td.id*1 + 2);
				if(next2Td.childNodes[0].name == "null"){
					next2Td.appendChild(img);
					td.appendChild(next2Td.childNodes[0]);
					success();
					return;
				}			
			}
			function jumpLeft(img){
				var td = img.parentNode;
				if(td.id == "1"){
					return;
				}
				var nextTd = document.getElementById(td.id*1 - 1);
				if(nextTd.childNodes[0].name == "null"){
					nextTd.appendChild(img);
					td.appendChild(nextTd.childNodes[0]);
					success();
					return;
				}
				if(td.id == "2"){
					return;
				}
				var next2Td = document.getElementById(td.id*1 - 2);
				if(next2Td.childNodes[0].name == "null"){
					next2Td.appendChild(img);
					td.appendChild(next2Td.childNodes[0]);
					success();
					return;
				}
			}
		</script>		
	</head>
	<body>
		<br/><br/><br/><br/><br/><br/><br/>
		<table  cellspacing="0" cellpadding="0" bordercolor="blue">
			<tr id="tr">
				<td id="1" width="125"><img src="left.jpg" onclick="jumpRight(this);" name="left"/></td>
				<td id="2" width="125"><img src="left.jpg" onclick="jumpRight(this);" name="left"/></td>
				<td id="3" width="125"><img src="left.jpg" onclick="jumpRight(this);" name="left"/></td>
				<td id="4" width="125"><img src="null.jpg" name="null"/></td>
				<td id="5" width="125"><img src="right.jpg" onclick="jumpLeft(this);" name="right"/></td>
				<td id="6" width="125"><img src="right.jpg" onclick="jumpLeft(this);" name="right"/></td>
				<td id="7" width="125"><img src="right.jpg" onclick="jumpLeft(this);" name="right"/></td>
			</tr>
		</table>
	</body>
</html>
```