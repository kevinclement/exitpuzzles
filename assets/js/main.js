$(function() {

    var teamIndex = 0;
    // TMP: MOVE TO index use plugin to export to here -----------------
    var teams = [
        { url: "assets/img/teams/olympia-escape-room-11.png", title: "SUCCESS", comment: "Victory" },
        { url: "assets/img/teams/olympia-escape-room-10.png", title: "FAILED",  comment: "Nice try" },        
        { url: "assets/img/teams/olympia-escape-room-4.png",  title: "SUCCESS", comment: "Fun times" },
        { url: "assets/img/teams/olympia-escape-room-3.png",  title: "SUCCESS", comment: "Piece of cake" },
        { url: "assets/img/teams/olympia-escape-room-1.png",  title: "",        comment: "Way fun" },
        { url: "assets/img/teams/olympia-escape-room-2.png",  title: "SUCCESS", comment: "Well done" },        
        { url: "assets/img/teams/olympia-escape-room-5.png",  title: "FAILED",  comment: "Close" },
        { url: "assets/img/teams/olympia-escape-room-6.png",  title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-7.png",  title: "FAILED",  comment: "Almost" },
        { url: "assets/img/teams/olympia-escape-room-8.png",  title: "SUCCESS", comment: "Great effort" },
        { url: "assets/img/teams/olympia-escape-room-9.png",  title: "FAILED",  comment: "Maybe next time" },
        { url: "assets/img/teams/olympia-escape-room-12.png", title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-13.png", title: "",        comment: "" },
        { url: "assets/img/teams/olympia-escape-room-14.png", title: "SUCCESS", comment: "Elementary" },
        { url: "assets/img/teams/olympia-escape-room-15.png", title: "SUCCESS", comment: "Killer group" },
        { url: "assets/img/teams/olympia-escape-room-16.png", title: "FAILED",  comment: "" },
        { url: "assets/img/teams/olympia-escape-room-17.png", title: "FAILED",  comment: "" },
        { url: "assets/img/teams/olympia-escape-room-18.png", title: "SUCCESS", comment: "Great group effort" },
        { url: "assets/img/teams/olympia-escape-room-19.png", title: "",        comment: "" },
        { url: "assets/img/teams/olympia-escape-room-20.png", title: "SUCCESS", comment: "Well done" },
        { url: "assets/img/teams/olympia-escape-room-21.png", title: "FAILED",  comment: "" },
    ];
    // -----------------------------------------------------------------
    
    /*---------------------------------------*/
    /*  Add a single team photo
    /*---------------------------------------*/
    function addTeam(iso, i) {

        var team = teams[i];
        var html = '<div class="portfolio-item teamPhoto grow">              ' +
        '   <div class="inner-content">                                      ' +
        '       <div class="portfolio-content">                              ' +
        '           <div class="portfolio-detail">                           ' +
        '               <a href="' + team.url + '" title="' + team.title +'">' +
        '                   <div class="portfolio-text">                     ' +
        '                       <h4>' + team.title + '</h4>                  ' +
        '                       <p>' + team.comment + '</p>                  ' +
        '                   </div>                                           ' +
        '               </a>                                                 ' +
        '           </div>                                                   ' +
        '       </div>                                                       ' +
        '       <img src="' + team.url + '" alt="" class="img-responsive"/>  ' +
        '       </div>                                                       ' +
        '  </div>                                                            ';

        var teamHtml = $(html);
        teamHtml.appendTo($('#teamPlaceholder'));
        iso.appended(teamHtml);
    }

    /*---------------------------------------*/
    /*  Adds a row of team photos
    /*---------------------------------------*/
    function AddRowOfTeams() {
        var iso = $('.popup-portfolio').data().isotope;
        
        // add 3 at a time, if available
        for (var i=0; i < 3; i++) {
            addTeam(iso, teamIndex++);

            // stop the loop and remove 'add more' button
            if (teamIndex === teams.length) {
                $('#moreTeams').remove();
                continue;
            }
        }

        // redo layout has be be done in set timeout so that iso library can catchup (lame)
        window.setTimeout(function() {
            iso.layout();    
        }, 50);
    }

    /*---------------------------------------*/
    /*  PAGE LOADER
    /*---------------------------------------*/
    $(window).load(function(){
        $('#page-loader').fadeOut('fast');
        
        // init isotope to move photos around
        $('.popup-portfolio').isotope({ 
            filter: '*', 
            animationOptions: { 
                duration: 750, 
                easing: 'linear', 
                queue: false
            },
            masonry: {
                isFitWidth: true,
                isResizable: true,
                gutter: 15
            }
        }); 
        
        // add first 3 photos row after page load so its faster to load
        AddRowOfTeams();

        // hookup buttons to load next teams
        $('#moreTeams').click(function(e){ 
            e.preventDefault();
            
            AddRowOfTeams();
        });        
    });
        
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
});