/* 
* @Author: Marte
* @Date:   2017-03-31 15:11:37
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-01 16:18:57
*/

$(document).ready(function(){
    //9张图片，定义一个数组用来承接
    var aData = [];
    var aPost = [];
    var oUl = document.getElementById("pt_list");
    for(var i=0;i<9;i++){
        aData.push(i+1);
    };
    //随机排列数组
    function aDataSort(a,b){
        if(Math.random()>0.5){
            return a-b;
        }else{
            return b-a;
        }
    };
    aData.sort(aDataSort);

    //随机插入9张图片
    for(var i=0;i<aData.length;i++){
        var oLi = document.createElement("li")
        var oImg = document.createElement("img");
        var picIndex = aData[i];
        if(picIndex.toString().length < 2){
            picIndex = "0" + picIndex;
        }
        oImg.src = 'static/images/pt/pt_01/'+ picIndex +'.jpg';
        oImg.setAttribute('data-index',picIndex);
        oLi.appendChild(oImg);
        oUl.appendChild(oLi);
    };
    var newLi = document.createElement("li");
    oUl.appendChild(newLi);

    //给每张图片加上定位属性
    var aLi = oUl.getElementsByTagName("li");
    oUlHeight = (aLi[4].offsetTop + aLi[7].offsetTop)+'px';
    oUl.style.height = oUlHeight;
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.top = aLi[i].offsetTop+"px";
        aLi[i].style.left = aLi[i].offsetLeft+"px";
        aLi[i].style.margin = 0;
        aPost.push(aLi[i].style.top,aLi[i].style.left);
    };
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position = "absolute";
    }

    //移动每一张图片
    var liWidth =$('li').width();
    var liHeight = $('li').height();
    //创建图片的索引值
    var index = 0;
    var ts = 0;
    //拼图部分js
    function movePic(){
        var touchStartX,touchStartX,touchMoveX,touchMoveY,touchEndX,touchEndY,touch_imgLeft,touch_imgTop;
        var moveLeft,moveRight,moveTop,moveBottom,ts_to,ts_left,ts_to_left,ts_top,ts_to_top,ts_prev_left,ts_prev_top;
        for(var i=0;i<aLi.length;i++){
            aLi[i].addEventListener('touchstart',function(event){
                ts = $(this);
                touch_imgLeft = ts.css('left');//当前图片的left值
                touch_imgTop = ts.css('top');//当前图片的top值
                index = ts.index();//当前点击图片的索引
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
            });
            aLi[i].addEventListener('touchmove',function(event){
                ts = $(this);
                touchMoveX = event.touches[0].clientX;
                touchMoveY = event.touches[0].clientY;
            });
            aLi[i].addEventListener('touchend',function(event){
                ts = $(this);
                touchEndX = touchMoveX;
                touchEndY = touchMoveY;
                moveLeft = touchStartX - touchEndX;//左边移动
                moveRight = touchEndX - touchStartX;//右边移动
                moveTop = touchStartY - touchEndY;//上移动
                moveBottom = touchEndY - touchStartY;//下移动
                //进行索引匹配
                if(index == 0){//第一张图只能向右边和下面滑动
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右移
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);

                    }
                    if(moveBottom >= liHeight/2 && moveRight <= 10){//下移
                        ts_to = $('li').eq(3);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(4));
                    }
                }else if(index == 1){//第二张图进行索引匹配
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右滑动
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);
                    }
                    if(moveBottom >= liHeight/2){//下滑动
                        ts_to = $('li').eq(4);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(5));
                    }
                }else if(index == 2){//第三张图进行索引匹配
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                    if(moveBottom >= liHeight/2){//下滑动
                        ts_to = $('li').eq(5);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(6));
                    }
                }else if(index == 3){//第四张图进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(0);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        // ts_to = $('li').eq(6);
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(4));
                    }
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右滑动
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);
                    }
                    if(moveBottom >= liHeight/2){//下滑动
                        ts_to = $('li').eq(6);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(7));
                    }
                }else if(index == 4){//第五张图进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(1);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(5));
                    }
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右滑动
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);
                    }
                    if(moveBottom >= liHeight/2){//下滑动
                        ts_to = $('li').eq(7);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(8));
                    }
                }else if(index == 5){//第六张图进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(2);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(6));
                    }
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                    if(moveBottom >= liHeight/2){//下滑动
                        ts_to = $('li').eq(8);
                        ts_top = ts.position().top;
                        ts_to_top = ts_to.position().top;
                        ts.css({top:ts_to_top + "px"});
                        ts_to.css({top:ts_top + "px"});
                        ts_to.insertBefore(ts);
                        ts.insertBefore($('li').eq(9));
                        // $('li').eq(8).insertBefore($('li').eq(7));
                    }
                }else if(index == 6){//第七张图片进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(3);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(7));
                    }
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右滑动
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);
                    }
                }else if(index == 7){//第八张图片进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(4);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(8));
                    }
                    if(moveRight >= liWidth/2 && moveBottom <= 10){//右滑动
                        ts_to = ts.next();
                        ts_left = ts.position().left;
                        ts_to_left = ts_to.position().left;
                        ts.css({left:ts_to_left+"px"});
                        ts_to.css({left:ts_left+"px"});
                        ts_to.insertBefore(ts);
                    }
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                }else if(index ==8){//第九章图片进行索引匹配
                    if(moveTop >= liHeight/2){//上移动
                        ts_prev = $('li').eq(5);
                        ts_top = ts.position().top;
                        ts_prev_top = ts_prev.position().top;
                        ts_prev.css({'top':ts_top + 'px'});
                        ts.css({'top':ts_prev_top + 'px'});
                        ts.insertBefore(ts_prev);
                        ts_prev.insertBefore($('li').eq(9));
                    }
                    if(moveLeft >= liWidth/2 && moveBottom <= 10){//图片左滑动
                        ts_prev = ts.prev();
                        ts_left = ts.position().left;
                        ts_prev_left = ts_prev.position().left;
                        ts.css({left:ts_prev_left + "px"});
                        ts_prev.css({left:ts_left + "px"});
                        ts.insertBefore(ts_prev);
                    }
                }
                //成功提示
                if($('li').eq(0).find('img').attr('data-index') == "01" && $('li').eq(1).find('img').attr('data-index') == "02" && $('li').eq(2).find('img').attr('data-index') == "03" && $('li').eq(3).find('img').attr('data-index') == "04" && $('li').eq(4).find('img').attr('data-index') == "05" && $('li').eq(5).find('img').attr('data-index') == "06" &&$('li').eq(6).find('img').attr('data-index') == "07" && $('li').eq(7).find('img').attr('data-index') == "08" && $('li').eq(8).find('img').attr('data-index') == "09"){
                    setTimeout(function(){
                        alert("拼图成功\n所用时间:"+minute+"分"+second+"秒");
                        clearInterval(myTimes);
                        window.close();
                        //微信端关闭当前页面并退出
                        WeixinJSBridge.call("closeWindow")
                        return false;
                    },1); 
                };
            });
        }
    };
    //定时器计时效果
    var num = 0;
    var minute,second;
    var myTimes = null;
    myTimes = setInterval(function(){
        num++;
        minute = Math.floor(num/60);
        second = Math.floor(num%60);
        if(second.toString().length < 2){
            second = "0" + second;
        }
        if(minute.toString().length < 2){
            minute = "0" + minute;
        }
        $('#pt_time').text(minute + ":" + second);
    },1000);
    //活动规则
    $('.pt_rule').click(function(){
        $('.index-msk').show();
    });
    $('.rule_close').click(function(){
        $('.index-msk').hide();
    });
    movePic();
});