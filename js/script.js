var $items = 1;
$(document).ready(function() {
	$( '#my-slider' ).sliderPro({
		width: 188,
		height: 732,
	});

	$('.shopping-cart').on('click', function() {
		if(localStorage.length == 0) {
			$('.shopping-items').html('');
			var goods = [];
			var newGood = {"name": $(this).attr('data-id'), "sum": 1};
			goods.push(newGood);
			shoppingCart = JSON.stringify(goods);
			localStorage.setItem('shoppingCartArr', shoppingCart);
			for (var i = 0; i<goods.length; i++) {
				$('.shopping-items').append('<div class="row"><div class="col-md-4"><span>'+goods[i].name+'</span></div><div class="col-md-offset-6 col-md-2"><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></div></div>');
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
				$('.shopping-items').append('<div class="row"><div class="col-md-4"><span>'+goods[i].name+'</span></div><div class="col-md-offset-6 col-md-2"><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></div></div>');
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

	$('#signUp').on('click', function() {
		$('#loginOrRegisterModal').modal('hide');
		$('#signUpModal').modal();
	});

	$('#search-btn').click(function () {
		$(this).slideToggle('400', function () {
			$('#search-inp').slideToggle('400');
		});
	});

	$('#clear-list').click(function() {
		localStorage.clear();
		$('.shopping-items').empty();
	});

	$('#shopping-cart-main').on('click', function() {
		$('.shopping-items').html('');
		var shoppingCartArr = localStorage.getItem('shoppingCartArr');
		var goods = JSON.parse(shoppingCartArr);
		$('#shoppingCartModal').modal();
		for (var i = 0; i<goods.length; i++) {
			$('.shopping-items').append('<div class="row"><div class="col-md-4"><span>'+goods[i].name+'</span></div><div class="col-md-offset-6 col-md-2"><input class="spinner" value="'+goods[i].sum+'" min="1" max="10"></div></div>');
		}
		$( ".spinner" ).spinner();
		
	});
});