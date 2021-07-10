(function($) {
    "use strict";
    jQuery(document).ready(function($) {
        // Back To Top Button
        jQuery( window ).scroll( function () {
            if ( jQuery( this ).scrollTop() > 100 ) {
                jQuery( '.back-to-top' ).fadeIn();
            } else {
                jQuery( '.back-to-top' ).fadeOut();
            }
        } );
        jQuery( '.back-to-top' ).on('click', function () {
            jQuery( "html, body" ).animate( { scrollTop: 0 }, 1500, 'easeInOutExpo' );
            return false;
        } );
            
        // Initilize Superfish Menu
        $("ul.main-menu").superfish({
            delay:          300,
            hoverClass:     'sfHover',
            animation:     {opacity: "show"},   
            speed:          200,
            speedOut:       0,
            cssArrows:      true
        });

        /* Open Submenu on left side when Screen is too small */
        var wapoMainWindowWidth;
        var subMenuExist;
        var subMenuWidth;
        var subMenuOffset;
        var newSubMenuPosition;
        function sfSubmenuPosition() {
            wapoMainWindowWidth = $(window).width();
            $('ul.main-menu li ul').mouseover(function(){     
                subMenuExist = $(this).find('.sub-menu').length;            
                if( subMenuExist > 0){
                    subMenuWidth = $(this).find('.sub-menu').width();
                    subMenuOffset = $(this).find('.sub-menu').parent().offset().left + subMenuWidth;

                    // if sub menu is off screen, give new position
                    if((subMenuOffset + subMenuWidth) > wapoMainWindowWidth){                  
                        newSubMenuPosition = subMenuWidth + 3;
                        $(this).find('.sub-menu').css({
                            left: -newSubMenuPosition,
                            top: '0'
                        });
                    } else {
                        $(this).find('.sub-menu').css({
                            left: newSubMenuPosition,
                            top: '0'
                        });
                    }
                }
             });
        }
        sfSubmenuPosition();

        // Footer Columns
        $('.multi-col-widget').isotope({
          itemSelector: '.widget',
          layoutMode: 'masonry' // masonry or fitRows
        });
        
        // Testimonial Slider
        $('.testimonial-slider').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            arrows: true,
            prevArrow: '<i class="fa fa-chevron-left"></i>',
            nextArrow: '<i class="fa fa-chevron-right"></i>',
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    dots: true,
                    arrows: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    dots: true,
                    arrows: false
                  }
                }
            ]
        });

        // Recent Posts
        $('.recent-posts').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            arrows: false,
            responsive: [
                {
                  breakpoint: 960,
                  settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1

                  }
                }
            ]
        });
        
        // Mobile Navigation
        $('#mobile-navigation-btn').on('click', function (){
            $('#mobile-navigation').stop(true,true).slideToggle(300, 'easeOutBack'); //easeInOutSine works also nice at 200ms
            return false;
        });
        $('#mobile-navigation .container ul li').each(function(){
            if($(this).find('> ul').length > 0) {
                 $(this).addClass('has-ul');
                 $(this).find('> a').append('<i class="fa fa-chevron-down"></i>');
            }
        });
        $('#mobile-navigation .container ul li:has(">ul") > a i').on('click', function (e){
            $(this).parent().parent().toggleClass('open');
            $(this).parent().parent().find('> ul').stop(true,true).slideToggle(300, 'easeOutBack');
            return false;
        });

        // Header Search
        jQuery( document ).on('click', function () {
            jQuery( '.minisearch-wrap' ).hide();
        } );
        jQuery( '.minisearch-wrap' ).on('click', function (e) {
            e.stopPropagation();
        } );
        jQuery( '.minisearch-btn' ).on('click', function (e) {
            e.stopPropagation();
            if ( jQuery( '.minisearch-wrap' ).css( 'display' ) === 'block' ) {
                jQuery( '.minisearch-wrap' ).hide();
                jQuery( '.minisearch-wrap .minisearch-form input.minisearch-input' ).blur();
            } else {
                jQuery( '.minisearch-wrap' ).show();
                jQuery( '.minisearch-wrap .minisearch-form input.minisearch-input' ).focus();
            }
        } );

        // Portfolio Nav
        $('#portfolio-navigation .prev').hover(
            function() {
                $(this).stop().animate({'left' : 0, 'opacity' : 1}, 160, 'easeOutSine');
            }, function() {
                $(this).stop().animate({'left' : -25, 'opacity' : 0.2}, 160, 'easeOutSine');
            }
        );
        $('#portfolio-navigation .next').hover(
            function() {
                $(this).stop().animate({'right' : 0, 'opacity' : 1}, 160, 'easeOutSine');
            }, function() {
                $(this).stop().animate({'right' : -25, 'opacity' : 0.2}, 160, 'easeOutSine');
            }
        );

    }); // End Ready Function

    // Portfolio Post Type
    function pixomi_portfolio(){
        
        var $portfolio_container = $('.portfolio-items');
        $('.portfolio-item').css({visibility: "visible", opacity: "0"});
        
        $portfolio_container.imagesLoaded( function() {
            $portfolio_container.fadeIn(1000).isotope({
                transitionDuration: '0.6s',
                itemSelector: '.portfolio-item',
                resizable: false,
                layoutMode: 'fitRows', // masonry or fitRows
                sortBy: 'origorder'
            });

            $('.portfolio-item').each(function(index){
                $(this).delay(80*index).animate({opacity: 1}, 200);
            });
        });

        $(window).resize(function() {
            $portfolio_container.isotope('layout');
        });
        $('.portfolio-filters a').on('click', function (){
            $('.portfolio-items').addClass('animatedcontainer');
            $(this).closest('.portfolio-filters').find('a').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            var portfolioID = $(this).closest('.portfolio-filters').attr("data-id");
            $('.portfolio-items[data-id=' + portfolioID + ']').isotope({ filter: selector });
            return false;
        });
    }
    pixomi_portfolio();
})(jQuery);
