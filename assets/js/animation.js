$(function(){
    
    var ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1;
    
    // Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false && !isAndroid) 
    {          
        /*---------------------------------------*/
        /*  WHO WE ARE SECTION
        /*---------------------------------------*/
        $('#rooms').find('.rooms-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInRight delayp3').css('opacity', 1);}
        });
        
        /*---------------------------------------*/
        /*  Reviews SECTION
        /*---------------------------------------*/
        $('#reviews').find('.testimonial-item').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInY').css('opacity', 1);}
        })
    }
});