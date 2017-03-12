$(function() {

    /*---------------------------------------*/
    /*  PAGE LOADER
    /*---------------------------------------*/
    $(window).load(function(){
        $('#page-loader').fadeOut('fast');

        // delay load team photos (first row)
        //var teamSection = $('#teamSection');
        //$(loadTeamRow()).insertAfter('#teamSectionHeaderRow');

        // hookup buttons to load next teams

    });
    

    var loadTeamRow = function() {
        return '<div class="row"> ' +
               '  <div class="col-md-12"> ' + 
               '    <div class="popup-portfolio">' +
                      loadTeam1() +
                      loadTeam2() + 
                      loadTeam2() + 
               '    </div>' + 
               '  </div>' +
               '</div>';
    };

    var loadTeam1 = function() {
        return '<div class="portfolio-item grow illustration logo">' +
               '  <div class="inner-content">' +
               '   <div class="portfolio-content">' +
               '     <div class="portfolio-detail">' +
               '       <a href="assets/img/teams/olympia-escape-room-1.jpg" title="July 2016 - Team 1">' +
               '         <div class="portfolio-text">' +
               '           <h4>FAILED</h4>' +
               '           <p>So close</p>' +
               '         </div>' +
               '       </a>' +
               '     </div>' +
               '   </div>' +
               '   <img src="assets/img/teams/olympia-escape-room-1.jpg" alt="" class="img-responsive"/>' +
               '  </div>' +                                
               '</div>';
    };

    var loadTeam2 = function() {
        return '<div class="portfolio-item grow identity">' +
               '  <div class="inner-content">' +
               '   <div class="portfolio-content">' +
               '     <div class="portfolio-detail">' +
               '       <a href="assets/img/teams/olympia-escape-room-1.jpg" title="July 2016 - Team 1">' +
               '         <div class="portfolio-text">' +
               '           <h4>FAILED</h4>' +
               '           <p>So close</p>' +
               '         </div>' +
               '       </a>' +
               '     </div>' +
               '   </div>' +
               '   <img src="assets/img/teams/olympia-escape-room-1.jpg" alt="" class="img-responsive"/>' +
               '  </div>' +                                
               '</div>';
    };
    
    /*---------------------------------------*/
    /*  JQUERY FOR PAGE SCROLLING FEATURE
    /*  requires jQuery Easing plugin
    /*---------------------------------------*/
    var pageScroll = function(){
        $('.page-scroll a').bind('click', function(e){
            e.preventDefault();

            var $anchor = $(this);

            var offset = $('body').attr('data-offset');
            
            if($('.navbar.navbar-fixed-top').hasClass('side-menu') && $(window).width() >= 992){
                $('body').data('offset', 1);
                offset = $('body').data('offset');
            }

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - (offset - 1)
            }, 1500, 'easeInOutExpo');
            
            $('.navbar-rj-collapse').collapse('hide');
        });
    };
    
    
    /*---------------------------------------*/
    /*  STICKY NAVBAR
    /*---------------------------------------*/
    $('.navbar.navbar-fixed-top').sticky({topSpacing: 0});
    
    var stickySideMenu = function(){
        var navbar = $('.navbar.navbar-fixed-top.side-menu');
        
        if ($(window).width() >= 992) {        
            navbar.unstick();
        }
        else
        {
            navbar.unstick();
            navbar.sticky({topSpacing: 0});
        }
    };
    
    pageScroll();
    stickySideMenu();
    
    $(window).smartresize(function(){
        pageScroll();
        stickySideMenu();
    });
    
    $('.navbar-trigger-open').click(function(e) {
        e.preventDefault();
        $('.navbar.side-menu').toggleClass('active');
        $('body.push.push-left').toggleClass('pushed-left');
        $('body.push.push-right').toggleClass('pushed-right');
    });

    $('.navbar-trigger-close').click(function(e) {
        e.preventDefault();
        $('.navbar.side-menu').toggleClass('active');
        $('body.push.push-left').toggleClass('pushed-left');
        $('body.push.push-right').toggleClass('pushed-right');
    });
    

    /*---------------------------------------*/
    /*  OWL CAROUSEL
    /*---------------------------------------*/
    $('#carousel-who-we-are').owlCarousel({
        autoPlay: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    
    
    /*---------------------------------------*/
    /*  CONTACT FORM REQUEST
    /*---------------------------------------*/
    $('.validate').validate();
    
    $(document).on('submit', '#contact-us-form', function(e){
        e.preventDefault();
        
        $('.form-respond').html("<div class='content-message'><i class='fa fa-refresh fa-spin fa-4x'></i> <h2>Loading..</h2></div>");
        
        $.ajax({
            url: $('#contact-us-form').attr('action'),
            type: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function(data){
                if (data == true){
                    $('.form-respond').html("<div class='content-message'><i class='fa fa-rocket fa-4x'></i> <h2>Email Sent Successfully</h2> <p>Your message has been submitted.</p></div>");
                } else {
                    $('.form-respond').html("<div class='content-message'><i class='fa fa-exclamation-circle fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p></div>");
                }
                
                setTimeout(function(){
                    $('.form-respond').html("");
                },3000);
            },
            error: function(xhr, err){
                $('.form-respond').html("<div class='content-message'><i class='fa fa-exclamation-circle fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p></div>");
                
                setTimeout(function(){
                    $('.form-respond').html("");
                },3000);
            }
        });
    });
});