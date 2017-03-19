$(function(){
    
    var ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1;
                
    // Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false && !isAndroid) 
    {    
        /*---------------------------------------*/
        /*  CONTENT BOXES
        /*---------------------------------------*/
        $('.content-boxes').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInY delayp1').css('opacity', 1);}
        });                                
    }
});