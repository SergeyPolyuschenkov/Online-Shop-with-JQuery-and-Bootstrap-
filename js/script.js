var $items = 1;
var itemsArr = [
{"name":"Buffalo","price":145.99,"img":"img/main-item-1.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-2.jpg"},
{"name":"Buffalo","price":145.99,"img":"img/main-item-3.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-4.jpg"},
{"name":"Buffalo","price":145.99,"img":"img/main-item-5.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-6.jpg"},
{"name":"Buffalo","price":145.99,"img":"img/main-item-1.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-2.jpg"},
{"name":"Buffalo","price":145.99,"img":"img/main-item-3.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-4.jpg"},
{"name":"Buffalo","price":145.99,"img":"img/main-item-5.jpg"},
{"name":"Even&Odd","price":145.99,"img":"img/main-item-6.jpg"}
];

$(window).scroll(function() {
	var st = $(this).scrollTop();
	$('.header-text h2, .header-text p').css({
		'transform': 'translate(0%, '+st/5+ '%)'
	});
});

$(document).ready(function() {
	$('.itemsArr').html('');
	for(var i=0; i<itemsArr.length; i++) {
		$('.itemsArr').append('<div class="shop-item col-md-4"><div class="item-top"><img src="'+itemsArr[i].img+'"></div><div class="item-bottom"><div class="price"><span>$'+itemsArr[i].price+'</span></div><p class="item-name">'+itemsArr[i].name+'</p><div class="button-line"><div><i class="fa fa-eye item-details" aria-hidden="true"></i></div><div><i class="fa fa-star-o" aria-hidden="true"></i></div><div><i class="fa fa-share-square-o" aria-hidden="true"></i></div><div><i data-id="'+itemsArr[i].name+'" class="fa fa-shopping-cart shopping-cart" aria-hidden="true"></i></div></div></div></div>');
	}
	
	$( '#my-slider' ).sliderPro({
		width: 188,
		height: 732,
	});
	$( '#item-slider' ).sliderPro({
		width: 313,
		height: 378,
		fade: true,
		arrows: false,
		buttons: false,
		fullScreen: false,
		shuffle: true,
		smallSize: 500,
		mediumSize: 1000,
		largeSize: 3000,
		thumbnailArrows: true,
		autoplay: false
	});




	var myMap;
  	ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
  	function init () {
    myMap = new ymaps.Map("map", {
      center: [46.479695, 30.747930], // Координаты центра карты
      zoom: 15 // Zoom
    	});
    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",// тип геометрии - точка
            coordinates: [46.479695, 30.747930] // координаты точки
       }
    });
	myMap.geoObjects.add(myGeoObject); // Размещение геообъекта на карте.
  	}
  	


	$('.shopping-cart').on('click', function() {
		if(!localStorage.getItem('shoppingCartArr')) {
			$('.shopping-items').html('');
			var goods = [];
			var newGood = {"name": $(this).attr('data-id'), "sum": 1};
			goods.push(newGood);
			shoppingCart = JSON.stringify(goods);
			localStorage.setItem('shoppingCartArr', shoppingCart);
			for (var i = 0; i<goods.length; i++) {
				$('.shopping-items').append('<tr><th scope="row">'+goods[i].name+'</th><td><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></td></tr>');
			}
			$( ".spinner" ).spinner();
			$('#shoppingCartModal').modal();
		} else {
			$('.shopping-items').html('');
			var goods = JSON.parse(localStorage.getItem('shoppingCartArr'));
			var newGood = {"name": $(this).attr('data-id'), "sum": 1};

			var exist = false;
			for(var i = 0; i<goods.length; i++) {
				if(newGood.name == goods[i].name) {
					exist = true;
					break;
				}
			}
			if(exist==true) {
				goods[i].sum++;
			} else {
				goods.push(newGood);
			}
			localStorage.setItem('shoppingCartArr', JSON.stringify(goods));

			for (var i = 0; i<goods.length; i++) {
				$('.shopping-items').append('<tr><th scope="row">'+goods[i].name+'</th><td><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></td></tr>');
			}
			$( ".spinner" ).spinner();
			$('#shoppingCartModal').modal();
		}
	});


	$('.slider-item').not(':first').hide();
	$('.items div').click(function() {
		$('.items div').removeClass('active').eq($(this).index()).addClass('active');
		$('.slider-item').hide().eq($(this).index()).fadeIn();
	});

	$('.tab').not(':first').hide();
	$('.item-tab').click(function() {
		$('.item-tab').removeClass('active').eq($(this).index()).addClass('active');
		$('.tab').hide().eq($(this).index()).fadeIn();
	});
	$('.shop-item').mouseover(function() {
		$('.item-name', this).hide();
		$('.button-line', this).css('display', 'block');
	});
	$('.shop-item').mouseout(function() {
		$('.button-line', this).hide();
		$('.item-name', this).css('display', 'block');
	});

	$('#loginOrRegister').on('click', function() {
		$('#loginOrRegisterModal').modal();
	});

	$('.item-details').on('click', function() {
	    $('#item-details').modal();	
	});

	$('.menu-button').on('click', function() {
		$('.top-menu').toggleClass('vertMenu');
	});









	$('#signUp').on('click', function() {
		$('#loginOrRegisterModal').modal('hide');
		$('#signUpModal').modal();
	});

	$('#search-btn').click(function () {
		$(this).slideToggle('400', function () {
			$('#search-inp').slideToggle('400');
		});
	});

	$('#clear-list').on('click', function() {
		$('#clearModal').modal();
	});
	$('#reallyClear').on('click', function() {
		localStorage.removeItem('shoppingCartArr');
		$('.shopping-items').empty();
		$('#clearModal').modal('hide');
		$('#shoppingCartModal').modal('hide');
		$('#emptyShoppingCartModal').modal();		
	});

		




	$('#shopping-cart-main').on('click', function() {
		if(!localStorage.getItem('shoppingCartArr')) {
			$('#emptyShoppingCartModal').modal();
		} else {
			$('.shopping-items').html('');
			var shoppingCartArr = localStorage.getItem('shoppingCartArr');
			var goods = JSON.parse(shoppingCartArr);
			$('#shoppingCartModal').modal();
			for (var i = 0; i<goods.length; i++) {
				// $('.shopping-items').append('<div class="row"><div class="col-md-4"><span>'+goods[i].name+'</span></div><div class="col-md-offset-6 col-md-2"><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></div></div>');
				$('.shopping-items').append('<tr><th scope="row">'+goods[i].name+'</th><td><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></td></tr>');
			}
			$( ".spinner" ).spinner();
		}
	});	
	$('#login').on('click', function() {
		if ($('#login-name').val().length == 0) {

			$('.login-row').addClass('has-warning');

			$('.help-block-login').fadeIn();
		} else if ($('#login-password').val().length == 0) {

			$('.password-row').addClass('has-warning');

			$('.help-block-password').fadeIn();
		} else {
			$name = $('#login-name').val();
			$('#loginOrRegisterModal').modal('hide');
			$('#loginOrRegister').hide();
			localStorage.setItem('activeUser', JSON.stringify({"name":$name}));
			$('.top-right').append('<span>'+$name+'</span><button id="log-out">LOG OUT</button>');
		}
	});



	if(localStorage.getItem('activeUser')) {
		$('#loginOrRegister').hide();
		$actu = JSON.parse(localStorage.getItem('activeUser'));
		$('.top-right').append('<span>'+$actu.name+'</span><button id="log-out">LOG OUT</button>');
	}	

	$('#log-out').on('click', function() {
		localStorage.clear();
		$('.shopping-items').html('');
		$('.top-right').html('<button id="loginOrRegister">LOGIN or REGISTER</button>');	
	});
});

$('#register').on('click', function() {
	if ($('#signup-name').val().length == 0) {

			$('.login-row').addClass('has-warning');

			$('.help-block-login').fadeIn();
		} else if ($('#signup-email').val().length == 0) {

			$('.email-row').addClass('has-warning');
			
			$('.help-block-email').fadeIn();
		} else if ($('#signup-password').val().length == 0) {

			$('.password-row').addClass('has-warning');
			
			$('.help-block-password').fadeIn();
		} else {
			$name = $('#signup-name').val();
			$('#signUpModal').modal('hide');
			$('#loginOrRegister').hide();
			localStorage.setItem('activeUser', JSON.stringify({"name":$name}));
			$('.top-right').append('<span>'+$name+'</span><button id="log-out">LOG OUT</button>');
		}
});

