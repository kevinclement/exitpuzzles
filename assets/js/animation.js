$(function(){
    
    var ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1;
    
    // Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false && !isAndroid) 
    {          
        /*---------------------------------------*/
        /*  WHO WE ARE SECTION
        /*---------------------------------------*/
        $('#carousel-who-we-are').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });
        
        $('#who-we-are').find('.who-we-are-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp3').css('opacity', 1);}
        });
        
        /*---------------------------------------*/
        /*  Reviews SECTION
        /*---------------------------------------*/
        $('#reviews').find('.testimonial-item').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInY').css('opacity', 1);}
        })
    }
});