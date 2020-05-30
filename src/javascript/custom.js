$('#main-slider-1').carousel({
    interval: 10000
});
$('#main-slider-2').carousel({
    interval: 10000
});
  
// $('.carousel .carousel-item').each(function(){
//     var next = $(this).next();
//     if (!next.length) {
//     next = $(this).siblings(':first');
//     }
//     next.children(':first-child').clone().appendTo($(this));
    
//     if (next.next().length>0) {
//     next.next().children(':first-child').clone().appendTo($(this));
//     }
//     else {
//     $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
//     }
// });

$(".js-btn-trailer").on("click", function() {
    $(".main-banner_video").slideDown();
});
$(".js-btn-trailer-close").on("click", function() {
    $(".main-banner_video").slideUp();
    $(".main-banner_video iframe").attr("src","https://www.youtube.com/embed/gDcg8CIdLR4?rel=0&amp;showinfo=0&amp;start=25");
})

function showNewsWithTag(tag) {
    var searchedTag = ($(tag).data('tag'));

    $(tag).removeClass('news-item_tag--inactive');
    $('.news-list .news-item').each(function(){
        if($(this).find('.news-item_tags').find('.news-item_tag').hasClass(searchedTag)) {
            $(this).show();
        } else {
            //do nothing
        }
    });
}
function hideNewsWithTag(tag) {
    var searchedTag = ($(tag).data('tag'));

    $(tag).addClass('news-item_tag--inactive');
    $('.news-list .news-item').each(function(){
        if($(this).find('.news-item_tags').find('.news-item_tag').hasClass(searchedTag)) {
            $(this).hide();
        } else {
            //do nothing
        }
    });
}

$('.news-tags .news-item_tag').on('click', function() {
    if($(this).hasClass('news-item_tag--inactive')) {
        showNewsWithTag(this);
    } else {
        hideNewsWithTag(this);
    }
});