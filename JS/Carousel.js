
$(document).ready(function(){
    $('.carousel').slick({
        arrows:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots:true,
        draggable: true,                    //滑鼠可以拖曳
        infinite: true,                     //無限輪播
        pauseOnHover: false,                 //滑鼠移過後暫停自動撥放
        pauseOnDotsHover: false,            //滑鼠移過圓點後暫停自動撥放
        rtl: false,                         //改變輪播方向
        vertical: false
    });
});

//控制翻頁的button 未重設
$(document).ready(function( ){ 
    $('.slick-arrow').css('display', 'none'); 
})
//(768以下專屬)控制翻頁的下方點點 未重設
$(document).ready(function( ){ 
    $('.slick-dots').css('display', 'none'); 
})
//兩個不需要的按鈕
$(document).ready(function( ){ 
    $('#slick-slide-control00').css('display', 'none'); 
})
$(document).ready(function( ){ 
    $('#slick-slide-control01').css('display', 'none'); 
})
