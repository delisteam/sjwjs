'use strict';
//$(function(){
//   var windowWidth=$(window).width(); //获取屏幕宽度；
//    //判断屏幕属于大还是小
//    var isSmallScreen=windowWidth<768; //返回的是一个布尔值,TRUE OR FALSE
//    console.log("123")
//    $('#main_id >.carousel-inner >.item').each(function(i,item){
//        var $item=$(item);//因为拿到的是DOM对象，需要转换成JQ对象
//        var imgSrc=$item.data(isSmallScreen?'image-xs':'image-lg');
//        $item.css('backgroundImage','url("'+imgSrc+'")')
//    })
//    //根据大小为界面上的每一张轮播图设置背景
//});

$(function(){
    function resize(){
        var windowWidth=$(window).width(); //获取屏幕宽度；
        //判断屏幕属于大还是小
        var isSmallScreen=windowWidth<768; //返回的是一个布尔值,TRUE OR FALSE
        $('#main_id >.carousel-inner >.item').each(function(i,item){
            var $item=$(item);//因为拿到的是DOM对象，需要转换成JQ对象
            var imgSrc=$item.data(isSmallScreen?'image-xs':'image-lg');
            $item.css('backgroundImage','url("'+imgSrc+'")')
            //因为我们需要小图时尺寸等比例变化，所以小图时使用IMG方式
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="">')
            }else{
                $item.empty();
            }
        })
        //根据大小为界面上的每一张轮播图设置背景；
    }
    $(window).on('resize',resize).trigger('resize');
    //初始化TOOLTIPS插件
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的标签宽度
    var $ulContainer =$(".nav-tabs");
    //获取所有子元素的宽度的合
    var width=30;
    //遍历子元素
    $ulContainer.children().each(function(index,element){
        width+=element.clientWidth; //此时WIDTH等于所有LI的宽度的总和
        //console.log($(element).width());
        //判断当前UL是否超出，超过则显示横向滚动条;
        if(width>$(window).width()){
        $ulContainer.css('width',width);
        $ulContainer.parent().css('overflow-x','scroll');
        }
        //a 点击注册时间
        var $newTitle=$('.news-title');
        var $spans=$("#news .container .tab-content ul li span")
        $('#news .nav-pills a').on('click',function(){
            //获取当前点击元素
            var $this=$(this);
            //获取对应的title值
            var title=$this.data('title');
            //将title设置到相应的位置
            $newTitle.text(title);
            $spans.text("["+title+"]");
        });
    });
    //手指滑动轮播图：：
  //手指触摸开始时记录一下手指所在的坐标X，结束触摸一瞬间记录坐标X，比大小
    //0.获取界面上的轮播图容器
    var $carousel=$('.carousel');
    var startX,endX;
    var offset=50;
    //注册滑动事件
    $carousel.on('touchstart',function(e){
        startX=e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchmove',function(e){
        endX=e.originalEvent.touches[0].clientX;
    });
    $carousel.on('touchend',function(e){
        var distance=Math.abs(startX-endX);
        if(distance>offset){
            //控制精度,获取每次运动的距离，当距离大于一定的值的时候获取方向
            //有方向变化
            //console.log(startX>endX?'左':'右')
            $(this).carousel(startX>endX?'next':'prev');
        }
    });
    //1.获取手指在轮播图元素上一个滑动方向（左右）;
    //2.根据获得到的方向选择上一张或者下一张
});
