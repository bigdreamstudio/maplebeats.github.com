var chenghai = jQuery;
chenghai(document).ready(function(){
		var getwidth = getCookie("historywidth");
		var getheight = getCookie("historyheight");
		if(getwidth != null && getheight != null){
			var width = getwidth;
			var height = getheight;
		}else{
			var width = document.documentElement.clientWidth- 200 - imagewidth;
			var height = document.documentElement.clientHeight- 180 - imageheight;
		}

		var cwidth = document.documentElement.clientWidth-100;
		var cheight = document.documentElement.clientHeight-20;
		//var height = document.body.clientHeight-200;
		var moveX = 0;
		var moveY = 0;
		var moveTop = 0;
		var moveLeft = 0;
		var moveable = false;
		var docMouseMoveEvent = document.onmousemove;
		var docMouseUpEvent = document.onmouseup;

		chenghai("body").append('<div id="smlebaobao" onfocus="this.blur();" style="color:#626262;z-index:999;"><div id="lebaobaoface"></div><div id="dialog_chat"><div id="chat_top"></div><div id="dialog_chat_contents"><div id="dialog_chat_loading"></div><div id="tempsaying"></div><div id="showlebaobaomenu"><ul class="wcc_mlist" id="npmanage"> ������Ϸ</ul><ul class="wcc_mlist" id="lwlm">VIP��Ա</ul><ul class="wcc_mlist" id="mxqh">ֽ������</ul><ul class="wcc_mlist" id="zkty">��̳�</ul><ul class="wcc_mlist" id="lrxc">��������</ul><ul class="wcc_mlist" id="kgmb">��������</ul><div id="closelebaobao"><center>�ر�</center></div></div><div><ul id="lebaobaosaying"></ul></div><div id="getmenu"></div></div><div id="chat_bottom"></div></div></div>');
		chenghai("#smlebaobao").append('<div id="addinput"><div id="inp_l"><input id="talk" type="text" name="mastersay" value="" /> <input id="talkto" type="button" value=" " /></div><div id="inp_r"> X </div></div>');
		chenghai("body").append('<div id="calllebaobao">&nbsp;</div>');
		//�ж������Ƿ�������״̬
		var is_closelebaobao = getCookie("is_closelebaobao");
		if(is_closelebaobao == 'close'){
			closelebaobao_init();
		}
		//���ó�ʼ״̬
		lebaobaoSay('��ӭ����ֽ��</br> ����ʶ�����ֽ���Ǽ���������ͥ��~~</br>�ҽ������Ҳ���Խ���������</br>������ʲô�Ը�û��</br>�����κβ����Ҿͺ������죡');
		setFace(1);

		chenghai("#smlebaobao").css('left', width+'px');
		chenghai("#smlebaobao").css('top', height+'px');
		chenghai("#smlebaobao").css('width', imagewidth+'px');
		chenghai("#smlebaobao").css('height', imageheight+'px');
		chenghai("#calllebaobao").attr("style", "top:"+height+"px; left:"+cwidth+"px; text-align:center;");

		smcc = document.getElementById("smlebaobao");
		smcc.onmousedown = function(){
			var ent = getEvent();
			moveable = true;
			moveX = ent.clientX;
			moveY = ent.clientY;
			var obj = document.getElementById("smlebaobao");
			moveTop = parseInt(obj.style.top);
			moveLeft = parseInt(obj.style.left);
			if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
				window.getSelection().removeAllRanges();
			}			
			document.onmousemove = function(){
				if(moveable){
					var ent = getEvent();
					var x = moveLeft + ent.clientX - moveX;
					var y = moveTop + ent.clientY - moveY;
					var w = 200;
					var h = 200;	//w,hΪ������
					obj.style.left = x + "px";
					obj.style.top = y + "px";
				}
			};
			document.onmouseup = function(){
				if(moveable){
					var historywidth = obj.style.left;
					var historyheight = obj.style.top;
					historywidth = historywidth.replace('px', '');
					historyheight = historyheight.replace('px', '');
					setCookie("historywidth", historywidth, 60*60*24*30*1000);
					setCookie("historyheight", historyheight, 60*60*24*30*1000);
					document.onmousemove = docMouseMoveEvent;
					document.onmouseup = docMouseUpEvent;
					moveable = false; 
					moveX = 0;
					moveY = 0;
					moveTop = 0;
					moveLeft = 0;
				}
			}
		};
		chenghai("#getmenu").click(function(){
				lebaobaoMenu();
				setFace(1);
				});
		chenghai("#shownotice").click(function(){
				getdata("getnotice");
                                setFace(1);
		});
		chenghai("#closelebaobao").click(function(){
				setFace(3);
				closelebaobao();
				});
		chenghai("#calllebaobao").click(function(){
				setFace(2);
				calllebaobao();
				setCookie("is_closelebaobao", '', 60*60*24*30*1000);
				});
		chenghai("#shownotice").click(function(){
				setFace(1);
				closelebaobaoMenu();
				});
		chenghai("#lifetimelebaobao").click(function(){
				closelebaobaoMenu();
				closeNotice();
				setFace(2);
				getdata('showlifetime');
				});
		chenghai("#chatTolebaobao").click(function(){
				showInput();
				});
		chenghai("#inp_r").click(function(){
				closeInput();
				lebaobaoSay('����������(��_��)');
				setFace(3);
				});
		chenghai("#talkto").click(function(){
				getdata("talking");
				});
		chenghai("#npmanage").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("���ϲ������Ϸ�Ϳ�������Ӧ��Ŷ������");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://www.mzxzx.com/userapp.php';
					}, 2000);
				});
		chenghai("#lwlm").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("VIP��Ȩ��Ա������Ȩ��Ŷ������");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://www.mzxzx.com/vip.php';
					}, 2000);
				});
		chenghai("#mxqh").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("��̳����ʹ�����⼰���ܼ��ɣ��������������￴���ɡ�����");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://www.mzxzx.com/forum-238-1.html';
					}, 2000);
				});
		chenghai("#zkty").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("��ע�׬ȡVIP׬ȡ�����ޣ����кö�ö�ѫ�¡�����");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://mzxzx.com/forum-235-1.html';
					}, 2000);
				});
		chenghai("#lrxc").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("������ѽ���������񣬲����ѡ�񣡡�����");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://www.mzxzx.com/home.php/home.php?mod=task ';
					}, 2000);
				});
		chenghai("#kgmb").click(function(){
				closelebaobaoMenu();
				closeNotice();
				chenghai("#getmenu").css("display", "none");
				lebaobaoSay("û�����������������ɣ����ĵȴ���Ŷ������");
				setFace(2);
				setTimeout(function(){
					window.location.href = 'http://mzxzx.com/forum-9-1.html ';
					}, 2000);
				});
		chenghai("#foods").click(function(){
				closelebaobaoMenu();
				closeNotice();
				getdata("foods");
				});
