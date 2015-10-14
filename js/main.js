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
        center: [55.7753,37.4997],
        zoom: 14,
        controls: ['smallMapDefaultSet']
    });

    myPlacemark = new ymaps.Placemark([55.7753,37.4997], {
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


$(document).ready(function() {

    $('.btn-send').click(function() {

        $('body').find('form:not(this)').children('.valid').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                name    =     $('input[name="name"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val()
            console.log(name, phone);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone}
            }).done(function(msg) {
                console.log(name, phone);
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                $.fancybox.open('#done');
                setTimeout("$.fancybox.close()", 3000);
            });
        }
    });
});