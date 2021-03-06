$(function() {
    var $iso;
    var imageLoadQueue = [];

    // monkey patch in callback for image
    document.imageLoaded = function(img) {

        // show the image now that it has loaded
        $(img).show();

        // add it to the isotope system
        var element = $(img.parentElement.parentElement);
        $iso.isotope()
            .append(element)
            .isotope('appended', element);

        // trigger isotope layout
        $iso.isotope('layout');

        // load next image if we still have one in the queue
        addTeam();
    }

    var teamIndex = 0;
    var teams = [
        { url: "assets/img/teams/olympia-escape-room-1.JPG",  title: "SUCCESS", comment: "Way fun" },
        { url: "assets/img/teams/olympia-escape-room-2.JPG",  title: "FAILED",  comment: "Next time" },
        { url: "assets/img/teams/olympia-escape-room-3.JPG",  title: "SUCCESS", comment: "Piece of cake" },
        { url: "assets/img/teams/olympia-escape-room-4.JPG",  title: "SUCCESS", comment: "Fun times" },
        { url: "assets/img/teams/olympia-escape-room-5.JPG",  title: "FAILED",  comment: "Close" },
        { url: "assets/img/teams/olympia-escape-room-6.JPG",  title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-7.JPG",  title: "FAILED",  comment: "Almost" },
        { url: "assets/img/teams/olympia-escape-room-8.JPG",  title: "SUCCESS", comment: "Great effort" },
        { url: "assets/img/teams/olympia-escape-room-9.JPG",  title: "FAILED",  comment: "Maybe next time" },
        { url: "assets/img/teams/olympia-escape-room-10.JPG", title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-11.JPG", title: "FAILED",  comment: "Nice try" },
        { url: "assets/img/teams/olympia-escape-room-12.JPG", title: "SUCCESS", comment: "Victory" },
        { url: "assets/img/teams/olympia-escape-room-13.JPG", title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-14.JPG", title: "SUCCESS", comment: "Elementary" },
        { url: "assets/img/teams/olympia-escape-room-15.JPG", title: "FAILED",  comment: "Killer group" },
        { url: "assets/img/teams/olympia-escape-room-16.JPG", title: "SUCCESS", comment: "" },
        { url: "assets/img/teams/olympia-escape-room-17.JPG", title: "FAILED",  comment: "Pajama party!" },
        { url: "assets/img/teams/olympia-escape-room-18.JPG", title: "FAILED",  comment: "Great group effort" },
        { url: "assets/img/teams/olympia-escape-room-19.JPG", title: "FAILED",  comment: "" },
        { url: "assets/img/teams/olympia-escape-room-20.JPG", title: "SUCCESS", comment: "Nice Shirts!" },
        { url: "assets/img/teams/olympia-escape-room-21.JPG", title: "SUCCESS", comment: "" },
    ];

    /*---------------------------------------*/
    /*  Adds a row of team photos
    /*---------------------------------------*/
    function AddRowOfTeams() {

        // add 3 at a time, if available
        for (var i=0; i < 3; i++) {
            imageLoadQueue.push(teamIndex++);
        }

        // add the first image to the page and trigger its image download
        addTeam();
    }

    /*---------------------------------------*/
    /*  Add a single team photo
    /*---------------------------------------*/
    function addTeam() {
        if (imageLoadQueue.length == 0) { 

            // if there are still images to potentially load, show the button again since we're done loading
            if (teamIndex < teams.length) {
                $('#moreTeams').show();
            }
            else {
                // fill in link to facebook to get more photos
                $('#moreTeams')[0].parentElement.innerHTML = "<p class='morePhotos'>For even more photos check <a href='//www.facebook.com/pg/exitpuzzlesescaperoom/photos/'>facebook</a>.</p>";
            }

            return;
        }

        var team = teams[imageLoadQueue.pop()];
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
        '       <img src="' + team.url + '"                                  ' +
        '            onload="imageLoaded(this)"                              ' +
        '            class="hiddenPhoto img-responsive"/>                    ' +
        '   </div>                                                           ' +
        '</div>                                                              ';

        var teamHtml = $(html);
        teamHtml.appendTo($('#teamPlaceholder'));
    }

    /*---------------------------------------*/
    /*  PAGE LOADER
    /*---------------------------------------*/
    $(window).load(function(){

        // init isotope to move photos around
        $iso = $('.popup-portfolio').isotope({ 
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

        // hookup pop-up for images
        $('.popup-portfolio').magnificPopup({
            delegate: 'a',
            type: 'image',
            fixedContentPos: false,
            gallery: {
                enabled: true,
                preload: [0,2],
                navigateByImgClick: false,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                tPrev: 'Previous (Left arrow key)',
                tNext: 'Next (Right arrow key)'
            }
        });

        // add first 3 photos row after page load so its faster to load
        AddRowOfTeams();

        // hookup buttons to load next teams
        $('#moreTeams').click(function(e){ 
            e.preventDefault();

            // hide button so during image load it doesn't overlap
            $('#moreTeams').hide();

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
    $('#carousel-museum').owlCarousel({
        autoPlay: true,
        lazyLoad:true,
        lazyFollow:true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    }); 

    $('#carousel-landlord').owlCarousel({
        autoPlay: true,
        lazyLoad:true,
        lazyFollow:true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    }); 
});