/*		chenghai("#showlebaobaomenu").hover(function(){
				},function(){
				chenghai("#showlebaobaomenu").slideUp('slow').show();
				});*/
		document.onmousemove = function(){
			stoptime();
			tol = 0;
			setTime();
			//lebaobaoSay("����Ұ�������˳����ˣ� ������O��O");
		}
		talkSelf(talktime);
		document.getElementById("smlebaobao").onmouseover = function(){
			if(talkobj){
				clearTimeout(talkobj);
			}
			talktime = 0;
			talkSelf(talktime);
		}
		});

function getEvent() {
	return window.event || arguments.callee.caller.arguments[0];
}

var eattimes = 0;
function eatfood(obj){
	var gettimes = getCookie("eattimes");
	if(parseInt(gettimes) > parseInt(9)){
		lebaobaoSay("�����Ǹ���쵰����");
		setFace(3);
		closelebaobao_evil();
	}else if(parseInt(gettimes) > parseInt(7)){
		lebaobaoSay(".....................����Ҫը�ˣ���Ҳ��Ҫ�ٳ��ˡ���������TAT");
		setFace(3);
	}else if(parseInt(gettimes) == parseInt(5)){
		lebaobaoSay("���Ѿ��Ա��ˣ���Ҫ�ٳ���......");
		setFace(3);
	}else if(parseInt(gettimes) == parseInt(3)){
		lebaobaoSay("��л������ҳԱ��������� �t�����������q");
		setFace(2);
	}else{
		var id = obj.replace("f",'');
		getdata('eatsay', id);
	}
	eattimes++;
	setCookie("eattimes", eattimes, 60*10*1000);
}
function lebaobaoMenu(){
	//chenghai("#showlebaobaomenu").slideDown('fast').show();
	clearlebaobaoSay();
	closeInput();
	lebaobaoSay("����������ã�����������~��</br>��ʲô�����㶼����������ม�</br>�����������������ֽ����");
	chenghai("#showlebaobaomenu").css("display", "block");
	chenghai("#getmenu").css("display", "none");
	chenghai("#lebaobaosaying").css("display", "none");
}
function closelebaobaoMenu(){
	clearlebaobaoSay();
	chenghai("#showlebaobaomenu").css("display", "none");
	//chenghai("#lebaobaosaying").css("display", "block");
	showNotice();
	chenghai("#getmenu").css("display", "block");
}
function showNotice(){
	chenghai("#lebaobaosaying").css("display", "block");
}
function closelebaobao(){
	stopTalkSelf();
	lebaobaoSay("��ô�������ٶ��һ���أ�</br>�����������ˡ���!");
	chenghai("#showlebaobaomenu").css("display", "none");
	setTimeout(function(){
			chenghai("#smlebaobao").fadeOut(1200);
			chenghai("#calllebaobao").css("display", "block");}, 2000);
	//����ر�״̬������
	setCookie("is_closelebaobao", 'close', 60*60*24*30*1000);
}
function closelebaobao_evil(){
	stopTalkSelf();
	chenghai("#showlebaobaomenu").css("display", "none");
	setTimeout(function(){
			chenghai("#smlebaobao").fadeOut(1200);
			chenghai("#calllebaobao").css("display", "block");}, 2000);
}
function closelebaobao_init(){
	stopTalkSelf();
	chenghai("#showlebaobaomenu").css("display", "none");
	setTimeout(function(){
			chenghai("#smlebaobao").css("display", "none");
			chenghai("#calllebaobao").css("display", "block");}, 30);
}
function calllebaobao(){
	talkSelf(talktime);
	chenghai("#smlebaobao").fadeIn('normal');
	chenghai("#calllebaobao").css("display", "none");
	closelebaobaoMenu();
	closeNotice();
	lebaobaoSay("���˻�������</br>��ʲô��Ҫ���������ܷԸ���");
	setCookie("is_closelebaobao", '', 60*60*24*30*1000);
}

