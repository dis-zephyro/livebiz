$('.header__nav li a').click(function(){
    var str=$(this).attr('href');
    $.scrollTo(str, 500, {offset:-115});
    return false;
});

//  Slider

$('.reply').slick({
    arrows: false,
    autoplay: true,
    dots: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
});

$('.reply__nav.prev').click(function(){
    $('.reply').slick('slickPrev');
});

$('.reply__nav.next').click(function(){
    $('.reply').slick('slickNext');
});


// Map

ymaps.ready(init);

var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [48.7209,44.5032],
        zoom: 14,
        controls: ['smallMapDefaultSet']
    });

    myPlacemark = new ymaps.Placemark([48.7209,44.5032], {
        hintContent: ''
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.png',
        iconImageSize: [44, 64],
        iconImageOffset: [-2, -65]
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('multiTouch');
    myMap.geoObjects.add(myPlacemark);
}

//  Modal

$(".btn-modal").fancybox({
    'padding'    : 0,
    'tpl'        : {
        closeBtn : '<a title="Close" class="btn_close" href="javascript:;"></a>'
    }
});


// ----- Маска ----------
jQuery(function($){
    $("input[name='phone']").mask("+7(999) 999-9999");
});


$(document).ready(function() {

    $('.bnt-send').click(function() {

        $('body').find('form:not(this)').children('div').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                name    =     $('input[name="name"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val(),
                form   =     $('input[name="form"]', $form).val();
            console.log(name, phone, form);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone, form:form}
            }).done(function(msg) {
                console.log(name, phone, form);
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                $.fancybox.open('#done', 'closeBtn : false');
                setTimeout("$.fancybox.close()", 3000);
            });
        }
    });

});