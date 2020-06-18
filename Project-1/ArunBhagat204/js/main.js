(function($) {

    var nav = $('nav');
    var navHeight = nav.outerHeight();
    // Smooth Scrolling of Nav links
    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
        var target = $(this.hash);
        $('html, body').animate({
        scrollTop: (target.offset().top - navHeight + 5)
        }, 1000, "easeInOutExpo");
    });

    // Activate scrollspy to add class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: navHeight
    });

    // Reduction of NavBar
    var skills = $('#skills').offset().top-100;
    var projects = $('#projects').offset().top-100;
    $(window).trigger('scroll');
    $(window).on('scroll', function() {
        var pixels = 50;
        var top = 1200;
        if ($(window).scrollTop() > pixels) {
            $('.navbar-expand-md').addClass('navbar-reduce');
            $('.navbar-expand-md').removeClass('navbar-trans');
        } else {
            $('.navbar-expand-md').addClass('navbar-trans');
            $('.navbar-expand-md').removeClass('navbar-reduce');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        } 
        if($(window).scrollTop() > skills && $(window).scrollTop() < projects)
        {
            $('.navbar-expand-md').addClass('navbar-skill');
        }
        else
        {
            $('.navbar-expand-md').removeClass('navbar-skill');
        }
    });

    // Typing Effect Settings
    if ($('.text-slider').length == 1) {
        var typed_strings = $('.text-slider-items').text();
        var typed = new Typed('.text-slider', {
            strings: typed_strings.split(','),
            typeSpeed: 80,
            loop: true,
            backDelay: 1100,
            backSpeed: 30
        });
    }

    $(".slideshow > div:gt(0)").hide();
    setInterval(function() { 
    $('.slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('.slideshow');
    },  3000);

    
})(jQuery);