function lebaobaoSay(s){
	clearlebaobaoSay();
	chenghai("#tempsaying").append(s);
	chenghai("#tempsaying").css("display", "block");
}
function clearlebaobaoSay(){
	document.getElementById("tempsaying").innerHTML = '';
}
function closeNotice(){
	chenghai("#lebaobaosaying").css("display", "none");
}
function showInput(){
	closelebaobaoMenu();
	closeNotice();
	lebaobaoSay("............?");
	//setFace(1);
	chenghai("#addinput").css("display", "block");
}
function closeInput(){
	setFace(3);
	chenghai("#addinput").css("display", "none");
}
function clearInput(){
	document.getElementById("talk").value = '';
}
function createFace(a, b, c){
	chenghai("head").append('<div id="hiddenfaces"><img id="hf1" src="'+a+'" /><img id="hf2" src="'+b+'" /><img id="hf3" src="'+c+'" /></div>');
	setFace(1);
}
function setFace(num){
	obj = document.getElementById("hf"+num).src;
	chenghai("#lebaobaoface").attr("style", "background:url("+obj+") no-repeat scroll 50% 0% transparent; width:"+imagewidth+"px;height:"+imageheight+"px;");
}
function getdata(el, id){
	chenghai.ajax({
		type:	'GET',
		url:	path+'/?a=getdata',
		cache:	'false',
		dataType: 'html',
		contentType: 'application/json; charset=utf8',
		beforeSend: function(){
			//chenghai("#dialog_chat").fadeOut("normal");
			chenghai("#tempsaying").css('display', "none");
			chenghai("#dialog_chat_loading").fadeIn("normal");
		},
		success: function(data){
			chenghai("#dialog_chat_loading").css('display', "none");
			//chenghai("#dialog_chat").fadeIn("normal");
			chenghai("#tempsaying").css('display', "");
			var dat = eval("("+data+")");
			if(el == 'defaultccs'){
				lebaobaoSay('��ӭ����ֽ��Ŷ</br> ϣ��������������ͥ��~~');
			}else if(el == 'getnotice'){
				lebaobaoSay('��ӭ����ֽ��Ŷ </br>ϣ��������������ͥ��~~');
				setFace(1);
			}else if(el == 'showlifetime'){
				lebaobaoSay(dat.showlifetime);
			}else if(el == 'talking'){
				var talkcon = chenghai("#talk").val();
				var i = in_array(talkcon, dat.ques);
				var types = typeof(i);
				if(types != 'boolean'){
					lebaobaoSay(dat.ans[i]);
					setFace(2);
				}else{
					lebaobaoSay('.......................�ţ�');
					setFace(3);
				}
				clearInput();
			}else if(el == 'foods'){
				var str='';
				var arr = dat.foods;
				for(var i in arr){
					if(arr[i] != ''){
						str +='<ul id="f'+i+'" class="eatfood" onclick="eatfood(this.id)">'+arr[i]+'</ul>';
					}
				}
				lebaobaoSay(str);
			}else if(el = "eatsay"){
				var str = dat.eatsay[id];
				lebaobaoSay(str);
				setFace(2);
			}else if(el = "talkself"){
				var arr = dat.talkself;
				return arr;
			}
		},
		error: function(){
			lebaobaoSay('��������ˣ���ʲô������...</br>����ϵ����Ա');
		}
		});
}

