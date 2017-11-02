
(function($) {
    'use strict';

    jQuery(document).ready(function() {


        /* Preloader */
        $(window).load(function() {
            $('.preloader').delay(800).fadeOut('slow');
        });


        /* Scroll To Top */
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 500) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });


        $('.scroll-to-top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /* initialize popover */
        $('[data-toggle="popover"]').popover();

        /* Load More Post */
        $("#load-more-post").on('click', function(e) {
            e.preventDefault();
             let items = $('.blog-post').length;

            $.ajax({
                type: "GET",
                url: "/moreData/" + items,
                success: function(data) {
                    var obj = JSON.parse(data);

                  if (obj.length == 0){
                    $('#post-end-message').html('<div class="end">End</div>').fadeIn(800);
                    $("#load-more-post").hide();
                  } else {
                    let newBlog = obj[0];
                    var markUp = `
                        <div class="col-md-12 blog-post" style="display:none">
                            <div class="post-title">
                                <a href="/single/${newBlog._id}">
                                        <h1>${newBlog.title}</h1>
                                </a>
                            </div>
                                <div class="post-info">
                                <span>${newBlog.date}  by <span class="color-6">${newBlog.author}</span></span>
                            </div>
                            <p>
                                ${newBlog.description}
                            </p>
                                <a href="/single/${newBlog._id}" class="button button-style button-anim fa fa-long-arrow-right"><span>Read More</span></a>
                        </div>
                    `;
                    
                     $(markUp).appendTo('.content-page').slideDown('slow');

                  }
                },
                error: function(jqXHR, textStatus, err) {
                   alert('Error! ' + textStatus + err);
                }
            });


        });

    });

})(jQuery);