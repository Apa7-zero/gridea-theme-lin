/**
 * Created by 95751 on 2018/8/3.
 */
//获取高度赋值
var height=document.documentElement.clientHeight;
$('#centerbg').css('height',height+'px');

//判断是否为ios系统
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isiOS==true){
    $('#centerbg').css('background-attachment','scroll');
}