function in_array(str, arr){
	for(var i in arr){
		if(arr[i] == str){
			return i;
		}
	}
	return false;
}

var timenum;
var tol=0;
//10���Ӻ�ҳ��û����Ӧ��ֹͣ�
var goal = 10*60;
function setTime(){
	tol++;
	//document.body.innerHTML(tol);
	timenum = window.setTimeout("setTime('"+tol+"')", 500);
	if(parseInt(tol) == parseInt(goal)){
		stopTalkSelf();
		closelebaobaoMenu();
		closeNotice();
		closeInput();
		lebaobaoSay("�����ܵ�����ȥ����....");
		setFace(3);
		stoptime();
	}
}
function stoptime(){
	if(timenum){
		clearTimeout(timenum);
	}
}
var talktime = 0;
//������������Ƶ�ʣ���λ���룩
var talkself = 30;
var talkobj;
var tsi = 0;
var talkself_arr = [
	["���ֽ�����ȥ���ˣ����ǲ�����������", "2"],
        ["���ֽ�Ҫ��������ú���Ŷ����Ҳ���Ҹ��˱��һ������", "2"],
        ["��Ҫ��׵ģ����������������㴫��Ӵ����ô��ϵ��ѽ���ֻ���119 ��ϵ��������", "2"],
        ["Ӣ����������������Գ��𣿺Ǻ�~~", "2"],
        ["::>_<:: ���ý�����������˼�˯��~~���˼Ҷ�û˯��...��_�к���Ŷ~~", "3"],
        ["ʲô����������İɣ��Ҳ����ţ��Ҽ����������Ŷ������ŮŮ����", "3"],
	["L��wsbn����ڿ���ô�ܵ��˼���������~Ŷ��Ŷ��0 0~", "3"],
	["�ڴ�DEѫ�����Ŀ���Ŷ����֪���᲻�����˼������������棬�ٺ�~!", "2"],
	["�����б���С��Ҳ", "3"],
	["ħ����!!��������Ŷ~~����ȥ~���ֲ����˼�ȥ,����ȥ������ȥ,����ȥ", "3"],
	["ֽ��è3������,���ȵ�С��Ŷ~~�ұ�����~�ศI(^��^)�J", "2"],
	["û�������ȵĵط��ǲ������ĵط���û����ĵط��Ǽ�į�ģ�Ŷ~�˼���̨����", "1"],
	["ŶŶŶ....~ÿ�춼Ҫ������������Ӵ", "2"],
	["�ܲ�������ֵ�����Ŷ����������Ŷ~~�ѵ��Ǹ�С��̫�𣿲�������Ŷ~~�ۿ���", "1"],
	["�������ӽ����˼�Ū���ˡ���", "3"],
	["���������ҵ�ȹ����TAT", "3"],
	["�����ţ�ʥ����Ҫ��ô���أ����Ǻ��ڴ�Ŷ", "2"],
	["��E����������������ε�ʱ���ܶ����˼ҡ��������ˡ�", "2"],
	["Ǿޱ�ݵ�annayou��Ҫ�˼Ҵ���~ฺǺ�~", "1"],
	["~^o^~ ɳ����ʵ��NTR�أ����������~~�ÿ��£���������~", "3"],
	["��E��������Ƥ����Ƥ��~Ƥ��~~", "4"],
	["�Ϲ�����͵͵����Ů��װ�������ڼҴ����վ��� -ӴӴ", "2"],
	["С����˵Ҫ����ȥ��KŶ���ÿ����....", "2"],
	["yetimao��Ȼ˵Ҫ���˸������~~��˵���ȸ������~", "3"],
	["��������~�����������������������,Yui.��www���ڴ�����~��ù�ĺ���Ŷ", "2"],
	["��������ֵ�ʱ�򿴼����˺�����Ŷ~�Ҹ��������ߣ���Ȼ�ߵ�ֽ����������Ŷ~�������Ŷ", "2"],
	["��껬�������ҵ�ͬѧ��������~~!�������ң���Ҳ���������Ŷ~��������", "3"],
	["����ϲ��ֽ��~����������", "1"],
	["Ǿޱ��������Ӵ����~~������Ĳ�����˼��Ŷ~~", "2"],
	["��������������~���ý��������~~���ȵ�����һ�㶼����~ϣ������������Ŷ�����ͣ�", "3"],
	["���ᣡ���ᣡ���ᣡ�����������˼��������ˣ���", "3"],
	["�Ǹ�..����..�����ȸ��㴷��...����.......", "1"],
	["L��wsbn����е㲻����Ŷ�����ǽ��˼���TA���˼Ҷ���֪��TA������Ů��ô����˼��~", "3"],
	["ֽ����ԱȺ�������˼������ȵ��𣿣�", "2"],
	["ʲô�ǿ쵶ն����~�뿴��E����E��˭��ȥ���ˮ����Σ��ֵ��֪����Ӵ~�ۿ���", "2"],
	["ֽ����ԱȺ�����ַ�VIP�����˼�˯����û����ʱ��ȥ���������أ�", "3"],
	["������,����ʳѩ��,�����!�����!", "2"],
	["���˼�������~Ҫ����", "2"],
	["�����Һ��񿴼�������������֮ǰ������Ŷ��", "3"]
	["��Ϊæ�ſ���������ҵ��ȫ�����˰�³��", "1"],
	["�ٵ�һ�¾Ϳ��Գ���Ŷ����Ϊͼ�������е㲻����ġ���~��~��~", "1"],
	["��~~����ϲ��ֽ����ԱȺ��Yui.��www�������ε�Yui.��www��Ӵ����Ⱥ����ע��ٺ١������ֲֳ��У�", "3"],
	["û�����ϵĶ����ǲ������Σ����˼�Ҫ��������~~", "2"],
	["�������ڳԵ���Ŷ�������ҵĻ����Ҿ�ȥ��ˮ������������������~", "3"],
	["�ף��ҽ������ֽ��VIP����ȥ�ˣ��ǲ�����͵�ˣ����һ��ң���", "3"],
	["��Ҫ���׵İ��ҹر�Ŷ���һ����һ���ӵģ���������С��Ŷ���ٺ�", "3"],
        ["��˵�ҿ���������һ�㶼�����������˼�ֻ�ǿɰ��ˣ�������", "2"],
        ["�����԰�����ק���κεط�Ŷ���Һ�������~~", "4"],
        [">.<һ��һ����Ҫ��ˮӴ���ǿ���Ҫ���ͷ���Ŷ~", "3"],
        ];
