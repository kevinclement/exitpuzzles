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
        /*  QUOTE SECTION
        /*---------------------------------------*/
        $('#quote .quote-text').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated fadeInUp delayp1').css('opacity', 1);}
        });        
        
        /*---------------------------------------*/
        /*  MEET THE TEAM SECTION
        /*---------------------------------------*/
        $('#meet-the-team').find('.team-element').each(function(i){            
            var element = $(this),
            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
            element.css('opacity', 0).one('inview', function(isInView) {
                if (isInView){
                    setTimeout(function(){
                        element.addClass('animated fadeInUp').css('opacity', 1);
                    } , itemsDelay * (i * 2));
                }
            });
        });
        
        /*---------------------------------------*/
        /*  TESTIMONIALS SECTION
        /*---------------------------------------*/
        $('#testimonials').find('.testimonial-item').css('opacity', 0).one('inview', function(isInView){
            if (isInView) {$(this).addClass('animated flipInY').css('opacity', 1);}
        })
    }
});