function talkSelf(talktime){
	talktime++;
	var tslen = talkself_arr.length;
/*	if(parseInt(tsi) >= parseInt(tslen)){
		tsi = 0;
	}*/
	var yushu = talktime%talkself;
	if(parseInt(yushu) == parseInt(9)){
		closelebaobaoMenu();
		closeNotice();
		closeInput();
		tsi = Math.floor(Math.random() * talkself_arr.length + 1)-1;
		lebaobaoSay(talkself_arr[tsi][0]);
		setFace(talkself_arr[tsi][1]);
	}
	talkobj = window.setTimeout("talkSelf("+talktime+")", 1000);
}
function stopTalkSelf(){
	if(talkobj){
		clearTimeout(talkobj);
	}
}
function arrayShuffle(arr){
	var result = [],
	len = arr.length;
	while(len--){
		result[result.length] = arr.splice(Math.floor(Math.random()*(len+1)),1);
	}
	return result;
}
function setCookie(name, val, ex){
	var times = new Date();
	times.setTime(times.getTime() + ex);
	if(ex == 0){
		document.cookie = name+"="+val+"; path=/;domain=.mzxzx.com;";
	}else{
		document.cookie = name+"="+val+"; expires="+times.toGMTString()+";path=/;domain=.mzxzx.com;";
	}
}
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
	if(arr != null) return unescape(arr[2]); return null;
}
